import { AnimatePresence, motion } from 'framer-motion'

export const Drawer = ({ isOpen, onClose, title, children, side = 'right' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: side === 'left' ? -360 : 360 }}
            animate={{ x: 0 }}
            exit={{ x: side === 'left' ? -360 : 360 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            className={`absolute top-0 ${
              side === 'left' ? 'left-0' : 'right-0'
            } h-full w-full max-w-md border-l border-white/10 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:bg-slate-900/80`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full border border-slate-200/70 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5 transition"
              >
                Close
              </button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
