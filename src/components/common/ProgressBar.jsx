export const ProgressBar = ({ label, value, color = 'bg-primary', className = '' }) => {
  const widthClass =
    value >= 100
      ? 'w-full'
      : value >= 95
        ? 'w-[96%]'
        : value >= 90
          ? 'w-[92%]'
          : value >= 85
            ? 'w-[88%]'
            : value >= 80
              ? 'w-[82%]'
              : value >= 75
                ? 'w-[78%]'
                : value >= 70
                  ? 'w-[72%]'
                  : value >= 65
                    ? 'w-[66%]'
                    : value >= 60
                      ? 'w-[62%]'
                      : value >= 50
                        ? 'w-1/2'
                        : value >= 40
                          ? 'w-[42%]'
                          : value >= 30
                            ? 'w-[32%]'
                            : value >= 20
                              ? 'w-1/4'
                              : value > 0
                                ? 'w-[12%]'
                                : 'w-0'

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="font-semibold text-slate-950 dark:text-white">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
        <div className={`h-full rounded-full transition-all duration-700 ${color} ${widthClass}`} />
      </div>
    </div>
  )
}
