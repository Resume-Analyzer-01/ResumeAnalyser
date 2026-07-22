import React from 'react'
import { Layers } from 'lucide-react'

export const JobComparison = ({ jobs = [] }) => {
  if (jobs.length < 2) return null

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-4 text-slate-900 dark:text-slate-100 overflow-x-auto">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
        <Layers className="w-5 h-5 text-cyan-500" />
        <span>Side-by-Side Job Comparison Matrix</span>
      </div>

      <table className="w-full text-xs text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/10">
            <th className="py-2.5 px-3 font-bold text-slate-500 dark:text-slate-400">Metric</th>
            {jobs.map((job) => (
              <th key={job.jobId} className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                {job.jobTitle}
                <span className="block text-[11px] font-normal text-slate-500">{job.company}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-white/10">
          <tr>
            <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-300">Salary Range</td>
            {jobs.map((job) => (
              <td key={job.jobId} className="py-3 px-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                ₹{job.salaryRange?.min || 10}L - ₹{job.salaryRange?.max || 22}L
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-300">Required Experience</td>
            {jobs.map((job) => (
              <td key={job.jobId} className="py-3 px-3 text-slate-800 dark:text-slate-200">
                {job.yearsRequired || 3} Years ({job.experienceLevel || 'Mid'})
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-300">Required Skills Count</td>
            {jobs.map((job) => (
              <td key={job.jobId} className="py-3 px-3 text-slate-800 dark:text-slate-200">
                {job.requiredSkills?.length || 5} Skills
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-3 px-3 font-semibold text-slate-600 dark:text-slate-300">Top Required Tech</td>
            {jobs.map((job) => (
              <td key={job.jobId} className="py-3 px-3 text-slate-800 dark:text-slate-200">
                {job.requiredSkills?.slice(0, 3).map((s) => s.skill).join(', ')}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
