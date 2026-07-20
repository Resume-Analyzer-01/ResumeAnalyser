import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from './Input'

export const PasswordInput = ({ label = 'Password', ...props }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Input label={label} type={visible ? 'text' : 'password'} className="pr-12" {...props} />
      <button
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((value) => !value)}
        className="absolute right-4 top-10 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-100 cursor-pointer"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
