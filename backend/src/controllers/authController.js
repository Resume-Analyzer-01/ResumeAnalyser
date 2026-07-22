import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import config from '../config/env.js'
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
  deleteUserById
} from '../repositories/userRepository.js'
import { sendVerifyEmail, sendResetPasswordEmail } from '../services/emailService.js'

const generateTokens = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role }
  const accessToken = jwt.sign(payload, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpiry })
  const refreshToken = jwt.sign({ id: user._id }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiry })
  return { accessToken, refreshToken }
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
}

const getAuthHeaderToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const toSafeUser = (user) => {
  if (!user) return null

  const source = typeof user.toObject === 'function' ? user.toObject() : user

  return {
    id: source._id?.toString?.() || source.id,
    name: source.name || '',
    email: source.email || '',
    role: source.role || 'user',
    avatar: source.avatar || '',
    phone: source.phone || '',
    linkedin: source.linkedin || '',
    github: source.github || '',
    portfolio: source.portfolio || '',
    bio: source.bio || '',
    preferences: source.preferences || { theme: 'system', language: 'en' },
    emailVerified: Boolean(source.emailVerified),
    createdAt: source.createdAt,
    updatedAt: source.updatedAt
  }
}

const applySessionCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
  res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 3600 * 1000 })
}

const rotateRefreshSession = async (user, currentRefreshToken, res) => {
  const tokens = generateTokens(user)
  const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000)
  const nextRefreshTokens = (user.refreshTokens || [])
    .filter((tokenEntry) => tokenEntry.token !== currentRefreshToken)
    .concat({ token: tokens.refreshToken, expiresAt })

  await updateUserById(user._id, { refreshTokens: nextRefreshTokens })
  applySessionCookies(res, tokens.accessToken, tokens.refreshToken)

  return tokens
}

const resolveSessionUser = async (req, res) => {
  const accessToken = getAuthHeaderToken(req) || req.cookies.accessToken

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, config.jwt.accessSecret)
      const user = await findUserById(decoded.id)

      if (user) {
        return user
      }

      return { id: decoded.id, email: decoded.email, role: decoded.role || 'user' }
    } catch {
      // Fall through to refresh token handling.
    }
  }

  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return null
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret)
    const user = await findUserById(decoded.id)
    if (!user) {
      return null
    }

    const tokenExists = (user.refreshTokens || []).some((tokenEntry) => tokenEntry.token === refreshToken)
    if (!tokenExists && mongoose.connection.readyState === 1) {
      await updateUserById(user._id, { refreshTokens: [] })
      return null
    }

    await rotateRefreshSession(user, refreshToken, res)
    return user
  } catch {
    return null
  }
}

export const register = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered.' })
    }

    const user = await createUser({ name, email, password })
    const mockToken = Math.random().toString(36).substring(2, 10)
    await sendVerifyEmail(user.email, user.name, mockToken)

    res.status(201).json({
      success: true,
      message: 'Account created. Verification instructions sent to email.',
      data: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const { accessToken, refreshToken } = generateTokens(user)

    // Save session refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000)
    const refreshTokens = (user.refreshTokens || []).concat({ token: refreshToken, expiresAt })
    await updateUserById(user._id, { refreshTokens })

    applySessionCookies(res, accessToken, refreshToken)

    res.status(200).json({
      success: true,
      message: 'Access granted.',
      data: {
        user: toSafeUser(user),
        accessToken
      }
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await findUserById(req.user.id)
      if (user) {
        // Clear refresh tokens
        await updateUserById(user._id, { refreshTokens: [] })
      }
    }
    res.clearCookie('accessToken', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)
    res.status(200).json({ success: true, message: 'Logged out successfully.' })
  } catch (error) {
    next(error)
  }
}

export const refresh = async (req, res, next) => {
  const token = req.cookies.refreshToken || req.body.refreshToken
  if (!token) {
    return res.status(400).json({ success: false, message: 'Refresh token is missing.' })
  }

  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret)
    const user = await findUserById(decoded.id)
    if (!user) {
      return res.status(401).json({ success: false, message: 'Session user not found.' })
    }

    // Verify token exists in database session array
    const tokenExists = (user.refreshTokens || []).some((t) => t.token === token)
    if (!tokenExists && mongoose.connection.readyState === 1) {
      // Rotation violation logic
      await updateUserById(user._id, { refreshTokens: [] })
      return res.status(401).json({ success: false, message: 'Compromised session. Tokens rotated.' })
    }

    const tokens = await rotateRefreshSession(user, token, res)

    res.status(200).json({
      success: true,
      message: 'Tokens rotated.',
      data: { accessToken: tokens.accessToken }
    })
  } catch {
    res.status(401).json({ success: false, message: 'Session expired. Please log in again.' })
  }
}

