import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const Accordion = ({ items = [] }) => {
  const [open, setOpen] = useState(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.title} className="rounded-[20px] border border-white/15 bg-white/70 shadow-sm backdrop-blur-xl dark:bg-slate-900/60">
          <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">
            <span>{item.title}</span>
            <ChevronDown className={`transition ${open === index ? 'rotate-180' : ''}`} size={16} />
          </button>
          {open === index ? <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-300">{item.content}</div> : null}
        </div>
      ))}
    </div>
  )
}
