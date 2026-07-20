import { Send } from 'lucide-react'
import { contactChannels } from '../../constants/mockData'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'

const ContactPage = () => {
  return (
    <PageTransition className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <SectionHeader
          eyebrow="Contact"
          title="Talk to the ResumeAI team"
          description="Use these frontend-ready support, sales, and security contact paths while backend ticketing remains future work."
        />
        <div className="mt-8 space-y-4">
          {contactChannels.map((channel) => {
            const Icon = channel.icon

            return (
              <GlassCard key={channel.title} className="flex items-center gap-4 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-[16px] bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">{channel.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{channel.value}</p>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>

      <GlassCard className="p-6">
        <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
          <Input label="Full Name" placeholder="Enter Your Name" required />
          <Input label="Email" type="email" placeholder="Enter Your Email" required />
          <Input label="Subject" placeholder="Enter Subject Name You Want To Talk About" required />
          <Textarea label="Message" rows={6} placeholder="Tell us what you want to build with ResumeAI." required />
          <Button type="submit" className="gap-2">
            <Send size={16} />
            Send Message
          </Button>
        </form>
      </GlassCard>
    </PageTransition>
  )
}

export default ContactPage
