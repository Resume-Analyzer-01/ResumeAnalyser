import { Link } from 'react-router-dom'
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { Mail, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

const linkGroups = [
  { title: 'Product', links: ['Features', 'Pricing', 'Templates', 'Dashboard'] },
  { title: 'Resources', links: ['FAQ', 'Resume History', 'Analysis Report', 'Upload Resume'] },
  { title: 'Support', links: ['Contact', 'Privacy Policy', 'Terms', 'Status'] }
]

const linkMap = {
  Features: '/features',
  Pricing: '/pricing',
  Templates: '/templates',
  Dashboard: '/dashboard',
  FAQ: '/faq',
  'Resume History': '/history',
  'Analysis Report': '/analysis',
  'Upload Resume': '/uploadpage',
  Contact: '/contact',
  'Privacy Policy': '/settings',
  Terms: '/settings',
  Status: '/dashboard'
}

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/20 bg-white/35 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/35">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 text-slate-950 dark:text-white">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-slate-950 via-violet-700 to-cyan-500 text-white">
              <Sparkles size={18} />
            </span>
            <span>
              <span className="block text-xl font-bold">ResumeAI</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                AI Resume Suite
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Premium frontend experience for AI resume analysis, ATS scoring, history, templates, and career reporting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[FaGithub, FaLinkedin, FaXTwitter, FaDiscord].map((Icon, index) => (
              <a
                key={index}
                href="/"
                aria-label="Social profile"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/65 text-slate-700 transition hover:-translate-y-0.5 hover:text-primary dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">{group.title}</h3>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link}
                    to={linkMap[link]}
                    className="block text-sm font-medium text-slate-600 transition hover:text-primary dark:text-slate-300"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/20 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:border-white/10 dark:text-slate-400">
        <p>Copyright 2026 ResumeAI. All rights reserved.</p>
        <form className="flex w-full max-w-md gap-2" onSubmit={(event) => event.preventDefault()}>
          <label className="relative flex-1">
            <span className="sr-only">Newsletter email</span>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="email"
              placeholder="Subscribe to updates"
              className="h-11 w-full rounded-full border border-slate-200/70 bg-white/75 pl-10 pr-4 text-sm outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-900/70"
            />
          </label>
          <Button type="submit" className="h-11 px-4">
            Join
          </Button>
        </form>
      </div>
    </footer>
  )
}
