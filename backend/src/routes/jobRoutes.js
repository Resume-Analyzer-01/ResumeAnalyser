import express from 'express'
import {
  parseJobDescription,
  getUserJobs,
  scoreResumeAgainstJob,
  deleteJob
} from '../controllers/jobController.js'

const router = express.Router()

router.post('/parse', parseJobDescription)
router.get('/', getUserJobs)
router.post('/:jobId/match-resume', scoreResumeAgainstJob)
router.delete('/:jobId', deleteJob)

export default router
