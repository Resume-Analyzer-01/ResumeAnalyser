import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // send cookies
})

// Optional: Add interceptors here for handling 401s (e.g., token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Attempt to refresh token
        await axios.post('http://localhost:5000/api/auth/refresh', {}, { withCredentials: true })
        // If successful, retry the original request
        return api(originalRequest)
      } catch (refreshError) {
        // If refresh fails, we should probably log the user out
        // AuthContext will handle state, but here we can just reject
        return Promise.reject(refreshError)
      }
    }
    
    return Promise.reject(error)
  }
)

export default api
