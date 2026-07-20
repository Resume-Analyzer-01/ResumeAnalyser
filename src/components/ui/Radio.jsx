export const Radio = ({ label, description, className = '', ...props }) => {
  return (
    <label className={`flex items-start gap-3 rounded-[16px] border border-slate-200/80 bg-white/70 px-4 py-3 shadow-sm transition hover:border-primary/40 dark:border-slate-700 dark:bg-slate-900/60 ${className}`}>
      <input type="radio" className="mt-1 h-4 w-4 border-slate-300 text-primary focus:ring-primary/30" {...props} />
      <span>
        <span className="block text-sm font-medium text-slate-800 dark:text-slate-100">{label}</span>
        {description ? <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{description}</span> : null}
      </span>
    </label>
  )
}
