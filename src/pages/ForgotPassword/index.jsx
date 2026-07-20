import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../lib/axios'
import { AuthShell } from '../../components/forms/AuthShell'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await api.post('/auth/forgot-password', { email })
      if (res.data.success) {
        setStatus('success')
        setTimeout(() => {
          navigate('/verify-otp', { state: { email } })
        }, 1500)
      } else {
        setStatus('error')
        setErrorMsg(res.data.message || 'Failed to send OTP')
      }
    } catch (error) {
      setStatus('error')
      setErrorMsg(error.response?.data?.message || 'Network error occurred')
    }
  }

  return (
    <AuthShell
      title="Reset access"
      subtitle="Enter your email to receive an OTP for password recovery."
      footer={
        <Link to="/login" className="font-semibold text-primary">
          Back to login
        </Link>
      }
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        {status === 'error' ? <Alert variant="danger" title="Error" description={errorMsg} /> : null}
        {status === 'success' ? <Alert variant="success" title="OTP sent" description="Please check your email for the reset OTP." /> : null}
        <Input label="Email" type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? 'Sending...' : 'Send Reset Code'}
        </Button>
        <Link to="/verify-otp" className="block text-center text-sm font-semibold text-primary">
          Enter OTP
        </Link>
      </form>
    </AuthShell>
  )
}

export default ForgotPasswordPage
