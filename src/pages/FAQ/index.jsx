import { faqItems } from '../../constants/mockData'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { Accordion } from '../../components/ui/Accordion'
import { GlassCard } from '../../components/ui/GlassCard'

const FAQPage = () => {
  return (
    <PageTransition className="mx-auto max-w-4xl">
      <SectionHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Answers for the frontend-only ResumeAI experience and future backend integration points."
        align="center"
      />
      <GlassCard className="mt-10 p-5">
        <Accordion items={faqItems} />
      </GlassCard>
    </PageTransition>
  )
}

export default FAQPage
