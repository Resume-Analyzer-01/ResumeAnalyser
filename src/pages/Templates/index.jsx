import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  FileText,
  LayoutTemplate,
  Palette,
  Pencil,
  Printer,
  RotateCcw,
  Search,
  Sparkles,
  Star
} from 'lucide-react'
import api from '../../lib/axios'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { Modal } from '../../components/ui/Modal'
import { LoadingState } from '../../components/shared/LoadingState'

const allTemplatesCategory = 'All'

const templateVisuals = {
  fallback: {
    frame: 'bg-white',
    header: 'bg-slate-950',
    accent: 'bg-cyan-400',
    soft: 'bg-slate-100',
    line: 'bg-slate-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'executive-minimal': {
    frame: 'bg-slate-50',
    header: 'bg-slate-950',
    accent: 'bg-cyan-300',
    soft: 'bg-slate-100',
    line: 'bg-slate-200',
    text: 'bg-slate-900',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'technical-product': {
    frame: 'bg-[#eef7ff]',
    header: 'bg-[#0f2d4a]',
    accent: 'bg-sky-400',
    soft: 'bg-sky-100',
    line: 'bg-sky-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'early-career': {
    frame: 'bg-[#fff8ed]',
    header: 'bg-[#334155]',
    accent: 'bg-amber-400',
    soft: 'bg-orange-100',
    line: 'bg-amber-200',
    text: 'bg-slate-700',
    inverse: 'bg-white/90',
    muted: 'bg-white/50'
  },
  'data-storyteller': {
    frame: 'bg-[#eefcf6]',
    header: 'bg-[#14532d]',
    accent: 'bg-emerald-400',
    soft: 'bg-emerald-100',
    line: 'bg-emerald-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'modern-sidebar': {
    frame: 'bg-[#f5f3ff]',
    header: 'bg-[#312e81]',
    accent: 'bg-violet-400',
    soft: 'bg-violet-100',
    line: 'bg-violet-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'creative-portfolio': {
    frame: 'bg-[#fff1f5]',
    header: 'bg-[#9f1239]',
    accent: 'bg-rose-300',
    soft: 'bg-rose-100',
    line: 'bg-rose-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'corporate-classic': {
    frame: 'bg-[#f6f7f9]',
    header: 'bg-[#1f2937]',
    accent: 'bg-slate-400',
    soft: 'bg-slate-100',
    line: 'bg-slate-300',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'sales-growth': {
    frame: 'bg-[#fff7ed]',
    header: 'bg-[#7c2d12]',
    accent: 'bg-orange-400',
    soft: 'bg-orange-100',
    line: 'bg-orange-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'healthcare-professional': {
    frame: 'bg-[#eefdfc]',
    header: 'bg-[#115e59]',
    accent: 'bg-teal-300',
    soft: 'bg-teal-100',
    line: 'bg-teal-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'academic-cv': {
    frame: 'bg-[#f7f5ef]',
    header: 'bg-[#3f3f46]',
    accent: 'bg-stone-300',
    soft: 'bg-stone-100',
    line: 'bg-stone-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'marketing-brand': {
    frame: 'bg-[#fff6f2]',
    header: 'bg-[#7f1d1d]',
    accent: 'bg-red-300',
    soft: 'bg-red-100',
    line: 'bg-red-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'ux-designer': {
    frame: 'bg-[#f0f9ff]',
    header: 'bg-[#164e63]',
    accent: 'bg-cyan-300',
    soft: 'bg-cyan-100',
    line: 'bg-cyan-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'project-manager': {
    frame: 'bg-[#f8fafc]',
    header: 'bg-[#334155]',
    accent: 'bg-lime-300',
    soft: 'bg-lime-100',
    line: 'bg-lime-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'teacher-educator': {
    frame: 'bg-[#fffaf0]',
    header: 'bg-[#92400e]',
    accent: 'bg-yellow-300',
    soft: 'bg-yellow-100',
    line: 'bg-yellow-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  },
  'customer-success': {
    frame: 'bg-[#f0fdf4]',
    header: 'bg-[#166534]',
    accent: 'bg-green-300',
    soft: 'bg-green-100',
    line: 'bg-green-200',
    text: 'bg-slate-800',
    inverse: 'bg-white/85',
    muted: 'bg-white/45'
  }
}

const badgeVariantByCategory = {
  Leadership: 'accent',
  Product: 'primary',
  Starter: 'warning',
  Analytics: 'success',
  General: 'secondary',
  Creative: 'danger',
  Corporate: 'primary',
  Sales: 'warning',
  Healthcare: 'success',
  Academic: 'secondary',
  Marketing: 'danger',
  Design: 'accent',
  Operations: 'success',
  Education: 'warning',
  'Customer Success': 'success'
}

const previewLineWidths = ['w-full', 'w-11/12', 'w-4/5']

const getTemplateVisual = (template) => {
  return templateVisuals[template.visual] || templateVisuals.fallback
}

const PreviewLines = ({ visual, count = 3, light = false }) => (
  <div className="space-y-2">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className={`h-1.5 rounded-full ${previewLineWidths[index % previewLineWidths.length]} ${
          light ? visual.muted : visual.line
        }`}
      />
    ))}
  </div>
)

