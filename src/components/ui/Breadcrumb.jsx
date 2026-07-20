import { Link } from 'react-router-dom'

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {index > 0 ? <span>/</span> : null}
          {item.to ? <Link to={item.to} className="transition hover:text-primary">{item.label}</Link> : <span className="font-medium text-slate-800 dark:text-slate-100">{item.label}</span>}
        </div>
      ))}
    </nav>
  )
}
