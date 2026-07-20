import { useState, useRef, useEffect } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const MultiSelect = ({ label, value = [], onChange, options = [], placeholder = 'Select options', error, hint, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [])

  const handleToggle = (val) => {
    const nextValue = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val]
    onChange?.(nextValue)
  }

  const handleRemove = (e, val) => {
    e.stopPropagation()
    onChange?.(value.filter((v) => v !== val))
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </span>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex min-h-[46px] w-full items-center justify-between rounded-[20px] border border-slate-200/80 bg-white/80 px-4 py-2 text-left text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 cursor-pointer ${
          error ? 'border-danger/60 ring-danger/10' : ''
        }`}
      >
        <div className="flex flex-wrap gap-1.5">
          {value.length === 0 ? (
            <span className="text-slate-400">{placeholder}</span>
          ) : (
            value.map((val) => {
              const opt = options.find((o) => o.value === val)
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 pl-2.5 pr-1.5 py-0.5 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-white"
                >
                  {opt ? opt.label : val}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, val)}
                    className="rounded-full p-0.5 hover:bg-slate-950/10 dark:hover:bg-white/10"
                  >
                    <X size={12} />
                  </button>
                </span>
              )
            })
          )}
        </div>
        <ChevronDown
          size={16}
          className={`ml-2 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-[20px] border border-slate-200 bg-white/90 p-1.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-400">No options available</div>
              ) : (
                options.map((opt) => {
                  const isChecked = value.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleToggle(opt.value)}
                      className={`flex w-full items-center justify-between rounded-[14px] px-4 py-2.5 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-white/5 ${
                        isChecked ? 'font-semibold text-primary dark:text-white' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isChecked && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hint && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
      {error && <p className="mt-2 text-xs font-medium text-danger">{error}</p>}
    </div>
  )
}