const SidebarPreview = ({ visual }) => (
  <div className="flex h-full gap-3 p-4">
    <div className={`w-[35%] rounded-[14px] ${visual.header} p-3`}>
      <div className={`h-9 w-9 rounded-full ${visual.accent}`} />
      <div className="mt-5 space-y-4">
        <PreviewLines visual={visual} count={4} light />
        <PreviewLines visual={visual} count={3} light />
      </div>
    </div>
    <div className="flex-1 py-1">
      <div className={`h-3 w-3/4 rounded-full ${visual.text}`} />
      <div className={`mt-2 h-2 w-1/2 rounded-full ${visual.line}`} />
      <div className="mt-6 space-y-4">
        <PreviewLines visual={visual} count={3} />
        <PreviewLines visual={visual} count={4} />
        <PreviewLines visual={visual} count={3} />
      </div>
    </div>
  </div>
)

const SplitPreview = ({ visual }) => (
  <div className="h-full p-4">
    <div className={`rounded-[14px] ${visual.header} p-4`}>
      <div className={`h-3 w-2/3 rounded-full ${visual.inverse}`} />
      <div className={`mt-3 h-1.5 w-1/2 rounded-full ${visual.muted}`} />
    </div>
    <div className="mt-5 grid grid-cols-[1fr_0.8fr] gap-4">
      <div className="space-y-4">
        <PreviewLines visual={visual} count={4} />
        <PreviewLines visual={visual} count={3} />
      </div>
      <div className={`rounded-[14px] ${visual.soft} p-3`}>
        <PreviewLines visual={visual} count={5} />
      </div>
    </div>
  </div>
)

const GridPreview = ({ visual }) => (
  <div className="h-full p-4">
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className={`h-3 w-24 rounded-full ${visual.text}`} />
        <div className={`mt-2 h-1.5 w-16 rounded-full ${visual.line}`} />
      </div>
      <div className={`h-10 w-10 rounded-[12px] ${visual.accent}`} />
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={`rounded-[12px] ${index === 0 ? visual.header : visual.soft} p-3`}>
          <PreviewLines visual={visual} count={index === 0 ? 3 : 4} light={index === 0} />
        </div>
      ))}
    </div>
  </div>
)

const TimelinePreview = ({ visual }) => (
  <div className="h-full p-4">
    <div className={`h-3 w-2/3 rounded-full ${visual.text}`} />
    <div className={`mt-2 h-1.5 w-1/2 rounded-full ${visual.line}`} />
    <div className="mt-6 space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="grid grid-cols-[16px_1fr] gap-3">
          <div className="flex flex-col items-center">
            <div className={`h-3 w-3 rounded-full ${visual.accent}`} />
            <div className={`mt-1 h-full w-px ${visual.line}`} />
          </div>
          <PreviewLines visual={visual} count={3} />
        </div>
      ))}
    </div>
  </div>
)

