export const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-[2px]',
    md: 'h-6 w-6 border-[3px]',
    lg: 'h-10 w-10 border-[4px]'
  }

  return <div className={`animate-spin rounded-full border-t-primary border-slate-200/70 ${sizeClasses[size]}`} />
}
