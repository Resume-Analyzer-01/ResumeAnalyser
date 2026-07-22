import React, { useState } from 'react'
import { Sparkles, ArrowRight, CheckCircle, Lightbulb, Loader2 } from 'lucide-react'

export const AICoach = ({ currentScore = 78, previousScore = 70 }) => {
  const [coaching, setCoaching] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetCoaching = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/coaching/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentScore, previousScore })
      })
      const data = await res.json()
      if (data.success) {
        setCoaching(data)
      }
    } catch (err) {
      console.error('Coaching Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10 border border-cyan-500/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-5 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white">
          <Sparkles className="w-5 h-5 text-cyan-500" />
          <span>Interactive AI Coach</span>
        </div>
        {!coaching && (
          <button
            onClick={handleGetCoaching}
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing Strategy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze Next Score Boost</span>
              </>
            )}
          </button>
        )}
      </div>

      {coaching ? (
        <div className="space-y-5">
          {/* Summary Progress Pill */}
          <div className="bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Latest Revision Boost</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Score increased from <span className="text-slate-400">{coaching.previousScore}</span> to{' '}
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">{coaching.currentScore}</span> (+{coaching.improvement} pts)
              </p>
            </div>
            <div className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-xs px-3 py-1.5 rounded-full border border-cyan-500/20 text-center">
              Target Peak: {coaching.targetScore} pts
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>Recommended Next Steps</span>
            </h4>

            <div className="space-y-2.5">
              {coaching.nextSteps?.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-start justify-between gap-4 hover:border-cyan-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">{step.action}</h5>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 pl-7">{step.reason}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 shrink-0">
                    +{step.estimatedGain} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Click 'Analyze Next Score Boost' to receive tailored step-by-step coaching recommendations tailored to your targeted job postings.
        </p>
      )}
    </div>
  )
}