const MagazinePreview = ({ visual }) => (
  <div className="h-full p-4">
    <div className={`rounded-[16px] ${visual.header} p-4`}>
      <div className={`h-10 w-10 rounded-full ${visual.accent}`} />
      <div className={`mt-5 h-3 w-4/5 rounded-full ${visual.inverse}`} />
      <div className={`mt-2 h-1.5 w-1/2 rounded-full ${visual.muted}`} />
    </div>
    <div className="mt-4 grid grid-cols-[0.8fr_1fr] gap-3">
      <div className={`rounded-[14px] ${visual.soft} p-3`}>
        <PreviewLines visual={visual} count={5} />
      </div>
      <div className="space-y-4">
        <PreviewLines visual={visual} count={3} />
        <PreviewLines visual={visual} count={3} />
      </div>
    </div>
  </div>
)

const CenteredPreview = ({ visual }) => (
  <div className="h-full p-4 text-center">
    <div className="mx-auto mt-2 max-w-[75%]">
      <div className={`mx-auto h-3 w-full rounded-full ${visual.text}`} />
      <div className={`mx-auto mt-2 h-1.5 w-2/3 rounded-full ${visual.line}`} />
    </div>
    <div className={`mx-auto mt-5 h-px w-3/4 ${visual.line}`} />
    <div className="mt-5 space-y-4 text-left">
      <PreviewLines visual={visual} count={3} />
      <PreviewLines visual={visual} count={4} />
      <PreviewLines visual={visual} count={3} />
    </div>
  </div>
)

const TemplateThumbnail = ({ template }) => {
  const visual = getTemplateVisual(template)
  const layout = template.layout || 'split'

  const previewByLayout = {
    sidebar: <SidebarPreview visual={visual} />,
    split: <SplitPreview visual={visual} />,
    grid: <GridPreview visual={visual} />,
    timeline: <TimelinePreview visual={visual} />,
    magazine: <MagazinePreview visual={visual} />,
    centered: <CenteredPreview visual={visual} />
  }

  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-[20px] border border-slate-200/70 ${visual.frame} shadow-inner dark:border-white/10`}>
      <div className="absolute inset-x-4 top-3 z-10 flex items-center justify-between">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
        </div>
        <span className="rounded-full bg-white/75 px-2 py-0.5 text-[9px] font-bold uppercase tracking-normal text-slate-600 shadow-sm">
          {template.tone || 'Resume'}
        </span>
      </div>
      <div className="absolute inset-0 pt-5">
        {previewByLayout[layout] || previewByLayout.split}
      </div>
    </div>
  )
}

const TemplateStats = ({ templates, categories }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    <div className="rounded-[18px] border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="text-2xl font-bold text-slate-950 dark:text-white">{templates.length}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Templates
      </div>
    </div>
    <div className="rounded-[18px] border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="text-2xl font-bold text-slate-950 dark:text-white">{Math.max(categories.length - 1, 0)}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Categories
      </div>
    </div>
    <div className="rounded-[18px] border border-white/20 bg-white/60 p-4 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="text-2xl font-bold text-slate-950 dark:text-white">2</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Export Formats
      </div>
    </div>
  </div>
)

const escapeHtml = (value) => {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return value.replace(/[&<>"']/g, (character) => entities[character])
}

const renderInlineMarkdown = (value) => {
  return escapeHtml(value).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

const renderMarkdownToHtml = (markdown) => {
  const htmlParts = []
  let isListOpen = false

  const closeList = () => {
    if (isListOpen) {
      htmlParts.push('</ul>')
      isListOpen = false
    }
  }

  markdown.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      closeList()
      htmlParts.push('<div class="resume-spacer"></div>')
      return
    }

    if (trimmedLine.startsWith('### ')) {
      closeList()
      htmlParts.push(`<h3>${renderInlineMarkdown(trimmedLine.slice(4))}</h3>`)
      return
    }

    if (trimmedLine.startsWith('## ')) {
      closeList()
      htmlParts.push(`<h2>${renderInlineMarkdown(trimmedLine.slice(3))}</h2>`)
      return
    }

    if (trimmedLine.startsWith('# ')) {
      closeList()
      htmlParts.push(`<h1>${renderInlineMarkdown(trimmedLine.slice(2))}</h1>`)
      return
    }

    if (trimmedLine.startsWith('- ')) {
      if (!isListOpen) {
        htmlParts.push('<ul>')
        isListOpen = true
      }
      htmlParts.push(`<li>${renderInlineMarkdown(trimmedLine.slice(2))}</li>`)
      return
    }

    closeList()
    htmlParts.push(`<p>${renderInlineMarkdown(trimmedLine)}</p>`)
  })

  closeList()
  return htmlParts.join('')
}

const getExportFileName = (template) => {
  return `${template.title || 'resume'}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'resume'
}

