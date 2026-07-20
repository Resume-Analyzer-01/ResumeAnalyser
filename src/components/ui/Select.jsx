import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Select = ({ label, value, onChange, options = [], placeholder = 'Select option', error, hint, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [])

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-[20px] border border-slate-200/80 bg-white/80 px-4 py-3 text-left text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 ${
          error ? 'border-danger/60 ring-danger/10' : ''
        }`}
      >
        <span className={selectedOption ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

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
                options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange?.(opt.value)
                      setIsOpen(false)
                    }}
                    className={`w-full rounded-[14px] px-4 py-2.5 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-white/5 ${
                      value === opt.value
                        ? 'bg-primary/10 font-semibold text-primary dark:bg-primary/20 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))
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
