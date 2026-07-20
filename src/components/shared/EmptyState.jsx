import { UploadCloud } from 'lucide-react'
import { Button } from '../ui/Button'

export const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-white/20 bg-white/50 p-10 text-center shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:bg-slate-900/50">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white">
        <UploadCloud size={24} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">{description}</p>
      {onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
