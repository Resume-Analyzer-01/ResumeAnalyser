import { Notification } from '../models/Notification.js'

// Helper to format relative time
const formatTimeAgo = (date) => {
  const diffMs = Date.now() - new Date(date).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

/**
 * Get all notifications for current user
 */
export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id
    let dbNotifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(20)

    // Seed default notifications for new user if none exist
    if (dbNotifications.length === 0) {
      const defaultNotifications = [
        {
          userId,
          title: 'Welcome to ResumeAI',
          message: 'Upload your resume to get instant ATS optimization and AI feedback.',
          type: 'info',
          read: false
        },
        {
          userId,
          title: 'System Ready',
          message: 'Your AI resume command center is active and ready.',
          type: 'success',
          read: false
        }
      ]
      dbNotifications = await Notification.insertMany(defaultNotifications)
    }

    const unreadCount = dbNotifications.filter((n) => !n.read).length

    const formatted = dbNotifications.map((n) => ({
      id: n._id.toString(),
      title: n.title,
      message: n.message,
      read: n.read,
      type: n.type || 'info',
      createdAt: n.createdAt,
      timeAgo: formatTimeAgo(n.createdAt)
    }))

    res.status(200).json({
      success: true,
      unreadCount,
      data: formatted
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Mark single notification as read
 */
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true }
    )

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' })
    }

    res.status(200).json({
      success: true,
      data: {
        id: notification._id.toString(),
        read: notification.read
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Mark all notifications as read for current user
 */
export const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id
    await Notification.updateMany({ userId, read: false }, { read: true })

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete single notification
 */
export const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const notification = await Notification.findOneAndDelete({ _id: id, userId })

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Clear all notifications for current user
 */
export const clearAllNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id
    await Notification.deleteMany({ userId })

    res.status(200).json({
      success: true,
      message: 'All notifications cleared successfully'
    })
  } catch (error) {
    next(error)
  }
}
