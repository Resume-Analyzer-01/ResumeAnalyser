import React, { useState } from 'react'
import { Upload, FileText, Plus, Trash2, Loader2, Sparkles } from 'lucide-react'

export const JobUploader = ({ jobs = [], onJobAdded, onJobRemoved, isUploading }) => {
  const [pasteText, setPasteText] = useState('')
  const [jobTitleInput, setJobTitleInput] = useState('')
  const [companyInput, setCompanyInput] = useState('')

  const handleTextSubmit = (e) => {
    e.preventDefault()
    if (!pasteText.trim() || pasteText.length < 20) {
      alert('Please enter a valid job description text (at least 20 characters).')
      return
    }

    onJobAdded({
      jobText: pasteText,
      jobTitle: jobTitleInput || 'Software Engineer',
      company: companyInput || 'Target Company'
    })

    setPasteText('')
    setJobTitleInput('')
    setCompanyInput('')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result
      if (text) {
        onJobAdded({
          jobText: text,
          jobTitle: file.name.replace(/\.[^/.]+$/, ''),
          company: 'Uploaded Document'
        })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-5 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            <span>Upload Job Descriptions</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add 3-5 target job descriptions to extract demand heatmaps and score your resume against each role.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
          {jobs.length} / 5 Jobs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Drag & Drop File Box */}
        <div className="relative border-2 border-dashed border-cyan-500/40 hover:border-cyan-500 rounded-2xl p-6 text-center bg-cyan-500/5 hover:bg-cyan-500/10 transition group flex flex-col items-center justify-center cursor-pointer">
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Click or drag job file to upload</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Supports TXT, PDF, DOCX</p>
        </div>

        {/* Quick Paste Form */}
        <form onSubmit={handleTextSubmit} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Job Title (e.g. React Dev)"
              value={jobTitleInput}
              onChange={(e) => setJobTitleInput(e.target.value)}
              className="bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Company (e.g. Google)"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              className="bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <textarea
            placeholder="Or paste full job description text here..."
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            rows={3}
            className="w-full bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
          />
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Parsing Job Requirements...</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Job Description</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Uploaded Jobs Queue */}
      {jobs.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Queued Target Roles ({jobs.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {jobs.map((job) => (
              <div
                key={job.jobId}
                className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3 flex items-center justify-between group hover:border-cyan-500/50 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{job.jobTitle}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{job.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => onJobRemoved(job.jobId)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  title="Remove Job"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
