import React, { useState } from 'react'
import { RESUME_TEMPLATES } from '../../constants/templatesData'
import { useResumeStore } from '../../store/resumeStore'
import { Search, Check, LayoutTemplate } from 'lucide-react'

export const TemplateGallery = ({ isOpen, onClose }) => {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Modern', 'Classic', 'Creative', 'Executive', 'Corporate', 'Academic', 'Compact']

  const filteredTemplates = RESUME_TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col h-full text-slate-900 dark:text-slate-100 select-none overflow-hidden">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-200 dark:border-white/10 space-y-3 bg-slate-50/50 dark:bg-white/5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm">
            <LayoutTemplate className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Template Gallery</span>
          </div>
          <span className="text-[11px] bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 font-mono font-semibold">
            15 Templates
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition font-semibold ${selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates List Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        <div className="grid grid-cols-1 gap-3.5 pb-4">
          {filteredTemplates.map((t) => {
            const isSelected = selectedTemplate.id === t.id
            return (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTemplate(t)
                  if (onClose) onClose()
                }}
                className={`group relative rounded-2xl border p-3 cursor-pointer transition-all duration-200 ${isSelected
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg ring-2 ring-cyan-500/50'
                    : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-slate-900/80'
                  }`}
              >
                {/* Thumbnail box */}
                <div className={`relative w-full h-[180px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-gradient-to-br ${t.thumbnailColor} flex flex-col p-2.5 shadow-inner group-hover:scale-[1.01] transition-transform`}>
                  <div className="bg-white/95 rounded p-2 text-[6px] leading-tight text-slate-800 h-full flex flex-col justify-between shadow-sm overflow-hidden pointer-events-none">
                    <div>
                      <div className="h-2 w-2/3 bg-slate-900 rounded mb-1"></div>
                      <div className="h-1.5 w-1/3 bg-cyan-600 rounded mb-2"></div>
                      <div className="h-1 w-full bg-slate-300 rounded mb-1"></div>
                      <div className="h-1 w-5/6 bg-slate-200 rounded mb-2"></div>
                    </div>
                    <div>
                      <div className="h-1.5 w-1/3 bg-slate-800 rounded mb-1"></div>
                      <div className="flex gap-0.5">
                        <span className="h-2 w-6 bg-cyan-100 rounded text-cyan-800 font-bold px-0.5">React</span>
                        <span className="h-2 w-6 bg-slate-100 rounded text-slate-800 font-bold px-0.5">Node</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-1 rounded-full shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Template Meta */}
                <div className="mt-2.5 flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {t.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded-md font-semibold">
                    {t.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
