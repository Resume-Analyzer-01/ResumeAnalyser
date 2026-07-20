import { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  { label, error, hint, icon, className = '', ...props },
  ref
) {
  const base = 'w-full rounded-[20px] border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100'

  return (
    <label className="block w-full">
      {label ? <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span> : null}
      <div className="relative">
        <input ref={ref} className={`${base} ${error ? 'border-danger/60 ring-danger/10' : ''} ${className}`} {...props} />
        {icon ? <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span> : null}
      </div>
      {hint ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
      {error ? <p className="mt-2 text-xs font-medium text-danger">{error}</p> : null}
    </label>
  )
})
