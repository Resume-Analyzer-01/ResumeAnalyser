import api from '../lib/axios'

export const analyzeResume = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)

  try {
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload and analyze resume.')
  }
}

export const optimizeResume = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)

  try {
    const response = await api.post('/resume/optimize', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to optimize resume.')
  }
}
