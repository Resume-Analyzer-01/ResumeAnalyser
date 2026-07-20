import { motion } from 'framer-motion'

export const Tooltip = ({ children, content, position = 'top' }) => {
  return (
    <div className="group relative inline-flex">
      {children}
      <motion.div initial={{ opacity: 0, y: 4 }} whileHover={{ opacity: 1, y: 0 }} className={`pointer-events-none absolute z-20 hidden rounded-full bg-slate-950 px-3 py-2 text-xs font-medium text-white shadow-lg group-hover:block ${position === 'top' ? '-top-11 left-1/2 -translate-x-1/2' : position === 'bottom' ? '-bottom-11 left-1/2 -translate-x-1/2' : position === 'left' ? 'left-[-0.7rem] top-1/2 -translate-x-full -translate-y-1/2' : 'right-[-0.7rem] top-1/2 translate-x-full -translate-y-1/2'}`}>
        {content}
      </motion.div>
    </div>
  )
}
