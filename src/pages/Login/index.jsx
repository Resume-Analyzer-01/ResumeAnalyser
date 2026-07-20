import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { AuthShell } from '../../components/forms/AuthShell'
import { PasswordInput } from '../../components/forms/PasswordInput'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { Checkbox } from '../../components/ui/Checkbox'
import { Input } from '../../components/ui/Input'

const LoginPage = () => {
  const [status, setStatus] = useState('idle')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const result = await login(email, password)
      if (result.success) {
        setStatus('success')
        navigate('/dashboard')
      } else {
        setStatus('error')
        setErrorMsg(result.message || 'Login failed')
      }
    } catch (error) {
      setStatus('error')
      setErrorMsg(error.response?.data?.message || 'Network error occurred')
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to review reports, analyze resumes, and manage profile settings."
      footer={
        <>
          New to ResumeAI?{' '}
          <Link to="/register" className="font-semibold text-primary">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {status === 'error' ? <Alert variant="danger" title="Error" description={errorMsg} /> : null}
        {status === 'success' ? <Alert variant="success" title="Signed in" description="Redirecting to dashboard..." /> : null}
        <Input label="Email" type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <PasswordInput placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Checkbox label="Remember me" className="border-0 bg-transparent px-0 py-0 shadow-none" />
          <Link to="/forgot-password" className="text-sm font-semibold text-primary">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" disabled={status === 'loading'} className="w-full">
          {status === 'loading' ? 'Signing in...' : 'Login'}
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

export default LoginPage
