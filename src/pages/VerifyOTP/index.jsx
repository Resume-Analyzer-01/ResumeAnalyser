import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import api from '../../lib/axios'
import { AuthShell } from '../../components/forms/AuthShell'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'

const VerifyOTPPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  const inputsRef = useRef([])
  const [digits, setDigits] = useState(Array.from({ length: 6 }, () => ''))
  const [seconds, setSeconds] = useState(58)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const complete = useMemo(() => digits.every(Boolean), [digits])

  const updateDigit = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1)
    const nextDigits = [...digits]
    nextDigits[index] = nextValue
    setDigits(nextDigits)
    if (nextValue && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!complete) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const otp = digits.join('')
      const res = await api.post('/auth/verify-otp', { email, otp })
      if (res.data.success) {
        setStatus('success')
        setTimeout(() => {
          navigate('/reset-password', { state: { email, otp } })
        }, 1000)
      } else {
        setStatus('error')
        setErrorMsg(res.data.message || 'Invalid OTP')
      }
    } catch (error) {
      setStatus('error')
      setErrorMsg(error.response?.data?.message || 'Network error occurred')
    }
  }

  const handleResend = async () => {
    try {
      await api.post('/auth/forgot-password', { email })
      setSeconds(58)
      setStatus('idle')
    } catch (error) {
      setStatus('error')
      setErrorMsg('Failed to resend OTP')
    }
  }

  if (!email) {
    return <Navigate to="/forgot-password" replace />
  }

  return (
    <AuthShell
      title="Verify OTP"
      subtitle={`Enter the 6-digit code sent to ${email} to continue.`}
      footer={
        <Link to="/reset-password" className="font-semibold text-primary">
          Continue to reset password
        </Link>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {status === 'error' ? <Alert variant="danger" title="Error" description={errorMsg} /> : null}
        {status === 'success' ? <Alert variant="success" title="Success" description="OTP verified. Redirecting..." /> : null}
        <div className="grid grid-cols-6 gap-2">
          {digits.map((digit, index) => (
            <label key={index}>
              <span className="sr-only">OTP digit {index + 1}</span>
              <input
                ref={(node) => {
                  inputsRef.current[index] = node
                }}
                value={digit}
                inputMode="numeric"
                maxLength={1}
                onChange={(event) => updateDigit(index, event.target.value)}
                className="h-14 w-full rounded-[18px] border border-slate-200 bg-white/80 text-center text-xl font-bold text-slate-950 outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
              />
            </label>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>Code expires in 00:{String(seconds).padStart(2, '0')}</span>
          <button
            type="button"
            disabled={seconds > 0 || status === 'loading'}
            onClick={handleResend}
            className="font-semibold text-primary disabled:text-slate-400"
          >
            Resend
          </button>
        </div>
        <Button type="submit" disabled={!complete || status === 'loading'} className="w-full">
          {status === 'loading' ? 'Verifying...' : 'Verify Code'}
        </Button>
      </form>
    </AuthShell>
  )
}

export default VerifyOTPPage