const createResumeDocumentHtml = (template, markdown) => {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(template.title || 'Resume')}</title>
  <style>
    @page { size: letter; margin: 0.55in; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #111827;
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      line-height: 1.45;
    }
    .resume-document {
      max-width: 8.5in;
      margin: 0 auto;
    }
    h1 {
      margin: 0 0 6pt;
      color: #0f172a;
      font-size: 24pt;
      line-height: 1.1;
      text-align: center;
      letter-spacing: 0;
    }
    h2 {
      margin: 16pt 0 7pt;
      padding-bottom: 4pt;
      border-bottom: 1px solid #d1d5db;
      color: #0f172a;
      font-size: 11pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    h3 {
      margin: 11pt 0 3pt;
      color: #111827;
      font-size: 11.5pt;
      line-height: 1.25;
    }
    p {
      margin: 0 0 6pt;
    }
    ul {
      margin: 0 0 7pt 17pt;
      padding: 0;
    }
    li {
      margin: 0 0 3pt;
    }
    strong {
      color: #0f172a;
    }
    .resume-spacer {
      height: 4pt;
    }
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <main class="resume-document">
    ${renderMarkdownToHtml(markdown)}
  </main>
</body>
</html>`
}

const downloadBlob = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = downloadUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(downloadUrl)
}

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(allTemplatesCategory)
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [originalContent, setOriginalContent] = useState('')
  const [editorContent, setEditorContent] = useState('')
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
      } catch {
        setError('Network error loading templates.')
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  const categories = useMemo(() => {
    return [allTemplatesCategory, ...new Set(templates.map((template) => template.category))]
  }, [templates])

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return templates.filter((template) => {
      const matchesCategory = activeCategory === allTemplatesCategory || template.category === activeCategory
      const searchableText = [
        template.title,
        template.category,
        template.score,
        template.sections,
        template.audience,
        template.tone,
        template.description,
        ...(template.tags || [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
    })
  }, [activeCategory, query, templates])

  const handlePreview = async (template) => {
    setPreviewTemplate(template)
    setPreviewLoading(true)
    setOriginalContent('')
    setEditorContent('')

    try {
      const res = await fetch(template.downloadUrl)
      if (!res.ok) {
        throw new Error('Template download failed.')
      }
      const text = await res.text()
      setOriginalContent(text)
      setEditorContent(text)
    } catch {
      setEditorContent('Failed to load template content.')
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleDownloadWord = () => {
    if (!previewTemplate || !editorContent.trim()) {
      return
    }

    const documentHtml = createResumeDocumentHtml(previewTemplate, editorContent)
    downloadBlob(
      documentHtml,
      `${getExportFileName(previewTemplate)}.doc`,
      'application/msword;charset=utf-8'
    )
  }

  const handleDownloadPdf = () => {
    if (!previewTemplate || !editorContent.trim()) {
      return
    }

    const printWindow = window.open('', '_blank')

    if (!printWindow) {
      window.alert('Allow pop-ups to export this resume as a PDF.')
      return
    }

    printWindow.document.open()
    printWindow.document.write(createResumeDocumentHtml(previewTemplate, editorContent))
    printWindow.document.close()
    printWindow.focus()
    window.setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  return (
    <PageTransition className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <SectionHeader
          eyebrow="Templates"
          title="Editable resume template gallery"
          description="Pick a polished layout by role, customize the content, and export it as PDF or Word."
        />
        <TemplateStats templates={templates} categories={categories} />
      </section>

      {loading ? (
        <LoadingState title="Loading Library" description="Fetching latest templates..." />
      ) : error ? (
        <div className="rounded-[20px] border border-rose-200 bg-rose-50 p-6 text-center text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 rounded-[22px] border border-white/20 bg-white/55 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block lg:w-[360px]">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search templates, roles, industries"
                className="w-full rounded-full border border-slate-200 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200 dark:border-white/10 dark:bg-slate-950/40 dark:text-white dark:focus:border-cyan-400"
              />
            </label>

            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => {
                const isActive = activeCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'border-cyan-300 bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                        : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {filteredTemplates.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredTemplates.map((template) => (
                <GlassCard key={template.id} hover={false} className="group flex h-full flex-col overflow-hidden p-0">
                  <div className="p-4">
                    <TemplateThumbnail template={template} />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-slate-200/70 p-5 dark:border-white/10">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={badgeVariantByCategory[template.category] || 'accent'}>
                        {template.category}
                      </Badge>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                        <Star size={12} />
                        {template.score}
                      </span>
                    </div>

                    <div className="mt-4 flex-1">
                      <h2 className="text-xl font-bold text-slate-950 dark:text-white">{template.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {template.description}
                      </p>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <LayoutTemplate size={16} className="mt-0.5 text-cyan-500" />
                        <span>{template.sections}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(template.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                      <Button className="w-full gap-2 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold hover:from-emerald-400 hover:to-teal-500 shadow-md" onClick={() => window.location.href = `/builder?templateId=${template.id}`}>
                        <Sparkles size={15} />
                        Open in Visual Builder
                      </Button>
                      <Button variant="secondary" className="w-full gap-2 px-3 text-xs" onClick={() => handlePreview(template)}>
                        <Pencil size={14} />
                        Quick Markdown Edit
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="rounded-[22px] border border-dashed border-slate-300 bg-white/50 p-10 text-center dark:border-white/15 dark:bg-white/5">
              <Sparkles size={32} className="mx-auto text-cyan-500" />
              <h2 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">No matching templates</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try a different role, category, or keyword.
              </p>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={previewTemplate?.title || 'Template Editor'}
        className="max-w-6xl"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setEditorContent(originalContent)}
              disabled={previewLoading || !originalContent}
              className="gap-2"
            >
              <RotateCcw size={15} /> Reset
            </Button>
            <Button
              variant="secondary"
              onClick={handleDownloadWord}
              disabled={previewLoading || !editorContent.trim()}
              className="gap-2"
            >
              <FileText size={15} /> Download Word
            </Button>
            <Button
              onClick={handleDownloadPdf}
              disabled={previewLoading || !editorContent.trim()}
              className="gap-2"
            >
              <Printer size={15} /> Download PDF
            </Button>
          </>
        }
      >
        {previewTemplate ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <TemplateThumbnail template={previewTemplate} />
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <Palette size={16} className="text-cyan-500" />
                  {previewTemplate.audience}
                </div>
                <div className="mt-4 space-y-2">
                  {(previewTemplate.highlights || []).map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={15} className="text-emerald-500" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <label className="block">
              <span className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Resume content
              </span>
              <textarea
                value={previewLoading ? 'Loading template...' : editorContent}
                onChange={(event) => setEditorContent(event.target.value)}
                disabled={previewLoading}
                spellCheck="true"
                className="h-[68vh] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200 disabled:opacity-70 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:focus:border-cyan-400"
              />
            </label>
          </div>
        ) : null}
      </Modal>
    </PageTransition>
  )
}

export default TemplatesPage
