import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Bell, Download, UploadCloud, Gauge, FileCheck2, Target, BarChart3, CheckCircle2, ScanSearch, ShieldCheck } from 'lucide-react'
import api from '../../lib/axios'
import { CircularProgress } from '../../components/common/CircularProgress'
import { PageTransition } from '../../components/common/PageTransition'
import { ProgressBar } from '../../components/common/ProgressBar'
import { StatCard } from '../../components/common/StatCard'
import { DashboardShell } from '../../layouts/DashboardShell'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { LoadingState } from '../../components/shared/LoadingState'
import { useAuth } from '../../contexts/AuthContext'

const DashboardPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard/stats')
        if (response.data.success) {
          setData(response.data.data)
        } else {
          setError(response.data.message)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [user, navigate])

  if (loading) return <LoadingState title="Loading dashboard" description="Fetching your latest stats and reports." />
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  const dashboardStats = [
    { label: 'Average ATS Score', value: `${data?.statistics?.averageAtsScore || 0}%`, change: 'Based on recent uploads', icon: Gauge, tone: 'from-indigo-500 to-sky-500' },
    { label: 'Resumes Analyzed', value: `${data?.statistics?.totalResumes || 0}`, change: `${data?.statistics?.parsedSuccess || 0} parsed successfully`, icon: FileCheck2, tone: 'from-fuchsia-500 to-violet-500' },
    { label: 'Credits Remaining', value: `${data?.statistics?.creditsRemaining || 0}`, change: 'Available in your plan', icon: Target, tone: 'from-cyan-500 to-emerald-500' },
    { label: 'Open Reports', value: `${data?.recentAnalyses?.length || 0}`, change: 'Ready for review', icon: BarChart3, tone: 'from-amber-500 to-rose-500' }
  ]

  const getNotificationIcon = (title) => {
    if (title.toLowerCase().includes('security')) return ShieldCheck
    if (title.toLowerCase().includes('gap')) return ScanSearch
    return CheckCircle2
  }

  return (
    <PageTransition>
      <DashboardShell
        title="Dashboard"
        description="Track resume quality, activity, reports, and next actions from one responsive workspace."
        actions={
          <>
            <Link to="/upload">
              <Button className="gap-2">
                <UploadCloud size={16} />
                Upload Resume
              </Button>
            </Link>
            <Button variant="secondary" className="gap-2">
              <Download size={16} />
              Export
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="grid place-items-center p-8">
            <CircularProgress value={data?.statistics?.averageAtsScore || 0} label="Average" />
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              Average score across recent resume analyses.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Resume activity</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Analysis progress signals based on recent uploads.</p>
              </div>
              <Badge variant="accent">Live</Badge>
            </div>
            <div className="mt-6 space-y-4">
              {data?.activity?.map((item) => (
                <ProgressBar key={item.label} label={item.label} value={item.value} color="bg-primary" />
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Recent Reports</h2>
              <Link to="/analysis" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View all
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {data?.recentAnalyses?.length === 0 ? (
                <p className="text-sm text-slate-500 py-4 text-center">No resumes analyzed yet.</p>
              ) : (
                data?.recentAnalyses?.map((resume) => (
                  <motion.div
                    key={resume.id}
                    whileHover={{ x: 4 }}
                    className="flex flex-col gap-3 rounded-[18px] border border-slate-200/70 bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/5 cursor-pointer"
                    onClick={() => navigate(`/analysis/${resume.id}`)}
                  >
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{resume.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{resume.role} · {resume.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={resume.score > 84 ? 'success' : 'warning'}>{resume.score}%</Badge>
                      <Badge variant="secondary">{resume.status}</Badge>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-[16px] bg-cyan-500 text-white">
                <Bell size={19} />
              </div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Notifications</h2>
            </div>
            <div className="mt-5 space-y-3">
              {data?.notifications?.length === 0 ? (
                 <p className="text-sm text-slate-500 py-4 text-center">No notifications.</p>
              ) : (
                data?.notifications?.map((notification) => {
                  const Icon = getNotificationIcon(notification.title)
                  return (
                    <div key={notification.id} className="rounded-[18px] bg-slate-50/80 p-4 dark:bg-white/5">
                      <div className="flex items-start gap-3">
                        <Icon size={18} className="mt-0.5 text-primary" />
                        <div>
                          <p className="font-semibold text-slate-950 dark:text-white">{notification.title}</p>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{notification.body}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </GlassCard>
        </div>
      </DashboardShell>
    </PageTransition>
  )
}

export default DashboardPage
