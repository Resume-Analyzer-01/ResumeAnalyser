import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '../../components/common/PageTransition'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'

const NotFoundPage = () => {
  return (
    <PageTransition className="grid min-h-[28rem] place-items-center">
      <GlassCard className="max-w-xl p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          The requested ResumeAI screen is not available.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button className="gap-2">
            <ArrowLeft size={16} />
            Back Home
          </Button>
        </Link>
      </GlassCard>
    </PageTransition>
  )
}

export default NotFoundPage