export const getSession = async (req, res, next) => {
  try {
    const user = await resolveSessionUser(req, res)

    res.status(200).json({
      success: true,
      data: user ? toSafeUser(user) : null
    })
  } catch (error) {
    next(error)
  }
}

export const verifyEmail = async (req, res) => {
  const { token } = req.query
  if (!token) {
    return res.status(400).json({ success: false, message: 'Verification token is required.' })
  }
  res.status(200).json({ success: true, message: 'Email verified successfully.' })
}

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await findUserByEmail(email)
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      const expiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      await updateUserById(user._id, { resetPasswordOtp: otp, resetPasswordOtpExpiry: expiry })
      await sendResetPasswordEmail(user.email, user.name, otp)
    }
    res.status(200).json({ success: true, message: 'If registered, reset instructions have been emailed.' })
  } catch (error) {
    next(error)
  }
}

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body
  try {
    const user = await findUserByEmail(email)
    if (!user || user.resetPasswordOtp !== otp || new Date() > new Date(user.resetPasswordOtpExpiry)) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' })
    }
    res.status(200).json({ success: true, message: 'OTP verified successfully.' })
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (req, res, next) => {
  const { email, otp, password } = req.body
  try {
    const user = await findUserByEmail(email)
    if (!user || user.resetPasswordOtp !== otp || new Date() > new Date(user.resetPasswordOtpExpiry)) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    await updateUserById(user._id, { 
      passwordHash, 
      resetPasswordOtp: null, 
      resetPasswordOtpExpiry: null 
    })
    res.status(200).json({ success: true, message: 'Password has been updated. You can now login.' })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id)
    res.status(200).json({
      success: true,
      data: toSafeUser(user || req.user)
    })
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const allowedUpdates = ['name', 'email', 'phone', 'linkedin', 'github', 'portfolio', 'bio', 'preferences', 'avatar']
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedUpdates.includes(key))
    )

    const user = await updateUserById(req.user.id, updates)
    res.status(200).json({ success: true, message: 'Profile updated.', data: toSafeUser(user) })
  } catch (error) {
    next(error)
  }
}

export const deleteAccount = async (req, res, next) => {
  try {
    await deleteUserById(req.user.id)
    res.clearCookie('accessToken', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)
    res.status(200).json({ success: true, message: 'Account permanently deleted.' })
  } catch (error) {
    next(error)
  }
}

export const oauthCallback = async (req, res) => {
  try {
    const user = req.user
    if (!user) {
      return res.redirect('http://localhost:5173/login?error=oauth_failed')
    }

    const { accessToken, refreshToken } = generateTokens(user)

    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000)
    const refreshTokens = (user.refreshTokens || []).concat({ token: refreshToken, expiresAt })
    await updateUserById(user._id, { refreshTokens })

    applySessionCookies(res, accessToken, refreshToken)

    // Redirect to frontend on success
    res.redirect('http://localhost:5173/')
  } catch (error) {
    console.error('OAuth callback error:', error)
    res.redirect('http://localhost:5173/login?error=oauth_failed')
  }
}
