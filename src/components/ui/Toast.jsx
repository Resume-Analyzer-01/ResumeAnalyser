import { motion } from 'framer-motion'

export const Toast = ({ title, description, status = 'info' }) => {
  const styles = {
    success: 'border-success/30 bg-success/10 text-success',
    warning: 'border-warning/30 bg-warning/10 text-warning',
    danger: 'border-danger/30 bg-danger/10 text-danger',
    info: 'border-primary/30 bg-primary/10 text-primary'
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[20px] border px-4 py-3 shadow-lg ${styles[status]}`}>
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm opacity-80">{description}</p> : null}
    </motion.div>
  )
}
