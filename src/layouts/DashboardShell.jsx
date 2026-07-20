import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  FileClock,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UploadCloud,
  UserRound,
  Wand2
} from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Upload Resume', to: '/upload', icon: UploadCloud },
  { label: 'Resume History', to: '/history', icon: FileClock },
  { label: 'Reports', to: '/analysis', icon: FileText },
  { label: 'Templates', to: '/templates', icon: Wand2 },
  { label: 'Profile', to: '/profile', icon: UserRound },
  { label: 'Settings', to: '/settings', icon: Settings }
]

export const DashboardShell = ({ title, description, children, actions }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
      <aside className="rounded-[28px] border border-white/20 bg-white/70 p-4 shadow-xl shadow-slate-950/5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/62">
        <div className="flex items-center gap-3 rounded-[22px] bg-slate-950 p-4 text-white dark:bg-white/10">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar name={user?.name || 'User'} size="md" />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{user?.name || 'User'}</p>
            <p className="truncate text-xs text-slate-300">{user?.role === 'admin' ? 'Administrator' : 'Free Plan'}</p>
          </div>
        </div>

        <nav className="mt-4 grid gap-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold transition ${isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-slate-600 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <section className="min-w-0">
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/20 bg-white/65 p-6 shadow-xl shadow-slate-950/5 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-slate-950/60">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">Workspace</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{title}</h1>
            {description ? <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {children}
      </section>
    </div>
  )
}
