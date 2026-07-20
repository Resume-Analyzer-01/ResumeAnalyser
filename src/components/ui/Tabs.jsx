import { useState } from 'react'

export const Tabs = ({ items = [], children }) => {
  const [active, setActive] = useState(items[0]?.value || '')

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-[20px] border border-white/15 bg-white/70 p-2 shadow-sm backdrop-blur-xl dark:bg-slate-900/60">
        {items.map((item) => (
          <button key={item.value} onClick={() => setActive(item.value)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === item.value ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{children?.find?.((child) => child.props.value === active) || children}</div>
    </div>
  )
}

export const TabPanel = ({ value, children }) => <div value={value}>{children}</div>
