import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export const AuthShell = ({ title, subtitle, children, footer }) => {
  return (
    <div className="relative mx-auto grid min-h-[calc(100vh-12rem)] max-w-6xl items-center gap-8 overflow-hidden py-8 lg:grid-cols-[0.9fr_1.1fr]">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block"
      >
        <Link to="/" className="inline-flex items-center gap-3 text-slate-950 dark:text-white">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-slate-950 via-violet-700 to-cyan-500 text-white">
            <Sparkles size={20} />
          </span>
          <span>
            <span className="block text-2xl font-bold">ResumeAI</span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">AI career intelligence</span>
          </span>
        </Link>
        <h1 className="mt-10 text-5xl font-bold tracking-normal text-slate-950 dark:text-white">
          Premium resume intelligence for every career move.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Analyze, improve, and track resumes with polished workflows ready for secure backend integration.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[28px] border border-white/25 bg-white/80 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl sm:p-8 dark:border-white/10 dark:bg-slate-950/72"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">ResumeAI</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{subtitle}</p>
        </div>
        {children}
        {footer ? <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">{footer}</div> : null}
      </motion.section>
    </div>
  )
}
