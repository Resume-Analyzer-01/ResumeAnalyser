import express from 'express'
import {
  getUsers,
  updateUserRole,
  deleteUser,
  getSystemLogs,
  getAdminStats
} from '../controllers/adminController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { authorize } from '../middlewares/roleMiddleware.js'

const router = express.Router()

// Secure all admin routes to Admin role only
router.use(protect, authorize('admin'))

router.get('/users', getUsers)
router.patch('/users/:id/role', updateUserRole)
router.delete('/users/:id', deleteUser)
router.get('/logs', getSystemLogs)
router.get('/stats', getAdminStats)

export default router
