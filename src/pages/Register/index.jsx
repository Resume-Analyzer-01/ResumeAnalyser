import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { AuthShell } from '../../components/forms/AuthShell'
import { PasswordInput } from '../../components/forms/PasswordInput'
import { ProgressBar } from '../../components/common/ProgressBar'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { Checkbox } from '../../components/ui/Checkbox'
import { Input } from '../../components/ui/Input'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, login } = useAuth()
  const navigate = useNavigate()

  const strength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score += 35
    if (/[A-Z]/.test(password)) score += 20
    if (/[0-9]/.test(password)) score += 20
    if (/[^A-Za-z0-9]/.test(password)) score += 25
    return Math.min(100, score)
  }, [password])

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
      const result = await register(name, email, password)
      if (result.success) {
        // Auto-login after successful registration
        await login(email, password)
        setStatus('success')
        navigate('/dashboard')
      } else {
        setStatus('error')
        setErrorMsg(result.message || 'Registration failed')
      }
    } catch (error) {
      setStatus('error')
      setErrorMsg(error.response?.data?.message || 'Network error occurred')
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start a polished resume analysis workspace with mock data and production-ready states."
      footer={
        <>
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-primary">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {status === 'error' ? <Alert variant="danger" title="Error" description={errorMsg} /> : null}
        {status === 'success' ? <Alert variant="success" title="Account created" description="Redirecting to dashboard..." /> : null}
        <Input label="Full Name" placeholder="Enter Your Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" required />
        <PasswordInput label="Confirm Password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <Checkbox label="Accept terms" description="I agree to product updates and privacy terms." required />
        <Button type="submit" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? 'Creating Account...' : 'Create Account'}
        </Button>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="secondary" className="gap-2" onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}>
            <FaGoogle size={16} />
            Google
          </Button>
          <Button type="button" variant="secondary" className="gap-2" onClick={() => window.location.href = 'http://localhost:5000/api/auth/github'}>
            <FaGithub size={16} />
            GitHub
          </Button>
        </div>
      </form>
    </AuthShell>
  )
}

export default RegisterPage
