import { motion } from 'framer-motion'
import { featureCards } from '../../constants/mockData'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { GlassCard } from '../../components/ui/GlassCard'

const FeaturesPage = () => {
  return (
    <PageTransition className="space-y-10">
      <SectionHeader
        eyebrow="Features"
        title="Premium resume intelligence modules"
        description="All feature cards are built with reusable data, icons, dark mode styling, and hover animation."
        align="center"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map((feature, index) => {
          const Icon = feature.icon

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <GlassCard className="h-full p-6">
                <div className={`grid h-12 w-12 place-items-center rounded-[16px] bg-gradient-to-br ${feature.accent} text-white`}>
                  <Icon size={22} />
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </PageTransition>
  )
}

export default FeaturesPage
