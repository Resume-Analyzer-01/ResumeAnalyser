import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, CheckCircle2, CirclePlay, FileText, Sparkles, Star } from 'lucide-react'
import heroImage from '../../assets/hero.png'
import {
  faqItems,
  featureCards,
  howItWorks,
  pricingPlans,
  scoreBreakdown,
  testimonials,
  trustedCompanies
} from '../../constants/mockData'
import { Accordion } from '../../components/ui/Accordion'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { CircularProgress } from '../../components/common/CircularProgress'
import { PageTransition } from '../../components/common/PageTransition'
import { ProgressBar } from '../../components/common/ProgressBar'
import { SectionHeader } from '../../components/common/SectionHeader'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
}

const HomePage = () => {
  return (
    <PageTransition className="space-y-20">
      <section className="relative overflow-hidden rounded-[32px] border border-white/25 bg-white/55 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl sm:p-8 lg:p-10 dark:border-white/10 dark:bg-slate-950/50">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(79,70,229,0.18),transparent_38%,rgba(6,182,212,0.16)_70%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.16)_1px,transparent_0)] bg-[length:28px_28px] opacity-30 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Badge variant="accent" className="gap-2">
                <Sparkles size={14} />
                Premium AI SaaS frontend
              </Badge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="mt-6 max-w-4xl text-5xl font-bold tracking-normal text-slate-950 sm:text-6xl lg:text-7xl dark:text-white"
            >
              AI Resume Analyzer
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Upload your resume and receive ATS score, keyword analysis, formatting suggestions, grammar improvements, and AI-powered recommendations.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <Link to="/uploadpage">
                <Button className="gap-2">
                  Analyze Resume
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative min-h-[32rem]"
          >
            <motion.img
              src={heroImage}
              alt="Resume analytics illustration"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto h-[28rem] w-full max-w-lg rounded-[28px] object-cover shadow-2xl shadow-slate-950/20"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 top-8 w-44 rounded-[20px] border border-white/25 bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80"
            >
              <CircularProgress value={92} label="ATS" size="sm" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 right-0 w-64 rounded-[20px] border border-white/25 bg-white/85 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-[14px] bg-cyan-500 text-white">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">AI Analysis</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">9 improvements found</p>
                </div>
              </div>
              <ProgressBar label="Resume rating" value={88} color="bg-emerald-500" className="mt-4" />
            </motion.div>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-6 top-2 hidden rounded-full border border-white/25 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur-xl sm:inline-flex dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-200"
            >
              <CheckCircle2 size={16} className="mr-2 text-emerald-500" />
              Keyword match 86%
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="features">
        <SectionHeader
          eyebrow="Features"
          title="Everything needed to review, score, and improve a resume"
          description="Each module is built as frontend-ready UI with realistic mock data, animations, and responsive states."
          align="center"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {featureCards.map((feature) => {
            const Icon = feature.icon

            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <GlassCard className="h-full p-5">
                  <div className={`grid h-12 w-12 place-items-center rounded-[16px] bg-gradient-to-br ${feature.accent} text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <section>
        <SectionHeader
          eyebrow="How it works"
          title="Four clear steps from upload to improved resume"
          description="The workflow is designed for a future secure backend, while the current frontend remains fully usable with mock data."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {howItWorks.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300">{step.step}</span>
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="grid place-items-center p-8">
          <CircularProgress value={92} label="ATS Score" />
          <p className="mt-6 max-w-md text-center text-sm leading-6 text-slate-600 dark:text-slate-300">
            Dashboard preview with circular progress, keyword signals, and formatting readiness.
          </p>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">ATS score preview</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Analysis dashboard</h3>
            </div>
            <Badge variant="success">Ready</Badge>
          </div>
          <div className="mt-6 space-y-4">
            {scoreBreakdown.map((metric) => (
              <ProgressBar key={metric.label} {...metric} />
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="rounded-[22px] bg-slate-950 p-6 text-white shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">Professional resume mockup</p>
                <h3 className="mt-1 text-2xl font-bold">ResumeAI</h3>
              </div>
              <FileText className="text-cyan-300" size={24} />
            </div>
            {['AI Product Strategy', 'Lifecycle Analytics', 'Cross-functional Leadership', 'Experimentation'].map((item) => (
              <div key={item} className="mb-3 rounded-[14px] bg-white/8 px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </GlassCard>
        <div>
          <SectionHeader
            eyebrow="Resume preview"
            title="Readable, recruiter-friendly structure"
            description="The mockup shows how recommendations translate into concise sections, stronger hierarchy, and better ATS parsing."
          />
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Testimonials" title="Built for job seekers who need clear next steps" align="center" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <GlassCard key={testimonial.name} className="h-full">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{testimonial.quote}</p>
              <div className="mt-6">
                <p className="font-bold text-slate-950 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Pricing" title="Plans for every stage of the job search" align="center" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <GlassCard
              key={plan.name}
              className={`h-full p-6 ${plan.highlighted ? 'border-primary/40 bg-primary/8 shadow-primary/20' : ''}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{plan.name}</h3>
                {plan.highlighted ? <Badge>Popular</Badge> : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{plan.description}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-bold text-slate-950 dark:text-white">{plan.price}</span>
                <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">{plan.period}</span>
              </div>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link to={plan.highlighted ? '/register' : '/pricing'} className="mt-6 block">
                <Button className="w-full">{plan.cta}</Button>
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="FAQ"
          title="Clear answers before backend integration"
          description="Every screen is frontend-only today, with services, actions, and states prepared for production APIs later."
        />
        <Accordion items={faqItems} />
      </section>

      <section className="overflow-hidden rounded-[32px] border border-white/25 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/25 sm:p-10 dark:border-white/10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Ready to analyze</p>
            <h2 className="mt-3 text-4xl font-bold tracking-normal">Improve your resume before the next application.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Start with a polished mock workflow today and connect real AI scoring when the backend is ready.
            </p>
          </div>
          <Link to="/uploadpage">
            <Button className="gap-2">
              Analyze Resume Now
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default HomePage
