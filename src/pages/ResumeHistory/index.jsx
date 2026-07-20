import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Download, Eye, Filter, Trash2 } from 'lucide-react'
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

const ResumeHistoryPage = () => {
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

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const response = await api.get('/resume/history', {
        params: {
          page,
          limit: 5,
          sort: sortField,
          order: sortOrder,
          search: query
        }
      })
      if (response.data.success) {
        setData(response.data.data)
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    // Debounce search slightly
    const timeoutId = setTimeout(() => {
      fetchHistory()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [user, navigate, page, sortField, sortOrder, query])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume and its analysis?')) return
    
    try {
      const res = await api.delete(`/resume/${id}`)
      if (res.data.success) {
        addToast('Deleted', 'Resume successfully deleted.', 'success')
        fetchHistory()
      } else {
        addToast('Error', res.data.message || 'Failed to delete resume.', 'danger')
      }
    } catch (err) {
      addToast('Error', err.response?.data?.message || 'Network error.', 'danger')
    }
  }

  const handleSortScore = () => {
    setPage(1)
    if (sortField === 'score') {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField('score')
      setSortOrder('desc')
    }
  }

  const handleSortDate = () => {
    setPage(1)
    if (sortField === 'createdAt') {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField('createdAt')
      setSortOrder('desc')
    }
  }

  return (
    <PageTransition>
      <DashboardShell
        title="Resume History"
        description="Search, filter, sort, and act on previous analyses from a responsive table."
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
              placeholder="Search resumes"
            />

            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleSortScore}>
                Sort by score {sortField === 'score' && (sortOrder === 'desc' ? '↓' : '↑')}
              </Button>
              <Button variant="secondary" onClick={handleSortDate}>
                Sort by date {sortField === 'createdAt' && (sortOrder === 'desc' ? '↓' : '↑')}
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : loading && data.resumes.length === 0 ? (
               <div className="p-8"><LoadingState title="Loading history" description="Fetching resumes..." /></div>
            ) : data.resumes.length === 0 ? (
               <div className="p-8 text-center text-slate-500">No resumes found.</div>
            ) : (
              <table className="w-full min-w-[48rem] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Resume Name</th>
                    <th className="px-4 py-3">Upload Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-white/10">
                  {data.resumes.map((resume) => (
                    <tr key={resume._id} className="transition hover:bg-slate-50/80 dark:hover:bg-white/5">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-950 dark:text-white">{resume.originalFileName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{(resume.fileSize / 1024).toFixed(1)} KB</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                        {new Date(resume.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={resume.status === 'analyzed' ? 'success' : 'warning'}>{resume.status}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Link to={`/analysis/${resume._id}`}>
                            <button
                              type="button"
                              aria-label="View Analysis"
                              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-primary dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                            >
                              <Eye size={15} />
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
                            aria-label="Delete Resume"
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

export default ResumeHistoryPage
