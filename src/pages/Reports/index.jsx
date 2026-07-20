import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Download, Eye, Filter, Trash2, Gauge } from 'lucide-react'
import api from '../../lib/axios'
import { PageTransition } from '../../components/common/PageTransition'
import { SearchBar } from '../../components/common/SearchBar'
import { DashboardShell } from '../../layouts/DashboardShell'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { Pagination } from '../../components/ui/Pagination'
import { LoadingState } from '../../components/shared/LoadingState'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'

const ReportsPage = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [data, setData] = useState({ resumes: [], pagination: { totalPages: 1 } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const fetchReports = async () => {
    setLoading(true)
    try {
      const response = await api.get('/resume/history', {
        params: {
          page,
          limit: 5,
          sort: sortField,
          order: sortOrder,
          search: query,
          status: 'analyzed'
        }
      })
      if (response.data.success) {
        setData(response.data.data)
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load reports.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    const timeoutId = setTimeout(() => {
      fetchReports()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [user, navigate, page, sortField, sortOrder, query])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return
    
    try {
      const res = await api.delete(`/resume/${id}`)
      if (res.data.success) {
        addToast('Deleted', 'Report successfully deleted.', 'success')
        fetchReports()
      } else {
        addToast('Error', res.data.message || 'Failed to delete report.', 'danger')
      }
    } catch (err) {
      addToast('Error', err.response?.data?.message || 'Network error.', 'danger')
    }
  }

  return (
    <PageTransition>
      <DashboardShell
        title="Analysis Reports"
        description="View and manage your completed resume analysis reports."
        actions={
          <Button variant="secondary" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
        }
      >
        <GlassCard className="p-5">
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">
            <SearchBar
              value={query}
              onChange={(event) => {
                setPage(1)
                setQuery(event.target.value)
              }}
              placeholder="Search reports by resume name"
            />

            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => {
                setPage(1)
                setSortField('createdAt')
                setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
              }}>
                Sort by date {sortField === 'createdAt' && (sortOrder === 'desc' ? '↓' : '↑')}
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : loading && data.resumes.length === 0 ? (
               <div className="p-8"><LoadingState title="Loading reports" description="Fetching your analysis reports..." /></div>
            ) : data.resumes.length === 0 ? (
               <div className="p-8 text-center text-slate-500">No reports found. Upload and analyze a resume first.</div>
            ) : (
              <table className="w-full min-w-[48rem] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Report For</th>
                    <th className="px-4 py-3">Analysis Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-white/10">
                  {data.resumes.map((resume) => (
                    <tr key={resume._id} className="transition hover:bg-slate-50/80 dark:hover:bg-white/5">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <Gauge size={18} />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-950 dark:text-white">{resume.originalFileName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Analyzed successfully</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                        {new Date(resume.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Link to={`/analysis/${resume._id}`}>
                            <button
                              type="button"
                              aria-label="View Analysis"
                              className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-primary hover:text-white hover:border-primary dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-primary dark:hover:text-white"
                            >
                              <Eye size={14} />
                              View Report
                            </button>
                          </Link>
                          {resume.storageUrl && (
                            <a href={resume.storageUrl} target="_blank" rel="noopener noreferrer">
                              <button
                                type="button"
                                aria-label="Download Resume"
                                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-primary dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                              >
                                <Download size={15} />
                              </button>
                            </a>
                          )}
                          <button
                            type="button"
                            aria-label="Delete Report"
                            onClick={() => handleDelete(resume._id)}
                            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-rose-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-rose-400"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!error && data.pagination.totalPages > 1 && (
            <div className="mt-5 flex justify-center">
              <Pagination
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}

        </GlassCard>
      </DashboardShell>
    </PageTransition>
  )
}

export default ReportsPage
