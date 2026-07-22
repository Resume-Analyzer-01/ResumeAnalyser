import React, { useState } from 'react'
import { useResumeStore } from '../../store/resumeStore'
import { exportResumeToPDF } from '../../utils/pdfExport'
import { Download, Sparkles, Save, Check, Loader2, AlertCircle } from 'lucide-react'

export const ExportFlow = () => {
  const { resumeName, saveResume, isSaving, runATSAnalysis, isAnalyzingATS, atsAnalysis, setActiveElement } = useResumeStore()
  const [isExporting, setIsExporting] = useState(false)
  const [showATSModal, setShowATSModal] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [exportMessage, setExportMessage] = useState('')

  const handleDownloadPDF = async () => {
    if (isExporting) return
    setIsExporting(true)
    setExportMessage('')
    
    // Clear active selection focus before generating PDF
    setActiveElement(null, null)

    try {
      await exportResumeToPDF('resume-canvas-document', `${(resumeName || 'Resume').replace(/\s+/g, '_')}.pdf`)
      setExportMessage('Exported!')
      setTimeout(() => setExportMessage(''), 3000)
    } catch (err) {
      console.error('Export Error:', err)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleSave = async () => {
    try {
      await saveResume()
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2500)
    } catch (err) {
      alert('Failed to save resume. Make sure you are logged in.')
    }
  }

  const handleRunATS = async () => {
    try {
      await runATSAnalysis(jobDescription)
    } catch (err) {
      alert('Failed to compute ATS score. Please try again.')
    }
  }

  return (
    <div className="flex items-center gap-2.5">
      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="inline-flex items-center gap-1.5 border border-slate-200 bg-white/60 text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20 text-xs px-4 py-2 rounded-full font-semibold transition-all"
      >
        {isSaving ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-500" />
        ) : saveSuccess ? (
          <Check className="w-3.5 h-3.5 text-cyan-500" />
        ) : (
          <Save className="w-3.5 h-3.5 text-slate-400" />
        )}
        <span>{saveSuccess ? 'Saved!' : 'Save'}</span>
      </button>

      {/* Analyze ATS Button */}
      <button
        onClick={() => setShowATSModal(true)}
        className="inline-flex items-center gap-1.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 text-xs px-4 py-2 rounded-full font-semibold transition-all"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
        <span>Analyze ATS</span>
      </button>

      {/* Export PDF Button */}
      <button
        onClick={handleDownloadPDF}
        disabled={isExporting}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-white font-bold text-xs px-5 py-2 rounded-full shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : exportMessage ? (
          <>
            <Check className="w-3.5 h-3.5 text-white" />
            <span>{exportMessage}</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </>
        )}
      </button>

      {/* ATS Analysis Modal */}
      {showATSModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-5 text-slate-900 dark:text-slate-100 relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">ATS Optimization & Scoring</h3>
              </div>
              <button
                onClick={() => setShowATSModal(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-xl font-bold px-2"
              >
                ×
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1.5 font-semibold">
                Target Job Description (Optional for Keyword Matching)
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job posting text here to compare keywords against target role..."
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-2xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={handleRunATS}
              disabled={isAnalyzingATS}
              className="w-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-white font-bold text-xs py-3 rounded-full transition shadow-lg shadow-fuchsia-500/20 flex items-center justify-center gap-2"
            >
              {isAnalyzingATS ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning Resume & Scoring ATS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run ATS Score Scan</span>
                </>
              )}
            </button>

            {atsAnalysis && (
              <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">Overall ATS Score</span>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{atsAnalysis.overallScore || 85} / 100</h4>
                  </div>
                  <div className="w-14 h-14 rounded-full border-4 border-cyan-500 flex items-center justify-center font-bold text-cyan-500 text-sm">
                    {atsAnalysis.overallScore || 85}%
                  </div>
                </div>

                {atsAnalysis.suggestions?.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Actionable Improvements</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {atsAnalysis.suggestions.map((sug, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200 dark:border-white/10">
                          <span className="text-cyan-500 font-bold">•</span>
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
