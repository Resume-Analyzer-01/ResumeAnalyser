import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useResumeStore } from '../../store/resumeStore'
import { RESUME_TEMPLATES } from '../../constants/templatesData'
import { TemplateGallery } from '../../components/builder/TemplateGallery'
import { CanvasEditor } from '../../components/builder/CanvasEditor'
import { ElementInspector } from '../../components/builder/ElementInspector'
import { LivePreviewPanel } from '../../components/builder/LivePreviewPanel'
import { ExportFlow } from '../../components/builder/ExportFlow'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { GlassCard } from '../../components/ui/GlassCard'
import {
  LayoutTemplate,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Columns,
  Clock,
  Pencil
} from 'lucide-react'

export const ResumeBuilderPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const templateIdParam = searchParams.get('templateId')

  const {
    resumeName,
    setResumeName,
    selectedTemplate,
    setSelectedTemplate,
    loadResumeFromBackend,
    undo,
    redo,
    historyIndex,
    history,
    zoom,
    setZoom,
    viewMode,
    setViewMode,
    lastSaved
  } = useResumeStore()

  const [showGallery, setShowGallery] = useState(true)

  useEffect(() => {
    if (id) {
      loadResumeFromBackend(id)
    } else if (templateIdParam) {
      const match = RESUME_TEMPLATES.find((t) => t.id === templateIdParam)
      if (match) setSelectedTemplate(match)
    }
  }, [id, templateIdParam])

  // Fit Page: calculates zoom so both width and height fit 100% on screen
  const handleFitPage = () => {
    const availableWidth = window.innerWidth - (showGallery ? 320 : 0) - (viewMode === 'split' ? 320 : 420) - 80
    const availableHeight = window.innerHeight - 260
    const scaleX = availableWidth / 850
    const scaleY = availableHeight / 1100
    const optimalScale = Math.min(scaleX, scaleY, 1.0)
    setZoom(parseFloat(Math.max(optimalScale, 0.45).toFixed(2)))
  }

  // Fit Width
  const handleFitWidth = () => {
    const availableWidth = window.innerWidth - (showGallery ? 320 : 0) - (viewMode === 'split' ? 320 : 420) - 80
    const scaleX = Math.min(availableWidth / 850, 1.1)
    setZoom(parseFloat(Math.max(scaleX, 0.45).toFixed(2)))
  }

  return (
    <PageTransition>
      <div className="space-y-5">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Interactive Editor"
            title="Visual Resume Builder"
            description="Choose from 15+ ATS-friendly templates, customize fonts and colors inline, and download pixel-perfect PDFs."
          />
          {lastSaved && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 shrink-0">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span>Saved: {new Date(lastSaved).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Builder Toolbar Glass Bar */}
        <GlassCard hover={false} className="!p-3.5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Template Switcher & Resume Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGallery(!showGallery)}
                className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  showGallery
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'border border-slate-200 bg-white/60 text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20'
                }`}
              >
                <LayoutTemplate className="w-4 h-4" />
                <span>{showGallery ? 'Hide Templates' : 'Browse Templates'}</span>
              </button>

              <div className="h-5 w-[1px] bg-slate-300 dark:bg-white/15" />

              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10">
                <Pencil className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none max-w-[200px] truncate"
                  placeholder="Resume Title"
                />
              </div>
            </div>

            {/* Center: Controls (Undo/Redo, Interactive Zoom, View Mode) */}
            <div className="flex items-center gap-3">
              {/* Undo / Redo */}
              <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/10">
                <button
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-30 transition"
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-30 transition"
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive Zoom Controls Bar */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 rounded-xl px-2.5 py-1 border border-slate-200 dark:border-white/10 text-xs">
                <button
                  onClick={() => setZoom(Math.max(zoom - 0.05, 0.4))}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-0.5"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                {/* Zoom Select Dropdown */}
                <select
                  value={Math.round(zoom * 100)}
                  onChange={(e) => setZoom(parseInt(e.target.value, 10) / 100)}
                  className="bg-transparent font-mono font-bold text-cyan-600 dark:text-cyan-400 outline-none text-xs cursor-pointer px-1"
                >
                  <option value="50" className="bg-slate-900 text-white">50%</option>
                  <option value="60" className="bg-slate-900 text-white">60% (Fit)</option>
                  <option value="75" className="bg-slate-900 text-white">75%</option>
                  <option value="90" className="bg-slate-900 text-white">90%</option>
                  <option value="100" className="bg-slate-900 text-white">100%</option>
                  <option value="125" className="bg-slate-900 text-white">125%</option>
                  <option value="150" className="bg-slate-900 text-white">150%</option>
                </select>

                <button
                  onClick={() => setZoom(Math.min(zoom + 0.05, 1.5))}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-0.5"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <div className="h-3 w-[1px] bg-slate-300 dark:bg-white/15 mx-1" />

                <button
                  onClick={handleFitPage}
                  className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 px-1.5 py-0.5 rounded-lg transition"
                  title="Fit Entire Page to Screen"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Fit Page</span>
                </button>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    viewMode === 'split'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Inspector</span>
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    viewMode === 'preview'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Right: Export Flow Actions */}
            <ExportFlow />
          </div>
        </GlassCard>

        {/* Main Workspace Layout Container */}
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-15rem)] min-h-[660px] items-stretch">
          {/* Column 1: Template Gallery Sidebar */}
          {showGallery && (
            <GlassCard hover={false} className="!p-0 w-full lg:w-80 shrink-0 overflow-hidden shadow-xl h-full flex flex-col">
              <TemplateGallery isOpen={showGallery} onClose={() => setShowGallery(false)} />
            </GlassCard>
          )}

          {/* Column 2: WYSIWYG Canvas Sheet Workspace */}
          <GlassCard hover={false} className="!p-0 flex-1 overflow-hidden shadow-2xl h-full flex flex-col bg-slate-900/40 dark:bg-slate-950/40 backdrop-blur-xl border border-slate-200 dark:border-white/10">
            <CanvasEditor />
          </GlassCard>

          {/* Column 3: Contextual Inspector or Live Preview */}
          <GlassCard hover={false} className="!p-0 w-full lg:w-80 shrink-0 overflow-hidden shadow-xl h-full flex flex-col">
            {viewMode === 'split' ? <ElementInspector /> : <LivePreviewPanel />}
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  )
}

export default ResumeBuilderPage
