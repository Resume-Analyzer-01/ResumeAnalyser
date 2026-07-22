import React from 'react'
import { useResumeStore } from '../../store/resumeStore'
import { GOOGLE_FONTS_LIST } from '../../constants/templatesData'
import { Sliders, Type, Palette } from 'lucide-react'

export const ElementInspector = () => {
  const {
    resumeData,
    activeElementId,
    activeSectionId,
    updateElement,
    applyColorPalette,
    applyFontFamily
  } = useResumeStore()

  if (!resumeData) return null

  let activeElement = null
  let activeSection = null

  if (resumeData.sections) {
    for (const sec of resumeData.sections) {
      if (sec.id === activeSectionId) activeSection = sec
      if (sec.elements) {
        const found = sec.elements.find((e) => e.id === activeElementId)
        if (found) {
          activeElement = found
          activeSection = sec
          break
        }
      }
    }
  }

  const PALETTE_PRESETS = [
    { name: 'Emerald', primary: '#1a472a', accent: '#4ade80', sectionBorder: '#e5e7eb' },
    { name: 'Navy Exec', primary: '#0f172a', accent: '#38bdf8', sectionBorder: '#cbd5e1' },
    { name: 'Classic Blue', primary: '#1e3a8a', accent: '#2563eb', sectionBorder: '#dbeafe' },
    { name: 'Purple Tech', primary: '#6b21a8', accent: '#c084fc', sectionBorder: '#f3e8ff' },
    { name: 'Teal Modern', primary: '#0f766e', accent: '#14b8a6', sectionBorder: '#ccfbf1' },
    { name: 'Amber Serif', primary: '#78350f', accent: '#d97706', sectionBorder: '#fde68a' }
  ]

  return (
    <div className="flex flex-col h-full text-slate-900 dark:text-slate-100 select-none overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 shrink-0">
        <div className="flex items-center gap-2 font-bold text-sm">
          <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Inspector Panel</span>
        </div>
        <span className="text-[10px] font-mono bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-300 dark:border-white/10 font-semibold">
          {activeElement ? activeElement.label || 'Text Element' : activeSection ? activeSection.title || 'Section' : 'Global Styling'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {activeElement ? (
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Type className="w-4 h-4" />
              <span>Text Formatting</span>
            </h4>

            {/* Content Input */}
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1 font-medium">Content</label>
              <textarea
                value={activeElement.content || ''}
                onChange={(e) => updateElement(activeSection.id, activeElement.id, { content: e.target.value })}
                rows={2}
                className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Font Family Dropdown */}
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1 font-medium">Font Family</label>
              <select
                value={activeElement.fontFamily || resumeData.fonts?.body || 'Inter'}
                onChange={(e) => updateElement(activeSection.id, activeElement.id, { fontFamily: e.target.value })}
                className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              >
                {GOOGLE_FONTS_LIST.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size Slider */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1 font-medium">
                <span>Font Size</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{activeElement.fontSize || 14}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="48"
                value={activeElement.fontSize || 14}
                onChange={(e) => updateElement(activeSection.id, activeElement.id, { fontSize: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Font Weight */}
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1 font-medium">Font Weight</label>
              <select
                value={activeElement.fontWeight || '400'}
                onChange={(e) => updateElement(activeSection.id, activeElement.id, { fontWeight: e.target.value })}
                className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="300">Light (300)</option>
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">SemiBold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">ExtraBold (800)</option>
              </select>
            </div>

            {/* Text Color Picker */}
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1 font-medium">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={activeElement.color || '#1f2937'}
                  onChange={(e) => updateElement(activeSection.id, activeElement.id, { color: e.target.value })}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={activeElement.color || '#1f2937'}
                  onChange={(e) => updateElement(activeSection.id, activeElement.id, { color: e.target.value })}
                  className="flex-1 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-100 dark:bg-white/5 p-3.5 rounded-2xl border border-slate-200 dark:border-white/10">
            Click any text or section on the canvas to customize specific properties.
          </div>
        )}

        {/* Global Color Scheme Presets */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Palette className="w-4 h-4" />
            <span>Theme Palettes</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {PALETTE_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyColorPalette(p)}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition group text-left"
              >
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                  {p.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.primary }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Global Font Pairing Presets */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10 pb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
            <Type className="w-4 h-4" />
            <span>Apply Global Font</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {GOOGLE_FONTS_LIST.slice(0, 6).map((font) => (
              <button
                key={font}
                onClick={() => applyFontFamily(font)}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition text-xs font-semibold text-slate-700 dark:text-slate-300 text-center"
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
