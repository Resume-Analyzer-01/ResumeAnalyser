export const ToggleSwitch = ({ label, checked, onChange, description, className = '', ...props }) => {
  return (
    <label className={`flex items-center justify-between cursor-pointer rounded-[20px] p-1 ${className}`}>
      <div className="flex flex-col">
        {label && (
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {label}
          </span>
        )}
        {description && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div
          className={`h-6 w-11 rounded-full transition-all duration-300 ${
            checked ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'
          }`}
        />
        <div
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  )
}
