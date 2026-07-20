import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'

const icons = {
  success: <CheckCircle2 size={18} />, 
  warning: <AlertTriangle size={18} />, 
  danger: <AlertTriangle size={18} />, 
  info: <Info size={18} />
}

const styles = {
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  danger: 'border-danger/30 bg-danger/10 text-danger',
  info: 'border-primary/30 bg-primary/10 text-primary'
}

export const Alert = ({ title, description, children, variant = 'info' }) => {
  return (
    <div className={`rounded-[20px] border px-4 py-3 text-sm shadow-sm ${styles[variant]}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icons[variant]}</div>
        <div>
          {title ? <p className="font-semibold">{title}</p> : null}
          {description ? <p className="mt-1">{description}</p> : null}
          {children ? <div className="mt-1">{children}</div> : null}
        </div>
      </div>
    </div>
  )
}
