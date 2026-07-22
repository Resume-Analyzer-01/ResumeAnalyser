import express from 'express'
import {
  getCoachingProfile,
  analyzeCoachingProgress
} from '../controllers/coachingController.js'

const router = express.Router()

router.get('/profile', getCoachingProfile)
router.post('/analyze', analyzeCoachingProgress)

export default router
