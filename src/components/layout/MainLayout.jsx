import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from '../footer/Footer'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

export const MainLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-[radial-gradient(circle_at_top_left,_rgba(192,132,252,0.24),_transparent_32%),radial-gradient(circle_at_90%_10%,_rgba(56,189,248,0.2),_transparent_30%),linear-gradient(135deg,_#f8f7ff_0%,_#eef2ff_100%)] text-slate-900 transition-colors duration-500 dark:bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.25),_transparent_30%),radial-gradient(circle_at_90%_10%,_rgba(6,182,212,0.2),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#111827_100%)] dark:text-slate-100`}>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
