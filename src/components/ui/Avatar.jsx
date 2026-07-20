export const Avatar = ({ name, src, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
    xl: 'h-20 w-20 text-xl'
  }

  return (
    <div className={`inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-primary to-secondary font-semibold text-white shadow-md ${sizeClasses[size]} ${className}`}>
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : name?.charAt(0).toUpperCase()}
    </div>
  )
}
