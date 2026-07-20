export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-slate-900/50 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 flex items-center justify-between ${className}`} {...props}>{children}</div>
)

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>{children}</div>
)

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 border-t border-slate-100 pt-4 dark:border-white/5 ${className}`} {...props}>{children}</div>
)
