import { useState, useEffect } from 'react'
import { BookOpenCheck, Download, Eye } from 'lucide-react'
import api from '../../lib/axios'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { Modal } from '../../components/ui/Modal'
import { LoadingState } from '../../components/shared/LoadingState'

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [previewContent, setPreviewContent] = useState('')
  const [previewLoading, setPreviewLoading] = useState(false)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/templates')
        if (response.data.success) {
          setTemplates(response.data.data)
        } else {
          setError('Failed to fetch templates.')
        }
      } catch (err) {
        setError('Network error loading templates.')
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  const handlePreview = async (template) => {
    setPreviewTemplate(template)
    setPreviewLoading(true)
    try {
      const res = await fetch(template.downloadUrl)
      const text = await res.text()
      setPreviewContent(text)
    } catch (err) {
      setPreviewContent('Failed to load preview.')
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleDownload = (template) => {
    window.open(template.downloadUrl, '_blank')
  }

  return (
    <PageTransition className="space-y-10">
      <SectionHeader
        eyebrow="Templates"
        title="ATS-safe resume templates"
        description="Download ready-to-use Markdown templates designed for modern recruitment."
        align="center"
      />
      
      {loading ? (
        <LoadingState title="Loading Library" description="Fetching latest templates..." />
      ) : error ? (
        <div className="text-center text-rose-500 py-10">{error}</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {templates.map((template) => (
            <GlassCard key={template.id} className="p-5 flex flex-col">
              <div className="rounded-[22px] bg-slate-950 p-5 text-white">
                <BookOpenCheck size={24} className="text-cyan-300" />
                <div className="mt-8 space-y-2">
                  <div className="h-2 rounded-full bg-white/80" />
                  <div className="h-2 w-4/5 rounded-full bg-white/50" />
                  <div className="h-2 w-3/5 rounded-full bg-white/30" />
                </div>
              </div>
              <div className="mt-5 flex-1">
                <Badge variant="accent">{template.category}</Badge>
                <h2 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">{template.title}</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{template.sections}</p>
                <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">{template.score}</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button variant="secondary" className="gap-2 px-3" onClick={() => handlePreview(template)}>
                  <Eye size={15} />
                  Preview
                </Button>
                <Button className="gap-2 px-3" onClick={() => handleDownload(template)}>
                  <Download size={15} />
                  Use
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <Modal 
        isOpen={!!previewTemplate} 
        onClose={() => setPreviewTemplate(null)} 
        title={previewTemplate?.title || 'Template Preview'}
        footer={
          <Button onClick={() => previewTemplate && handleDownload(previewTemplate)} className="gap-2">
            <Download size={15} /> Download .md
          </Button>
        }
      >
        <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 max-h-[50vh] overflow-y-auto text-sm text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap border border-slate-200 dark:border-slate-800">
          {previewLoading ? 'Loading preview...' : previewContent}
        </div>
      </Modal>
    </PageTransition>
  )
}

export default TemplatesPage
