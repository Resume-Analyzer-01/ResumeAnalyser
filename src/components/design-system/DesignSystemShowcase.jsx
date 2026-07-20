import { Alert } from '../ui/Alert'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { Breadcrumb } from '../ui/Breadcrumb'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { Dropdown } from '../ui/Dropdown'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'
import { Pagination } from '../ui/Pagination'
import { Radio } from '../ui/Radio'
import { Skeleton } from '../ui/Skeleton'
import { Spinner } from '../ui/Spinner'
import { Tabs, TabPanel } from '../ui/Tabs'
import { Textarea } from '../ui/Textarea'
import { Toast } from '../ui/Toast'
import { Accordion } from '../ui/Accordion'
import { Tooltip } from '../ui/Tooltip'
import { Drawer } from '../ui/Drawer'
import { useState } from 'react'

export const DesignSystemShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-white/15 bg-white/70 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:bg-slate-900/60">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Design system showcase</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="ghost">Ghost action</Button>
          <Tooltip content="Premium action">
            <Button variant="primary">Hover me</Button>
          </Tooltip>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-white/15 bg-white/70 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:bg-slate-900/60">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Form controls</h3>
          <div className="mt-4 space-y-4">
            <Input label="Email" placeholder="name@company.com" icon={<span>@</span>} />
            <Textarea label="Message" placeholder="Tell us about the role" />
            <Dropdown label="Delivery mode" options={[{ label: 'Select an option', value: '' }, { label: 'Remote', value: 'remote' }, { label: 'Hybrid', value: 'hybrid' }]} />
            <Checkbox label="I agree to the hiring brief" description="This keeps the review aligned with the role scope." />
            <Radio label="Senior practitioner" description="For experienced operators" />
          </div>
        </div>

        <div className="rounded-[24px] border border-white/15 bg-white/70 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:bg-slate-900/60">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Feedback & status</h3>
          <div className="mt-4 space-y-4">
            <Alert title="Role aligned" variant="success">The resume highlights leadership and measurable delivery.</Alert>
            <Alert title="Add more metrics" variant="warning">A few bullets would benefit from stronger quantification.</Alert>
            <Toast title="Saved draft" description="Your edits were stored securely." status="success" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">ATS ready</Badge>
              <Badge variant="accent">New</Badge>
              <Badge variant="success">Strong fit</Badge>
              <Badge variant="warning">Needs review</Badge>
              <Badge variant="danger">High risk</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Avatar name="AO" />
              <Avatar name="MS" size="lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/15 bg-white/70 p-6 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:bg-slate-900/60">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Navigation & loading</h3>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Resume review' }, { label: 'Design system' }]} />
          <Pagination currentPage={2} totalPages={5} onPageChange={() => null} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Spinner size="md" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-52" />
        </div>
        <Tabs items={[{ label: 'Summary', value: 'summary' }, { label: 'Details', value: 'details' }]}> 
          <TabPanel value="summary"><div className="mt-3 rounded-[20px] border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">A concise summary for the current review.</div></TabPanel>
          <TabPanel value="details"><div className="mt-3 rounded-[20px] border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">Detailed recommendations with tailored scoring.</div></TabPanel>
        </Tabs>
        <div className="mt-6">
          <Accordion items={[{ title: 'How does ATS scoring work?', content: 'The system evaluates keyword density, section order, and clarity of achievement statements.' }, { title: 'Can I export the review?', content: 'Yes, the generated insights can be shared as a polished summary or PDF-ready brief.' }]} />
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Design system modal" footer={<><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button><Button>Confirm</Button></>}>
        <p className="text-sm text-slate-600 dark:text-slate-300">This modal shares the same radius, blur, and focus treatment as the rest of the interface.</p>
      </Modal>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Design system drawer">
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>Drawer content can house filters, actions, or onboarding flows.</p>
          <Button className="w-full">Continue</Button>
        </div>
      </Drawer>
    </div>
  )
}
