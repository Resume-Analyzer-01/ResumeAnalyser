import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { pricingPlans } from '../../constants/mockData'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'

const PricingPage = () => {
  return (
    <PageTransition className="space-y-10">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple plans for better resume outcomes"
        description="Choose a frontend-ready plan path and connect payments later without changing the page structure."
        align="center"
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <GlassCard
            key={plan.name}
            className={`p-6 ${plan.highlighted ? 'border-primary/40 bg-primary/8 shadow-primary/20' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{plan.name}</h2>
              {plan.highlighted ? <Badge>Best value</Badge> : null}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{plan.description}</p>
            <div className="mt-7 flex items-end gap-2">
              <span className="text-5xl font-bold text-slate-950 dark:text-white">{plan.price}</span>
              <span className="pb-2 text-sm text-slate-500 dark:text-slate-400">{plan.period}</span>
            </div>
            <div className="mt-7 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>
            <Link to={plan.highlighted ? '/register' : '/contact'} className="mt-7 block">
              <Button className="w-full">{plan.cta}</Button>
            </Link>
          </GlassCard>
        ))}
      </div>
    </PageTransition>
  )
}

export default PricingPage
