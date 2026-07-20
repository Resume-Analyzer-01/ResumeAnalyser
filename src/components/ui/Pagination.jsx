export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700 transition hover:border-primary/40 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">Prev</button>
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className={`rounded-full px-3 py-2 text-sm transition ${page === currentPage ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'border border-slate-200/70 bg-white/70 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200'}`}>
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-2 text-sm text-slate-700 transition hover:border-primary/40 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">Next</button>
    </div>
  )
}
