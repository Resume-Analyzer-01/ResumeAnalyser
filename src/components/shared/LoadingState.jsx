export const LoadingState = () => {
  return (
    <div className="space-y-4 rounded-[20px] border border-white/15 bg-white/70 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/60">
      <div className="h-4 w-24 animate-pulse rounded-full bg-slate-300/60 dark:bg-slate-700/80" />
      <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-slate-300/70 dark:bg-slate-700/80" />
      <div className="grid gap-3 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-[20px] bg-slate-200/70 dark:bg-slate-800/80" />
        ))}
      </div>
    </div>
  )
}
