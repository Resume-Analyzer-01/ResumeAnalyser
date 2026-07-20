import { AlertTriangle } from 'lucide-react'
import { Button } from '../ui/Button'

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-rose-400/30 bg-rose-500/10 p-10 text-center shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-500">
        <AlertTriangle size={22} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Analysis interrupted</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">{message}</p>
      {onRetry && <Button className="mt-6" onClick={onRetry}>Try again</Button>}
    </div>
  )
}
