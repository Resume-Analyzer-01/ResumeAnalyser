import { useMemo } from 'react'
import { BarChart3, CheckCircle2, Sparkles, TriangleAlert } from 'lucide-react'
import { insightsSample } from '../constants/mockData'
import { GlassCard } from '../components/ui/GlassCard'
import { Button } from '../components/ui/Button'

const InsightsPage = () => {
  const metrics = useMemo(() => insightsSample.metrics, [])

  return (
    <div className="space-y-8">
      <GlassCard className="p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-500">Analysis overview</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Strategic resume review</h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{insightsSample.summary}</p>
          </div>
          <div className="rounded-[20px] border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 px-5 py-4 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-300">Overall score</p>
            <p className="text-4xl font-semibold text-slate-900 dark:text-white">{insightsSample.score}/100</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-8">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="rounded-2xl bg-slate-900/90 p-2 text-white dark:bg-white/10"><BarChart3 size={18} /></div>
            <h3 className="text-xl font-semibold">Performance signals</h3>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[20px] border border-white/15 bg-white/70 p-4 text-center dark:bg-slate-900/60">
                <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-500 p-2 text-white"><Sparkles size={18} /></div>
            <h3 className="text-xl font-semibold">What stands out</h3>
          </div>
          <ul className="mt-6 space-y-3">
            {insightsSample.strengths.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-[16px] border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="p-8">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white">
          <div className="rounded-2xl bg-amber-500/15 p-2 text-amber-500"><TriangleAlert size={18} /></div>
          <h3 className="text-xl font-semibold">Optimization opportunities</h3>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {insightsSample.risks.map((risk) => (
            <div key={risk} className="rounded-[20px] border border-white/15 bg-white/70 p-4 text-sm text-slate-600 dark:bg-slate-900/60 dark:text-slate-300">
              {risk}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button>Generate action plan</Button>
          <Button variant="secondary">Export summary</Button>
        </div>
      </GlassCard>
    </div>
  )
}

export default InsightsPage
