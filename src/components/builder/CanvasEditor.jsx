import React, { useRef } from 'react'
import { useResumeStore } from '../../store/resumeStore'
import { EditableTextElement } from './EditableTextElement'
import { Plus, Trash2 } from 'lucide-react'

export const CanvasEditor = ({ containerId = 'resume-canvas-document' }) => {
  const {
    resumeData,
    activeElementId,
    activeSectionId,
    setActiveElement,
    updateElement,
    updateSectionTitle,
    updateSectionContent,
    addEntry,
    updateEntry,
    removeEntry,
    addSkillTag,
    removeSkillTag,
    zoom,
    setZoom
  } = useResumeStore()

  const containerRef = useRef(null)

  // Handle Ctrl + Wheel zooming for intuitive canvas control
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.05 : -0.05
      setZoom(Math.min(Math.max(zoom + delta, 0.4), 1.5))
    }
  }

  if (!resumeData) return null

  const colors = resumeData.colors || {
    primary: '#1a472a',
    accent: '#4ade80',
    text: '#1f2937',
    lightText: '#6b7280',
    background: '#ffffff',
    sectionBorder: '#e5e7eb'
  }

  const fonts = resumeData.fonts || { heading: 'Poppins', body: 'Inter' }

  const sidebarSection = resumeData.sections?.find((s) => s.type === 'sidebar')
  const mainSections = resumeData.sections?.filter((s) => s.type !== 'sidebar') || []

  const renderSection = (section) => {
    if (section.type === 'header') {
      return (
        <div
          key={section.id}
          onClick={() => setActiveElement(null, section.id)}
          style={section.style || { borderBottom: `2px solid ${colors.primary}` }}
          className="pb-4 mb-5 relative group"
        >
          <div className="space-y-1.5">
            {section.elements?.map((el) => (
              <EditableTextElement
                key={el.id}
                element={el}
                sectionId={section.id}
                isSelected={activeElementId === el.id}
                onSelect={(id, secId) => setActiveElement(id, secId)}
                onUpdate={(id, updates) => updateElement(section.id, id, updates)}
              />
            ))}
          </div>
        </div>
      )
    }

    if (section.type === 'sectionWithContent') {
      const isSecSelected = activeSectionId === section.id
      return (
        <div
          key={section.id}
          onClick={() => setActiveElement(null, section.id)}
          className={`mb-5 relative group rounded-xl p-2 transition-all ${
            isSecSelected ? 'bg-cyan-500/5 ring-1 ring-cyan-400/40' : 'hover:bg-slate-50/80'
          }`}
        >
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-200">
            <input
              type="text"
              value={section.title || ''}
              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
              style={{
                fontFamily: fonts.heading || 'Poppins',
                color: section.style?.titleColor || colors.primary,
                fontSize: `${section.style?.titleFontSize || 13}px`
              }}
              className="font-bold uppercase tracking-wider bg-transparent outline-none border-b border-transparent focus:border-cyan-400 w-full"
            />
          </div>

          <textarea
            value={section.content || ''}
            onChange={(e) => updateSectionContent(section.id, e.target.value)}
            rows={3}
            placeholder="Write section summary..."
            style={{ color: colors.text }}
            className="w-full text-xs leading-relaxed bg-transparent resize-none outline-none focus:ring-1 focus:ring-cyan-400/50 rounded-lg p-1"
          />
        </div>
      )
    }

    if (section.type === 'sectionWithEntries') {
      const isSecSelected = activeSectionId === section.id
      return (
        <div
          key={section.id}
          onClick={() => setActiveElement(null, section.id)}
          className={`mb-5 relative group rounded-xl p-2 transition-all ${
            isSecSelected ? 'bg-cyan-500/5 ring-1 ring-cyan-400/40' : 'hover:bg-slate-50/80'
          }`}
        >
          <div className="flex items-center justify-between pb-1 mb-3 border-b border-slate-200">
            <input
              type="text"
              value={section.title || ''}
              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
              style={{
                fontFamily: fonts.heading || 'Poppins',
                color: section.style?.titleColor || colors.primary,
                fontSize: `${section.style?.titleFontSize || 13}px`
              }}
              className="font-bold uppercase tracking-wider bg-transparent outline-none border-b border-transparent focus:border-cyan-400"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                addEntry(section.id)
              }}
              className="no-print flex items-center gap-1 text-[11px] font-bold text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-2.5 py-1 rounded-lg border border-cyan-200 transition"
            >
              <Plus className="w-3 h-3" />
              <span>Add Entry</span>
            </button>
          </div>

          <div className="space-y-3.5">
            {section.entries?.map((entry) => (
              <div key={entry.id} className="relative group/entry border-l-2 border-slate-200 pl-3 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={entry.company || entry.school || ''}
                      onChange={(e) => updateEntry(section.id, entry.id, entry.company ? 'company' : 'school', e.target.value)}
                      placeholder={section.id === 'education' ? 'University / School' : 'Company Name'}
                      className="font-bold text-xs bg-transparent outline-none focus:bg-white focus:ring-1 focus:ring-cyan-400 rounded px-1"
                      style={{ color: colors.text }}
                    />
                    <input
                      type="text"
                      value={entry.position || entry.degree || ''}
                      onChange={(e) => updateEntry(section.id, entry.id, entry.position ? 'position' : 'degree', e.target.value)}
                      placeholder={section.id === 'education' ? 'Degree / Major' : 'Job Title'}
                      className="font-semibold text-xs text-cyan-700 bg-transparent outline-none focus:bg-white focus:ring-1 focus:ring-cyan-400 rounded px-1"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={entry.duration || entry.year || ''}
                      onChange={(e) => updateEntry(section.id, entry.id, entry.duration ? 'duration' : 'year', e.target.value)}
                      placeholder="2021 - Present"
                      className="text-[11px] text-slate-500 text-right bg-transparent outline-none focus:bg-white focus:ring-1 focus:ring-cyan-400 rounded px-1 w-28"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeEntry(section.id, entry.id)
                      }}
                      className="no-print opacity-0 group-hover/entry:opacity-100 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                      title="Remove Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {entry.description !== undefined && (
                  <textarea
                    value={entry.description || ''}
                    onChange={(e) => updateEntry(section.id, entry.id, 'description', e.target.value)}
                    rows={3}
                    placeholder="• Key achievement or bullet point..."
                    className="w-full text-[11px] leading-relaxed text-slate-700 bg-transparent resize-none outline-none focus:ring-1 focus:ring-cyan-400/50 rounded p-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (section.type === 'sectionWithTags') {
      const isSecSelected = activeSectionId === section.id
      return (
        <div
          key={section.id}
          onClick={() => setActiveElement(null, section.id)}
          className={`mb-5 relative group rounded-xl p-2 transition-all ${
            isSecSelected ? 'bg-cyan-500/5 ring-1 ring-cyan-400/40' : 'hover:bg-slate-50/80'
          }`}
        >
          <div className="flex items-center justify-between pb-1 mb-2.5 border-b border-slate-200">
            <input
              type="text"
              value={section.title || ''}
              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
              style={{
                fontFamily: fonts.heading || 'Poppins',
                color: section.style?.titleColor || colors.primary,
                fontSize: `${section.style?.titleFontSize || 13}px`
              }}
              className="font-bold uppercase tracking-wider bg-transparent outline-none border-b border-transparent focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            {section.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="group/tag inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 hover:border-cyan-400 transition"
              >
                <span>{tag}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSkillTag(section.id, idx)
                  }}
                  className="no-print opacity-0 group-hover/tag:opacity-100 text-slate-400 hover:text-red-500 font-bold ml-0.5 text-xs"
                >
                  ×
                </button>
              </span>
            ))}

            <input
              type="text"
              placeholder="+ Add Skill"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  addSkillTag(section.id, e.target.value)
                  e.target.value = ''
                }
              }}
              className="no-print text-xs px-2 py-1 rounded-lg border border-dashed border-slate-300 text-slate-500 focus:outline-none focus:border-cyan-400 w-24 bg-transparent"
            />
          </div>
        </div>
      )
    }

    return null
  }

  const targetWidth = resumeData.pageSize?.width || 850
  const targetHeight = resumeData.pageSize?.height || 1100

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="w-full h-full flex justify-center items-start overflow-auto p-4 sm:p-6 select-none bg-slate-900/40 dark:bg-slate-950/40 custom-scrollbar"
    >
      {/* Dynamic Sized Outer Box matching Scaled Dimensions exactly */}
      <div
        style={{
          width: `${targetWidth * zoom}px`,
          height: `${targetHeight * zoom}px`
        }}
        className="relative shrink-0 flex items-start justify-start transition-all duration-200 ease-out"
      >
        {/* Visual CSS Scaled Paper Sheet */}
        <div
          id={containerId}
          style={{
            width: `${targetWidth}px`,
            minHeight: `${targetHeight}px`,
            backgroundColor: colors.background || '#ffffff',
            color: colors.text || '#1f2937',
            fontFamily: fonts.body || 'Inter',
            transform: `scale(${zoom})`,
            transformOrigin: 'top left'
          }}
          className="absolute top-0 left-0 bg-white rounded-sm border border-slate-200 dark:border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] flex flex-col justify-start overflow-hidden"
        >
          {sidebarSection ? (
            <div className="flex flex-row min-h-[1100px] w-full">
              {/* Left Sidebar Column */}
              <div
                style={{
                  backgroundColor: sidebarSection.style?.backgroundColor || '#0f172a',
                  color: sidebarSection.style?.textColor || '#ffffff'
                }}
                className="w-[270px] shrink-0 p-8 flex flex-col justify-start gap-6 border-r border-slate-800"
              >
                {sidebarSection.elements?.map((el) => (
                  <EditableTextElement
                    key={el.id}
                    element={el}
                    sectionId={sidebarSection.id}
                    isSelected={activeElementId === el.id}
                    onSelect={(id, secId) => setActiveElement(id, secId)}
                    onUpdate={(id, updates) => updateElement(sidebarSection.id, id, updates)}
                  />
                ))}
              </div>

              {/* Right Main Content Area */}
              <div className="flex-1 p-8 flex flex-col justify-start gap-4">
                {mainSections.map((sec) => renderSection(sec))}
              </div>
            </div>
          ) : (
            <div className="p-12 flex flex-col justify-start gap-4">
              {resumeData.sections?.map((sec) => renderSection(sec))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
