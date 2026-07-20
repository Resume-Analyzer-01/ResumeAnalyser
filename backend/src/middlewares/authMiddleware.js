import jwt from 'jsonwebtoken'
import config from '../config/env.js'
import { User } from '../models/User.js'

export const protect = async (req, res, next) => {
  let token

  // Check header Authorization Bearer or HttpOnly cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. Access token missing.' })
  }

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret)
    
    let user = null
    try {
      user = await User.findById(decoded.id).select('-passwordHash')
    } catch {
      // Silent error for database simulation fallbacks
    }

    if (!user) {
      // Sandbox fallback user session mock
      req.user = { id: decoded.id, email: decoded.email, role: decoded.role || 'user' }
    } else {
      req.user = user
    }

    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Access denied. Access token is invalid or has expired.' })
  }
}
export default protect
