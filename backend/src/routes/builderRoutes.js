import express from 'express'
import {
  createBuilderResume,
  getUserBuilderResumes,
  getBuilderResumeById,
  updateBuilderResume,
  deleteBuilderResume,
  analyzeBuilderResumeATS
} from '../controllers/builderController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.post('/', createBuilderResume)
router.get('/', getUserBuilderResumes)
router.get('/:id', getBuilderResumeById)
router.put('/:id', updateBuilderResume)
router.delete('/:id', deleteBuilderResume)
router.post('/:id/analyze-ats', analyzeBuilderResumeATS)

export default router
