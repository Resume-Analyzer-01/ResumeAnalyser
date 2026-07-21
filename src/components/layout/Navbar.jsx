import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  ChevronDown,
  Crown,
  FileText,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sparkles,
  SunMedium,
  UserPlus,
  X
} from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { Avatar } from '../ui/Avatar'
import { Modal } from '../ui/Modal'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationContext'
import { NotificationDropdown } from './NotificationDropdown'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Templates', to: '/templates' },
  { label: 'Contact', to: '/contact' }
]

const profileActions = [
  { label: 'Dashboard', description: 'Resume command center', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Saved Templates', description: 'Curated application formats', icon: FileText, to: '/templates' },
  { label: 'Account Settings', description: 'Preferences and billing', icon: Settings, to: '/settings' }
]

const iconButtonClass =
  'relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/55 text-slate-700 shadow-sm shadow-slate-950/5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-100 dark:hover:bg-slate-900/80'

const textButtonClass =
  'inline-flex h-10 items-center justify-center rounded-full px-4 text-xs font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:bg-white/55 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 dark:text-slate-200 dark:hover:bg-white/10 xl:px-3 2xl:px-4 2xl:text-sm'

const registerButtonClass =
  'inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/60 px-4 text-xs font-semibold text-slate-900 shadow-sm shadow-slate-950/5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/85 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 xl:px-3 2xl:px-4 2xl:text-sm'

const ctaButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 px-4 text-xs font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-fuchsia-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 xl:px-3 2xl:px-5 2xl:text-sm'

const mobilePanelVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%' }
}

const menuListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08
    }
  }
}

const menuItemVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0 }
}

