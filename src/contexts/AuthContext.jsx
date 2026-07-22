import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/axios'

export const AuthContext = createContext(null)

let cachedSession = undefined
let sessionRequest = null

const fetchSession = async () => {
  const response = await api.get('/auth/session', { skipAuthRefresh: true })
  return response.data?.data || null
}

const getSession = async ({ force = false } = {}) => {
  if (!force && cachedSession !== undefined) {
    return cachedSession
  }

  if (!force && sessionRequest) {
    return sessionRequest
  }

  sessionRequest = fetchSession()
    .then((session) => {
      cachedSession = session
      return session
    })
    .finally(() => {
      sessionRequest = null
    })

  return sessionRequest
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const syncSession = async ({ force = false } = {}) => {
    const session = await getSession({ force })
    setUser(session)
    return session
  }

  const checkAuth = async ({ force = true } = {}) => {
    setLoading(true)
    try {
      return await syncSession({ force })
    } catch {
      setUser(null)
      cachedSession = null
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false

    const hydrateSession = async () => {
      try {
        const session = await getSession()
        if (!ignore) {
          setUser(session)
        }
      } catch {
        if (!ignore) {
          setUser(null)
          cachedSession = null
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    hydrateSession()

    return () => {
      ignore = true
    }
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.success) {
      cachedSession = response.data.data.user
      setUser(response.data.data.user)
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
      cachedSession = null
      setUser(null)
    }
  }
  
  const updateProfileLocally = (updates) => {
    setUser((prev) => {
      const nextUser = { ...(prev || {}), ...updates }
      cachedSession = nextUser
      return nextUser
    })
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
