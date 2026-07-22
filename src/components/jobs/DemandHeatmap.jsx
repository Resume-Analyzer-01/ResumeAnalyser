import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { TrendingUp, Award, DollarSign } from 'lucide-react'

export const DemandHeatmap = ({ heatmapData }) => {
  if (!heatmapData || !heatmapData.skillFrequency?.length) {
    return (
      <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl text-center text-slate-500 dark:text-slate-400">
        Upload 1 or more job descriptions to generate a live Skill Demand Heatmap.
      </div>
    )
  }

  const chartData = heatmapData.skillFrequency.slice(0, 10)

  const COLORS = ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef']

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-6 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <TrendingUp className="w-5 h-5 text-cyan-500" />
            <span>Top Skills Demand Heatmap</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Aggregated skill frequency & estimated salary boost across {heatmapData.totalJobs} target roles.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-500/20 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>{heatmapData.totalUniqueSkills} Unique Skills</span>
          </div>
          <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Avg Salary: ₹{heatmapData.salaryStats?.average || 18}LPA</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <XAxis type="number" stroke="#94a3b8" fontSize={11} />
            <YAxis dataKey="skill" type="category" stroke="#94a3b8" fontSize={12} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="frequency" radius={[0, 8, 8, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Salary Boost Breakdown Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
        {chartData.slice(0, 5).map((s) => (
          <div
            key={s.skill}
            className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3 text-center space-y-1"
          >
            <p className="text-xs font-bold text-slate-900 dark:text-white">{s.skill}</p>
            <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold font-mono">
              +{Math.round((s.salaryCorrelation || 0.18) * 100)}% Salary Boost
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
