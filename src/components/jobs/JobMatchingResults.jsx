import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Sparkles, Loader2 } from 'lucide-react'

export const JobMatchingResults = ({ jobs = [], resumeSkills = [] }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [matchResults, setMatchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!jobs.length) return

    const scoreAllJobs = async () => {
      setIsLoading(true)
      try {
        const results = await Promise.all(
          jobs.map(async (job) => {
            const res = await fetch(`http://localhost:5000/api/jobs/${job.jobId}/match-resume`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ resumeSkills })
            })
            const data = await res.json()
            return data.success ? data : null
          })
        )
        setMatchResults(results.filter(Boolean))
      } catch (err) {
        console.error('Job Matching Error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    scoreAllJobs()
  }, [jobs, resumeSkills])

  if (!jobs.length) return null

  if (isLoading) {
    return (
      <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-xl flex items-center justify-center gap-3 text-cyan-500 font-semibold text-sm">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Scoring Resume Against All Job Descriptions...</span>
      </div>
    )
  }

  const result = matchResults[activeTab] || matchResults[0]

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-6 text-slate-900 dark:text-slate-100">
      {/* Job Selection Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-white/10 no-scrollbar">
        {jobs.map((job, idx) => {
          const res = matchResults[idx]
          const isSelected = activeTab === idx
          return (
            <button
              key={job.jobId}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <span>{job.jobTitle}</span>
              {res && (
                <span className="font-mono bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
                  {res.matchScore}%
                </span>
              )}
            </button>
          )
        })}
      </div>

      {result && (
        <div className="space-y-6">
          {/* Match Score Progress Gauge Bar */}
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Match Score for {result.jobTitle}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{result.company}</p>
              </div>
              <span className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
                {result.matchScore} / 100
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-950/60 rounded-full h-3 overflow-hidden p-0.5">
              <div
                style={{ width: `${result.matchScore}%` }}
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Matched Skills */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Skills You Have ({result.matchedSkills?.length || 0})</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.matchedSkills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-red-500" />
                <span>Skills You're Missing ({result.missingSkills?.length || 0})</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    ✗ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Proficiency Gaps */}
          {result.proficiencyGaps?.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Proficiency & Experience Gaps</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.proficiencyGaps.slice(0, 4).map((gap) => (
                  <div
                    key={gap.skill}
                    className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>{gap.skill}</span>
                      <span className="text-amber-500 text-[11px]">Req: {gap.required}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{gap.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Feedback & Action Items */}
          <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10 border border-cyan-500/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>Personalized AI Match Feedback</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{result.feedback}</p>

            <div className="space-y-2 pt-2 border-t border-cyan-500/20">
              <h5 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Recommended Actions to Reach 90+ Score</span>
              </h5>
              <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {result.improvementActions?.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">{idx + 1}.</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
