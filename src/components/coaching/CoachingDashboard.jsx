import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import { Award, Flame, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react'

export const CoachingDashboard = ({ profile }) => {
  if (!profile) return null

  const history = profile.scoreHistory || []
  const achievements = profile.achievements || []
  const streaks = profile.streaks || { currentStreak: 3, longestStreak: 5 }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Current Score */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Current ATS Score</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
              {profile.currentScore || 78}
            </h3>
            <span className="text-xs font-semibold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full flex items-center">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{(profile.currentScore || 78) - (history[0]?.score || 62)} pts</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">Across {profile.totalVersions || 3} revisions</p>
        </div>

        {/* Card 2: Highest Score */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">All-Time Peak</span>
          <h3 className="text-3xl font-bold font-mono text-amber-500">
            {profile.highestScore || 88} / 100
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">Targeting Top 10% ATS tier</p>
        </div>

        {/* Card 3: Streak Counter */}
        <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-red-500/10 border border-orange-500/20 backdrop-blur-xl rounded-3xl p-5 shadow-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-orange-600 dark:text-orange-400 font-bold">Active Streak</span>
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
          </div>
          <h3 className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
            {streaks.currentStreak} Days
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">Longest: {streaks.longestStreak} days streak</p>
        </div>

        {/* Card 4: Unlocked Badges */}
        <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Achievements</span>
            <Award className="w-5 h-5 text-cyan-500" />
          </div>
          <h3 className="text-3xl font-bold font-mono text-indigo-500">
            {achievements.length} Unlocked
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">Keep improving to unlock more</p>
        </div>
      </div>

      {/* Recharts Score Progression Line Chart */}
      <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <h3 className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <TrendingUp className="w-5 h-5 text-cyan-500" />
            <span>Score Progression Over Revisions</span>
          </h3>
          <span className="text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 font-semibold">
            {history.length} Saved Versions
          </span>
        </div>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="version" stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `v${v}`} />
              <YAxis domain={[40, 100]} stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          <Award className="w-5 h-5 text-cyan-500" />
          <span>Unlocked Career Badges</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xl shadow-md shrink-0">
                🏆
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ach.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
