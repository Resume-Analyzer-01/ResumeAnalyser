import express from 'express'
import {
  uploadResume,
  getHistory,
  getAnalysisDetails,
  deleteResume,
  optimizeResume
} from '../controllers/resumeController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Secure all resume routes
router.use(protect)

router.post('/upload', upload.single('resume'), uploadResume)
router.post('/optimize', upload.single('resume'), optimizeResume)
router.get('/history', getHistory)
router.get('/:id', getAnalysisDetails)
router.delete('/:id', deleteResume)

export default router
