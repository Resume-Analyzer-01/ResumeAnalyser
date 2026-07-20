import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Download, Share2, Sparkles, CheckCircle, AlertTriangle, XCircle, Search, BarChart3 } from 'lucide-react'
import api from '../../lib/axios'
import { CircularProgress } from '../../components/common/CircularProgress'
import { PageTransition } from '../../components/common/PageTransition'
import { ProgressBar } from '../../components/common/ProgressBar'
import { DashboardShell } from '../../layouts/DashboardShell'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { LoadingState } from '../../components/shared/LoadingState'
import { Tabs, TabPanel } from '../../components/ui/Tabs'
import { useToast } from '../../contexts/ToastContext'

const ResumeAnalysisPage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToast } = useToast()

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await api.get(`/resume/${id}`)
        if (response.data.success) {
          setData(response.data.data)
        } else {
          setError(response.data.message)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analysis.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAnalysis()
    }
  }, [id])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    addToast('Link copied', 'Analysis link copied to clipboard.', 'info')
  }

  const handleDownload = () => {
    if (data?.resume?.storageUrl) {
      window.open(data.resume.storageUrl, '_blank')
    } else {
      addToast('Download failed', 'Resume file not found.', 'danger')
    }
  }

  if (loading) return <LoadingState title="Loading report" description="Fetching your resume analysis." />
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>
  if (!data || !data.analysis) return <div className="p-8 text-center text-slate-500">Analysis not found.</div>

  const { analysis, resume } = data

  const scoreBreakdown = [
    { label: 'Grammar', value: analysis.grammarScore, color: 'bg-indigo-500' },
    { label: 'Keywords', value: analysis.keywordScore, color: 'bg-sky-500' },
    { label: 'Formatting', value: analysis.formattingScore, color: 'bg-fuchsia-500' },
    { label: 'Readability', value: analysis.readabilityScore, color: 'bg-emerald-500' }
  ]

  const tabItems = [
    { label: 'Overview', value: 'overview' },
    { label: 'Skills Analysis', value: 'skills' },
    { label: 'Feedback', value: 'feedback' },
    { label: 'Action Plan', value: 'action-plan' }
  ]

  return (
    <PageTransition>
      <DashboardShell
        title={`Analysis Report`}
        description={resume.originalFileName}
        actions={
          <>
            <Button variant="secondary" onClick={handleShare} className="gap-2">
              <Share2 size={16} />
              Share
            </Button>
            <Button onClick={handleDownload} className="gap-2">
              <Download size={16} />
              Download Resume
            </Button>
          </>
        }
      >
        {/* Glowing Banner Section */}
        <GlassCard className="mb-8 overflow-hidden p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-fuchsia-500/10 via-cyan-500/10 to-emerald-500/10 opacity-50 pointer-events-none"></div>
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between z-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-500">Strategic Review</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Analysis Results</h2>
              <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
                {analysis.summary || "A comprehensive review of your resume, highlighting areas of excellence and opportunities for optimization."}
              </p>
            </div>
            <div className="flex-shrink-0 rounded-[24px] border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 px-8 py-6 text-center shadow-lg shadow-fuchsia-500/10 backdrop-blur-md">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">ATS Score</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">{analysis.atsScore}</span>
                <span className="text-lg font-medium text-slate-500 dark:text-slate-400">/100</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <Tabs items={tabItems}>
          <TabPanel value="overview">
            <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr] mt-6">
              <GlassCard className="grid place-items-center p-8 border-t-4 border-t-sky-500">
                <CircularProgress value={analysis.atsScore} label="Readiness" />
                <Badge variant={analysis.atsScore > 80 ? 'success' : 'warning'} className="mt-6 px-4 py-1.5 text-sm">
                  {analysis.atsScore > 80 ? 'Excellent readiness' : 'Needs improvement'}
                </Badge>
              </GlassCard>
              <GlassCard className="p-8 border-t-4 border-t-indigo-500">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-8">
                  <div className="rounded-2xl bg-indigo-500/15 p-2 text-indigo-500"><BarChart3 size={20} /></div>
                  <h3 className="text-xl font-bold">Performance Breakdown</h3>
                </div>
                <div className="space-y-6">
                  {scoreBreakdown.map((metric) => (
                    <ProgressBar key={metric.label} {...metric} />
                  ))}
                </div>
              </GlassCard>
            </div>
          </TabPanel>

          <TabPanel value="skills">
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <GlassCard className="p-8 border-t-4 border-t-emerald-500">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-6">
                  <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-500"><Search size={20} /></div>
                  <h3 className="text-xl font-bold">Matched Skills</h3>
                  <Badge variant="success" className="ml-auto">{analysis.matchedSkills?.length || 0}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedSkills?.length > 0 ? analysis.matchedSkills.map((skill, idx) => (
                    <span key={idx} className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {skill}
                    </span>
                  )) : (
                    <p className="text-slate-500 italic text-sm">No matched skills found.</p>
                  )}
                </div>
              </GlassCard>
              
              <GlassCard className="p-8 border-t-4 border-t-rose-500">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-6">
                  <div className="rounded-2xl bg-rose-500/15 p-2 text-rose-500"><XCircle size={20} /></div>
                  <h3 className="text-xl font-bold">Missing Skills</h3>
                  <Badge variant="danger" className="ml-auto">{analysis.missingSkills?.length || 0}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills?.length > 0 ? analysis.missingSkills.map((skill, idx) => (
                    <span key={idx} className="rounded-full bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {skill}
                    </span>
                  )) : (
                    <p className="text-slate-500 italic text-sm">No missing skills detected.</p>
                  )}
                </div>
              </GlassCard>
            </div>
          </TabPanel>

          <TabPanel value="feedback">
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <GlassCard className="p-8 border-t-4 border-t-emerald-400">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-6">
                  <div className="rounded-2xl bg-emerald-400/15 p-2 text-emerald-500"><CheckCircle size={20} /></div>
                  <h3 className="text-xl font-bold">Strengths</h3>
                </div>
                <ul className="space-y-4">
                  {analysis.strengths?.length > 0 ? analysis.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 rounded-[16px] border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" /> 
                      <span>{item}</span>
                    </li>
                  )) : (
                    <p className="text-slate-500 italic text-sm">No specific strengths highlighted.</p>
                  )}
                </ul>
              </GlassCard>

              <GlassCard className="p-8 border-t-4 border-t-amber-500">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-6">
                  <div className="rounded-2xl bg-amber-500/15 p-2 text-amber-500"><AlertTriangle size={20} /></div>
                  <h3 className="text-xl font-bold">Weaknesses</h3>
                </div>
                <ul className="space-y-4">
                  {analysis.weaknesses?.length > 0 ? analysis.weaknesses.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 rounded-[16px] border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                      <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" /> 
                      <span>{item}</span>
                    </li>
                  )) : (
                    <p className="text-slate-500 italic text-sm">No specific weaknesses identified.</p>
                  )}
                </ul>
              </GlassCard>
            </div>
          </TabPanel>

          <TabPanel value="action-plan">
            <GlassCard className="mt-6 p-8 border-t-4 border-t-fuchsia-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white mb-6">
                  <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-2 text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Recommendations</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Prioritized steps to improve your resume's performance.</p>
                  </div>
                </div>
                
                {analysis.recommendations?.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {analysis.recommendations.map((recommendation, idx) => (
                      <div key={idx} className="group rounded-[20px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-5 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 transition-all duration-300 shadow-sm">
                        <div className="text-fuchsia-500 font-bold mb-2">Step {idx + 1}</div>
                        <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          {recommendation}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic mt-8 text-sm">No actionable recommendations at this time.</p>
                )}
              </div>
            </GlassCard>
          </TabPanel>
        </Tabs>
      </DashboardShell>
    </PageTransition>
  )
}

export default ResumeAnalysisPage
