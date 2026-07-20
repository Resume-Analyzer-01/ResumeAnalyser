import { useState } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import api from '../../lib/axios'
import { AuthShell } from '../../components/forms/AuthShell'
import { PasswordInput } from '../../components/forms/PasswordInput'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  
  const { email, otp } = location.state || {}

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setStatus('error')
      setErrorMsg('Passwords do not match')
      return
    }

    setStatus('loading')
    setErrorMsg('')
    
    try {
      const res = await api.post('/auth/reset-password', { email, otp, password })
      if (res.data.success) {
        setStatus('success')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setStatus('error')
        setErrorMsg(res.data.message || 'Failed to reset password')
      }
    } catch (error) {
      setStatus('error')
      setErrorMsg(error.response?.data?.message || 'Network error occurred')
    }
  }

  if (!email || !otp) {
    return <Navigate to="/forgot-password" replace />
  }

  return (
    <AuthShell
      title="Set new password"
      subtitle="Create a stronger password and return to the login screen."
      footer={
        <Link to="/login" className="font-semibold text-primary">
          Return to login
        </Link>
      }
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        {status === 'error' ? <Alert variant="danger" title="Error" description={errorMsg} /> : null}
        {status === 'success' ? <Alert variant="success" title="Password updated" description="Password reset successfully. Redirecting to login..." /> : null}
        <PasswordInput label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <PasswordInput label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <Button type="submit" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </AuthShell>
  )
}

export default ResetPasswordPage