const ProfileDropdown = ({ closeMobileMenu }) => {
  const { user, logout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const closeMenus = () => {
    setProfileOpen(false)
    closeMobileMenu?.()
  }

  return (
    <div ref={profileRef} className="relative">
      <motion.button
        type="button"
        aria-label="Open profile menu"
        aria-expanded={profileOpen}
        onClick={() => setProfileOpen((value) => !value)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/60 py-1 pl-1 pr-2 text-left shadow-sm shadow-slate-950/5 backdrop-blur-xl transition duration-300 hover:bg-white/85 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 dark:border-white/10 dark:bg-slate-950/45 dark:hover:bg-slate-900/80"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
        ) : (
          <Avatar name={user?.name || 'User'} size="sm" />
        )}
        <span className="hidden max-w-24 truncate text-xs font-semibold text-slate-900 dark:text-white 2xl:block">
          {user?.name?.split(' ')[0] || 'User'}
        </span>
        <ChevronDown
          size={15}
          className={`text-slate-500 transition duration-300 dark:text-slate-300 ${profileOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {profileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-80 overflow-hidden rounded-[24px] border border-white/25 bg-white/90 p-2 shadow-2xl shadow-slate-950/15 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90"
          >
            <div className="rounded-[20px] bg-gradient-to-br from-slate-950 to-slate-800 p-4 text-white dark:from-white/10 dark:to-white/5">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                ) : (
                  <Avatar name={user?.name || 'User'} size="md" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user?.name || 'User'}</p>
                  <p className="truncate text-xs text-slate-300">{user?.role === 'admin' ? 'Administrator' : 'Member'}</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                <Crown size={14} />
                12 premium analyses left
              </div>
            </div>

            <div className="mt-2 space-y-1">
              {profileActions.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-[18px] px-3 py-3 transition duration-300 hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-100">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-900 dark:text-white">{item.label}</span>
                      <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{item.description}</span>
                    </span>
                  </Link>
                )
              })}
            </div>

            <button
              type="button"
              onClick={logout}
              className="mt-2 flex w-full items-center gap-3 rounded-[18px] px-3 py-3 text-sm font-semibold text-rose-600 transition duration-300 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
                <LogOut size={16} />
              </span>
              Sign out
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationOpen, setNotificationOpen] = useState(false)

  const searchEntries = [
    { name: 'Home Landing Page', path: '/' },
    { name: 'Dashboard Command Center', path: '/dashboard' },
    { name: 'Analyze New Resume', path: '/upload' },
    { name: 'Resume Quality & Analysis Reports', path: '/analysis' },
    { name: 'Resume Upload History & Logs', path: '/history' },
    { name: 'User Profile & Contact Info', path: '/profile' },
    { name: 'Workspace Preferences & Settings', path: '/settings' },
    { name: 'Pricing Plans & SaaS Tiers', path: '/pricing' },
    { name: 'Contact Sales & Customer Support', path: '/contact' },
    { name: 'Frequently Asked Questions (FAQ)', path: '/faq' },
    { name: 'ATS Resume Templates & Builder', path: '/templates' },
    { name: 'Premium AI Resume Features', path: '/features' }
  ]

  const filteredEntries = searchEntries.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setNotificationOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-50 px-3 py-3 transition-all duration-500"
    >
      <div
        className={`mx-auto flex max-w-[92rem] items-center justify-between rounded-full px-4 py-3 transition-all duration-500 sm:px-5 ${scrolled
          ? 'border border-white/25 bg-white/72 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72'
          : 'border border-transparent bg-transparent shadow-none'
          }`}
      >
        <Link to="/" className="group flex min-w-0 items-center gap-3 text-slate-950 dark:text-white">
          <motion.span
            whileHover={{ rotate: 8, scale: 1.04 }}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-950 via-violet-700 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 dark:from-white dark:via-cyan-200 dark:to-fuchsia-300 dark:text-slate-950"
          >
            <Sparkles size={19} />
          </motion.span>
          <span className="min-w-0">
            <span className="block text-lg font-bold leading-5 tracking-normal sm:text-xl">ResumeAI</span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 sm:block">
              AI Resume Suite
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 xl:flex">
          {navLinks.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.035 }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-xs font-semibold transition duration-300 2xl:text-sm ${isActive
                    ? 'bg-white/75 text-slate-950 shadow-sm shadow-slate-950/5 dark:bg-white/12 dark:text-white'
                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <motion.button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className={iconButtonClass}>
            <Search size={16} />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={iconButtonClass}
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
          </motion.button>
          <div className="relative">
            <motion.button
              type="button"
              aria-label="Notifications"
              onClick={() => setNotificationOpen((value) => !value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={iconButtonClass}
            >
              <Bell size={16} />
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white shadow-sm shadow-cyan-500/50">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              ) : (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
              )}
            </motion.button>

            <NotificationDropdown
              isOpen={notificationOpen}
              onClose={() => setNotificationOpen(false)}
            />
          </div>
          {!user ? (
            <>
              <Link to="/login" className={textButtonClass}>
                <LogIn size={15} className="mr-1.5" />
                Login
              </Link>
              <Link to="/register" className={registerButtonClass}>
                <UserPlus size={15} className="mr-1.5" />
                Register
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
          <Link to="/uploadpage" className={ctaButtonClass}>
            <Sparkles size={15} />
            Analyze Resume
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <motion.button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            whileTap={{ scale: 0.95 }}
            className={iconButtonClass}
          >
            <Search size={16} />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            className={iconButtonClass}
          >
            {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
          </motion.button>
          <motion.button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            whileTap={{ scale: 0.95 }}
            className={iconButtonClass}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={17} /> : <Menu size={17} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-[76px] z-40 bg-slate-950/35 backdrop-blur-sm xl:hidden"
            />
            <motion.aside
              variants={mobilePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-4 right-3 top-[84px] z-50 flex w-[calc(100vw-1.5rem)] max-w-[28rem] flex-col overflow-hidden rounded-[28px] border border-white/25 bg-white/88 p-4 shadow-2xl shadow-slate-950/25 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 xl:hidden"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-4 dark:border-white/10">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">ResumeAI menu</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">Premium AI resume workspace</p>
                </div>
                <button type="button" onClick={() => setMobileOpen(false)} className={iconButtonClass}>
                  <X size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="mt-4 flex w-full items-center gap-3 rounded-[20px] border border-slate-200/80 bg-slate-50/90 px-4 py-3 text-left text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/8 dark:text-slate-300 cursor-pointer"
              >
                <Search size={16} className="shrink-0" />
                Search resumes, roles, templates
              </button>

              <motion.nav variants={menuListVariants} initial="hidden" animate="visible" className="mt-4 flex-1 space-y-1 overflow-y-auto pr-1">
                {navLinks.map((item) => (
                  <motion.div key={item.label} variants={menuItemVariants}>
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-[18px] px-4 py-3 text-sm font-semibold transition duration-300 ${isActive
                          ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                        }`
                      }
                    >
                      {item.label}
                      <ChevronDown size={15} className="-rotate-90 opacity-60" />
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="mt-4 border-t border-slate-200/70 pt-4 dark:border-white/10">
                <div className="mb-3 grid grid-cols-3 gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      aria-label="Notifications"
                      onClick={() => setNotificationOpen((value) => !value)}
                      className={iconButtonClass}
                    >
                      <Bell size={16} />
                      {unreadCount > 0 ? (
                        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white shadow-sm shadow-cyan-500/50">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      ) : (
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                      )}
                    </button>
                  </div>
                  <button type="button" aria-label="Toggle dark mode" onClick={toggleTheme} className={iconButtonClass}>
                    {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
                  </button>
                  <div className="flex justify-end">
                    {user ? <ProfileDropdown closeMobileMenu={() => setMobileOpen(false)} /> : null}
                  </div>
                </div>

                <Link to="/upload" onClick={() => setMobileOpen(false)} className={`${ctaButtonClass} w-full px-5 text-sm`}>
                  <Sparkles size={16} />
                  Analyze Resume
                </Link>
                {!user && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className={`${textButtonClass} bg-slate-100 text-sm dark:bg-white/10`}>
                      <LogIn size={15} className="mr-1.5" />
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className={`${registerButtonClass} text-sm`}>
                      <UserPlus size={15} className="mr-1.5" />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <Modal isOpen={searchOpen} onClose={() => { setSearchOpen(false); setSearchQuery(''); }} title="Workspace Search">
        <div className="space-y-4">
          <input
            autoFocus
            type="text"
            placeholder="Search pages, reports, dashboard settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-[18px] border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          />
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 pr-1">
            {filteredEntries.map((entry) => (
              <Link
                key={entry.path}
                to={entry.path}
                onClick={() => {
                  setSearchOpen(false)
                  setSearchQuery('')
                  setMobileOpen(false)
                }}
                className="flex items-center justify-between rounded-[14px] px-3 py-3 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white transition"
              >
                <span className="font-medium">{entry.name}</span>
                <span className="text-xs opacity-60 font-semibold">{entry.path}</span>
              </Link>
            ))}
            {filteredEntries.length === 0 && (
              <p className="text-center text-xs text-slate-500 py-6">No matching pages found for "{searchQuery}"</p>
            )}
          </div>
        </div>
      </Modal>
    </motion.header>
  )
}
