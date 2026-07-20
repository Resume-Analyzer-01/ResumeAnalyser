const variants = {
  primary: 'bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40',
  secondary: 'border border-slate-200 bg-white/50 text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20',
  ghost: 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white/10'
}

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70 disabled:cursor-not-allowed disabled:opacity-60'

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
