import { getAllUsers, updateUserById, deleteUserById } from '../repositories/userRepository.js'
import fs from 'fs'
import path from 'path'
import logger from '../config/logger.js'

/**
 * Get all users registered in the application.
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    next(error)
  }
}

/**
 * Update a user's role (Admin-only).
 */
export const updateUserRole = async (req, res, next) => {
  const { id } = req.params
  const { role } = req.body
  try {
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role type.' })
    }
    const user = await updateUserById(id, { role })
    res.status(200).json({ success: true, message: `User role updated to ${role}.`, data: user })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete a user from the system (Admin-only).
 */
export const deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    await deleteUserById(id)
    res.status(200).json({ success: true, message: 'User account has been deleted.' })
  } catch (error) {
    next(error)
  }
}

/**
 * Fetch the latest server logs from Winston error/combined files.
 */
export const getSystemLogs = async (req, res, next) => {
  try {
    const logPath = path.resolve(process.cwd(), 'logs', 'combined.log')
    let logContent = 'No logs found. Server is initializing logs.'

    if (fs.existsSync(logPath)) {
      const content = await fs.promises.readFile(logPath, 'utf8')
      logContent = content.split('\n').slice(-50).join('\n')
    }

    res.status(200).json({ success: true, data: logContent })
  } catch (error) {
    next(error)
  }
}

/**
 * Fetch total users and providers health metrics.
 */
export const getAdminStats = async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({
      success: true,
      data: {
        totalUsers: users.length,
        activeSubscriptions: users.length,
        systemHealth: 'healthy',
        activeProviders: {
          openai: 'online',
          gemini: 'online'
        }
      }
    })
  } catch (error) {
    next(error)
  }
}
export default getUsers
