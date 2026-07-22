import express from 'express'
import {
  register,
  login,
  logout,
  refresh,
  getSession,
  verifyEmail,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  updateProfile,
  deleteAccount,
  oauthCallback
} from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'
import passport from 'passport'
import { validateRegister, validateLogin } from '../validators/authValidator.js'

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/logout', protect, logout)
router.post('/refresh', refresh)
router.get('/session', getSession)
router.get('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)

router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.delete('/profile', protect, deleteAccount)

// OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=google_auth_failed', session: false }),
  oauthCallback
)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:5173/login?error=github_auth_failed', session: false }),
  oauthCallback
)

export default router
