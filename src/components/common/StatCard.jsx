import { motion } from 'framer-motion'

export const StatCard = ({ label, value, change, icon: Icon, tone = 'from-primary to-accent' }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[20px] border border-white/20 bg-white/75 p-5 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{value}</p>
          <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">{change}</p>
        </div>
        {Icon ? (
          <div className={`grid h-12 w-12 place-items-center rounded-[16px] bg-gradient-to-br ${tone} text-white shadow-lg`}>
            <Icon size={22} />
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}
