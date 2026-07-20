export const CircularProgress = ({ value = 0, label = 'Score', size = 'lg' }) => {
  const dimensions = size === 'sm' ? 'h-28 w-28' : 'h-40 w-40'
  const textSize = size === 'sm' ? 'text-2xl' : 'text-4xl'
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={`relative grid ${dimensions} place-items-center`} aria-label={`${label}: ${value} percent`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-slate-200 dark:text-slate-800"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-3 rounded-full bg-white shadow-inner dark:bg-slate-950" />
      <div className="relative text-center">
        <p className={`${textSize} font-bold text-slate-950 dark:text-white`}>{value}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {label}
        </p>
      </div>
    </div>
  )
}
