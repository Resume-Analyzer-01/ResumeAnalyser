import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featureCards } from '../constants/mockData'
import { GlassCard } from '../components/ui/GlassCard'
import { Button } from '../components/ui/Button'

const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-8 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-sm font-medium text-fuchsia-600 dark:text-fuchsia-300">
            <Sparkles size={16} />
            Premium AI Resume Intelligence
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight bg-gradient-to-r from-fuchsia-500 to-violet-500 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
            Turn every résumé into a strategic hiring advantage.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Evaluate storytelling quality, ATS readiness, and executive polish with a calm, premium workflow built for modern talent teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/uploadpage">
              <Button className="gap-2">
                Analyze my resume <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/insights">
              <Button variant="secondary">View sample insights</Button>
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 text-white">
              <BrainCircuit size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase dark:text-slate-400">Live review</p>
              <p className="text-xl font-semibold">Ready in under 2 minutes</p>
            </div>
          </div>
          <GlassCard hover={true} className="mt-6 rounded-[20px] border border-white/10 bg-slate-950/90 p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Resume quality score</p>
                <p className="mt-1 text-3xl font-semibold">88/100</p>
              </div>
              <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">Excellent</div>
            </div>
            <div className="mt-5 flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck size={16} className="text-emerald-400" />
              Strong ATS alignment and executive phrasing
            </div>
          </GlassCard>
        </GlassCard>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featureCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard hover={false} className="h-full">
              <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${card.accent}`} />
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default HomePage
