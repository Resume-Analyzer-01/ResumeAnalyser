import { motion } from 'framer-motion'

export const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4, scale: 1.01, transition: { duration: 0.2 } } : undefined}
      className={`rounded-[20px] border border-white/15 bg-white/70 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/60 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
