import { useState, useMemo } from 'react'
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button } from './Button'

export const DataTable = ({ columns, data, initialSortKey = '', initialSortOrder = 'desc', pageSize = 5, searchPlaceholder = 'Search...' }) => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState(initialSortKey)
  const [sortOrder, setSortOrder] = useState(initialSortOrder)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
    setPage(1)
  }

  const filtered = useMemo(() => {
    let result = [...data]

    if (query) {
      const q = query.toLowerCase()
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(q)
        )
      )
    }

    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey]
        const valB = b[sortKey]

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA
        }

        const strA = String(valA).toLowerCase()
        const strB = String(valB).toLowerCase()
        return sortOrder === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA)
      })
    }

    return result
  }, [data, query, sortKey, sortOrder])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-full border border-slate-200/80 bg-white/85 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
          />
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Showing {paginatedData.length} of {filtered.length} entries
        </div>
      </div>

      <div className="overflow-x-auto rounded-[24px] border border-slate-200/70 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/20">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/70 text-xs uppercase tracking-wider text-slate-500 dark:border-white/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 font-semibold ${col.align === 'right' ? 'text-right' : ''}`}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white font-semibold transition cursor-pointer"
                    >
                      {col.header}
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-500">
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="transition hover:bg-slate-50/50 dark:hover:bg-white/5"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 text-slate-700 dark:text-slate-200 ${
                        col.align === 'right' ? 'text-right' : ''
                      }`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="gap-1 px-4 py-2 text-xs"
          >
            <ChevronLeft size={14} />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition cursor-pointer ${
                  p === page
                    ? 'bg-primary text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="gap-1 px-4 py-2 text-xs"
          >
            Next
            <ChevronRight size={14} />
          </Button>
        </div>
      )}
    </div>
  )
}
