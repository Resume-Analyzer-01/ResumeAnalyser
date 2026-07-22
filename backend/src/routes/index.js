import express from 'express'
import authRoutes from './authRoutes.js'
import resumeRoutes from './resumeRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import adminRoutes from './adminRoutes.js'
import templateRoutes from './templateRoutes.js'
import uploadRoutes from './uploadRoutes.js'
import notificationRoutes from './notificationRoutes.js'
import builderRoutes from './builderRoutes.js'
import jobRoutes from './jobRoutes.js'
import coachingRoutes from './coachingRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/resume', resumeRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/admin', adminRoutes)
router.use('/templates', templateRoutes)
router.use('/upload', uploadRoutes)
router.use('/notifications', notificationRoutes)
router.use('/resumes/builder', builderRoutes)
router.use('/jobs', jobRoutes)
router.use('/coaching', coachingRoutes)

export default router
