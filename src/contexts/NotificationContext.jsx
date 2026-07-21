import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../lib/axios'
import { useAuth } from './AuthContext'

export const NotificationContext = createContext(null)

const INITIAL_DEMO_NOTIFICATIONS = [
  {
    id: 'demo-1',
    title: 'Report Ready',
    message: 'Riley_Carter_PM.pdf analysis is complete with 92% ATS score.',
    type: 'success',
    read: false,
    timeAgo: '10m ago',
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
    link: '/analysis'
  },
  {
    id: 'demo-2',
    title: 'Keyword Gap Found',
    message: 'Add lifecycle analytics & product strategy to improve your match score by +14%.',
    type: 'warning',
    read: false,
    timeAgo: '1h ago',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    link: '/upload'
  },
  {
    id: 'demo-3',
    title: 'Workspace Initialized',
    message: 'Your AI resume command center and templates are fully active.',
    type: 'info',
    read: true,
    timeAgo: '1d ago',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    link: '/dashboard'
  }
]

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState(INITIAL_DEMO_NOTIFICATIONS)
  const [loading, setLoading] = useState(false)

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      return
    }
    setLoading(true)
    try {
      const response = await api.get('/notifications')
      if (response.data.success && Array.isArray(response.data.data)) {
        setNotifications(response.data.data)
      }
    } catch (error) {
      // Keep existing or demo notifications on error
      console.warn('Could not fetch notifications from backend, using current state.')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    )
    if (user && !id.startsWith('demo-')) {
      try {
        await api.patch(`/notifications/${id}/read`)
      } catch (err) {
        console.error('Failed to mark notification as read:', err)
      }
    }
  }

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
    if (user) {
      try {
        await api.patch('/notifications/read-all')
      } catch (err) {
        console.error('Failed to mark all as read:', err)
      }
    }
  }

  const removeNotification = async (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id))
    if (user && !id.startsWith('demo-')) {
      try {
        await api.delete(`/notifications/${id}`)
      } catch (err) {
        console.error('Failed to delete notification:', err)
      }
    }
  }

  const clearAll = async () => {
    setNotifications([])
    if (user) {
      try {
        await api.delete('/notifications/clear-all')
      } catch (err) {
        console.error('Failed to clear notifications:', err)
      }
    }
  }

  const addNotification = (newNotif) => {
    const item = {
      id: `local-${Date.now()}`,
      title: newNotif.title || 'New Notification',
      message: newNotif.message || '',
      type: newNotif.type || 'info',
      read: false,
      timeAgo: 'Just now',
      createdAt: new Date().toISOString(),
      link: newNotif.link || '/dashboard'
    }
    setNotifications((prev) => [item, ...prev])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        addNotification,
        fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
