import express from 'express'
import authRoutes from './authRoutes.js'
import resumeRoutes from './resumeRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import adminRoutes from './adminRoutes.js'
import templateRoutes from './templateRoutes.js'
import uploadRoutes from './uploadRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/resume', resumeRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/admin', adminRoutes)
router.use('/templates', templateRoutes)

router.use('/upload', uploadRoutes)
export default router

