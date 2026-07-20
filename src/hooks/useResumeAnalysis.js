import { useState } from 'react'
import { analyzeResume } from '../services/resumeService'

export const useResumeAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizedResume, setOptimizedResume] = useState(null)

  const runAnalysis = async (file) => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const payload = await analyzeResume(file)
      setResult(payload)
    } catch (err) {
      setError(err.message || 'Unable to analyze resume right now.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const runOptimization = async (file) => {
    setIsOptimizing(true)
    setError(null)
    setOptimizedResume(null)

    try {
      const { optimizeResume } = await import('../services/resumeService')
      const payload = await optimizeResume(file)
      setOptimizedResume(payload.data?.optimizedResume || null)
    } catch (err) {
      setError(err.message || 'Unable to optimize resume right now.')
    } finally {
      setIsOptimizing(false)
    }
  }

  return { isAnalyzing, result, error, runAnalysis, isOptimizing, optimizedResume, runOptimization }
}
