import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/axios'

export const AuthContext = createContext(null)
const AUTH_SESSION_HINT_KEY = 'resume-analyzer-auth-session'

const persistSessionHint = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_SESSION_HINT_KEY, '1')
  }
}

const clearSessionHint = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_SESSION_HINT_KEY)
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/profile')
      if (response.data.success) {
        setUser(response.data.data)
        persistSessionHint()
      } else {
        setUser(null)
        clearSessionHint()
      }
    } catch (error) {
      setUser(null)
      clearSessionHint()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.success) {
      setUser(response.data.data.user)
      persistSessionHint()
    }
    return response.data
  }

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password })
    return response.data
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      clearSessionHint()
    }
  }
  
  const updateProfileLocally = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth, updateProfileLocally }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
