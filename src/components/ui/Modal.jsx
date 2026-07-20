import { AnimatePresence, motion } from 'framer-motion'

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            className="w-full max-w-lg rounded-[24px] border border-white/15 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:bg-slate-900/80"
            onClick={(e) => e.stopPropagation()}
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
            <div className="mt-5">{children}</div>
            {footer ? <div className="mt-6 flex justify-end gap-3">{footer}</div> : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
