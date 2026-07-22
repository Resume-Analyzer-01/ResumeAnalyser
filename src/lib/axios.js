import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // send cookies
})

const shouldSkipRefresh = (request) => {
  const url = request?.url || ''

  if (request?.skipAuthRefresh) {
    return true
  }

  return url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh') ||
    url.includes('/auth/session') ||
    url.includes('/auth/forgot-password') ||
    url.includes('/auth/verify-otp') ||
    url.includes('/auth/reset-password')
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest?._retry && !shouldSkipRefresh(originalRequest)) {
      originalRequest._retry = true
      
      try {
        // Attempt to refresh token
        const refreshResponse = await api.post('/auth/refresh', {}, { skipAuthRefresh: true })

        if (!refreshResponse.data?.success) {
          return Promise.reject(error)
        }

        // If successful, retry the original request
        return api(originalRequest)
      } catch {
        return Promise.reject(error)
      }
    }
    
    return Promise.reject(error)
  }
)

export default api
