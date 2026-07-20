import { Search } from 'lucide-react'

export const SearchBar = ({ value, onChange, placeholder = 'Search', className = '' }) => {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{placeholder}</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-slate-200/80 bg-white/80 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
      />
    </label>
  )
}
