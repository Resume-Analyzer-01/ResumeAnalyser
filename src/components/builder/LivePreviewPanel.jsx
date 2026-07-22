import React from 'react'
import { useResumeStore } from '../../store/resumeStore'
import { Eye, ShieldCheck } from 'lucide-react'

export const LivePreviewPanel = () => {
  const { resumeData } = useResumeStore()

  if (!resumeData) return null

  const colors = resumeData.colors || {
    primary: '#1a472a',
    accent: '#4ade80',
    text: '#1f2937',
    background: '#ffffff'
  }

  const fonts = resumeData.fonts || { heading: 'Poppins', body: 'Inter' }

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-100 w-[420px] shrink-0 overflow-y-auto select-none">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-white">
          <Eye className="w-5 h-5 text-cyan-400" />
          <span>Live PDF Preview</span>
        </div>
        <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>100% ATS Ready</span>
        </span>
      </div>

      <div className="p-4 flex justify-center bg-slate-950/80 min-h-full">
        <div
          style={{
            width: '380px',
            minHeight: '492px',
            backgroundColor: colors.background || '#ffffff',
            color: colors.text || '#1f2937',
            fontFamily: fonts.body || 'Inter',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
          }}
          className="rounded p-5 text-[9px] leading-snug flex flex-col justify-start border border-slate-700/60 overflow-hidden scale-100 transform-gpu"
        >
          {resumeData.sections?.map((section) => {
            if (section.type === 'header') {
              return (
                <div key={section.id} className="pb-2 mb-3 border-b-2" style={{ borderColor: colors.primary }}>
                  {section.elements?.map((el) => {
                    if (el.id === 'fullName') {
                      return (
                        <h1 key={el.id} style={{ fontFamily: fonts.heading, color: colors.primary }} className="text-base font-bold tracking-tight">
                          {el.content}
                        </h1>
                      )
                    }
                    if (el.id === 'jobTitle') {
                      return (
                        <p key={el.id} style={{ color: colors.accent }} className="text-[11px] font-semibold mb-1">
                          {el.content}
                        </p>
                      )
                    }
                    return (
                      <p key={el.id} className="text-[8px] text-slate-500">
                        {el.content}
                      </p>
                    )
                  })}
                </div>
              )
            }

            if (section.type === 'sectionWithContent') {
              return (
                <div key={section.id} className="mb-3">
                  <h2 style={{ fontFamily: fonts.heading, color: colors.primary }} className="text-[10px] font-bold uppercase tracking-wider mb-1 border-b pb-0.5 border-slate-200">
                    {section.title}
                  </h2>
                  <p className="text-[8.5px] text-slate-700 leading-normal">{section.content}</p>
                </div>
              )
            }

            if (section.type === 'sectionWithEntries') {
              return (
                <div key={section.id} className="mb-3">
                  <h2 style={{ fontFamily: fonts.heading, color: colors.primary }} className="text-[10px] font-bold uppercase tracking-wider mb-1 border-b pb-0.5 border-slate-200">
                    {section.title}
                  </h2>
                  <div className="space-y-2 mt-1">
                    {section.entries?.map((entry) => (
                      <div key={entry.id}>
                        <div className="flex justify-between font-bold text-[9px] text-slate-900">
                          <span>{entry.company || entry.school}</span>
                          <span className="text-[8px] font-normal text-slate-500">{entry.duration || entry.year}</span>
                        </div>
                        <div className="text-[8.5px] font-medium text-cyan-700 mb-0.5">{entry.position || entry.degree}</div>
                        {entry.description && <p className="text-[8px] text-slate-600 whitespace-pre-line">{entry.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

            if (section.type === 'sectionWithTags') {
              return (
                <div key={section.id} className="mb-3">
                  <h2 style={{ fontFamily: fonts.heading, color: colors.primary }} className="text-[10px] font-bold uppercase tracking-wider mb-1 border-b pb-0.5 border-slate-200">
                    {section.title}
                  </h2>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {section.tags?.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 border border-slate-200 rounded px-1.5 py-0.5 text-[7.5px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
