import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  Check,
  Trash2,
  X,
  ArrowRight,
  Inbox
} from 'lucide-react'
import { useNotifications } from '../../contexts/NotificationContext'

export const NotificationDropdown = ({ isOpen, onClose }) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  } = useNotifications()

  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'unread'
  const dropdownRef = useRef(null)

  // Handle outside click & escape key
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'unread') return !item.read
    return true
  })

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-rose-500 dark:text-rose-400" />
      default:
        return <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
    }
  }

  const getBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20'
      case 'warning':
        return 'bg-amber-500/10 dark:bg-amber-500/20'
      case 'error':
        return 'bg-rose-500/10 dark:bg-rose-500/20'
      default:
        return 'bg-cyan-500/10 dark:bg-cyan-500/20'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute right-0 top-12 z-50 w-88 max-w-[calc(100vw-2rem)] overflow-hidden rounded-[26px] border border-white/25 bg-white/92 p-3 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/92 sm:w-96"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/80 px-3 pb-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-white">
                <Bell size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white">Notifications</h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  title="Mark all as read"
                  onClick={markAllAsRead}
                  className="inline-flex h-8 items-center gap-1 rounded-full bg-slate-100 px-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                >
                  <Check size={13} />
                  <span className="hidden sm:inline">Read all</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  type="button"
                  title="Clear all"
                  onClick={clearAll}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/20 dark:hover:text-rose-300"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filter tabs */}
          {notifications.length > 0 && (
            <div className="flex items-center gap-1 px-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  activeFilter === 'all'
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('unread')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  activeFilter === 'unread'
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          )}

          {/* List */}
          <div className="mt-2 max-h-80 overflow-y-auto space-y-1.5 pr-1">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500">
                  <Inbox size={22} />
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {activeFilter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {activeFilter === 'unread'
                    ? 'You have read all your recent notifications.'
                    : 'Important updates about your resumes will appear here.'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (!item.read) markAsRead(item.id)
                  }}
                  className={`group relative flex items-start gap-3 rounded-[20px] p-3 transition duration-200 cursor-pointer ${
                    item.read
                      ? 'bg-transparent hover:bg-slate-100/70 dark:hover:bg-white/5'
                      : 'bg-slate-100/90 dark:bg-white/8 hover:bg-slate-200/70 dark:hover:bg-white/12'
                  }`}
                >
                  {/* Icon */}
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getBg(item.type)}`}>
                    {getIcon(item.type)}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-semibold truncate ${item.read ? 'text-slate-800 dark:text-slate-200' : 'text-slate-950 font-bold dark:text-white'}`}>
                        {item.title}
                      </p>
                      <span className="shrink-0 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                        {item.timeAgo}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                      {item.message}
                    </p>

                    {item.link && (
                      <Link
                        to={item.link}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!item.read) markAsRead(item.id)
                          onClose?.()
                        }}
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline dark:text-cyan-400"
                      >
                        View details
                        <ArrowRight size={11} />
                      </Link>
                    )}
                  </div>

                  {/* Unread dot */}
                  {!item.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50" />
                  )}

                  {/* Individual Delete button on hover */}
                  <button
                    type="button"
                    title="Dismiss"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeNotification(item.id)
                    }}
                    className="absolute right-2 top-2 hidden h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/20 dark:hover:text-rose-300 group-hover:flex"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-2 border-t border-slate-200/80 pt-2 text-center dark:border-white/10">
            <Link
              to="/dashboard"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white py-1"
            >
              Go to Command Center
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
