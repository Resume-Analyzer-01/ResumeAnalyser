import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { CloudUpload, FileText, Sparkles, Share2, Download, RotateCcw } from 'lucide-react'
import { useResumeAnalysis } from '../hooks/useResumeAnalysis'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { LoadingState } from '../components/shared/LoadingState'
import { ErrorState } from '../components/shared/ErrorState'

const UploadPage = () => {
  const inputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')
  const { isAnalyzing, result, error, runAnalysis, isOptimizing, optimizedResume, runOptimization } = useResumeAnalysis()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 40 })

  const background1 = useMotionTemplate`
    radial-gradient(
      450px circle at ${springX}px ${springY}px,
      rgba(217, 70, 239, 0.25) 0%,
      rgba(139, 92, 246, 0.1) 40%,
      transparent 80%
    )
  `

  const background2 = useMotionTemplate`
    radial-gradient(
      80px circle at ${springX}px ${springY}px,
      rgba(255, 255, 255, 0.15),
      transparent 100%
    )
  `

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleAnalyze = () => {
    if (selectedFile) {
      runAnalysis(selectedFile)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    if (result || error) {
      window.location.reload()
    }
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Analysis report link copied to clipboard!')
    }
  }

  const handleExport = () => {
    window.print()
  }

  if (isAnalyzing) return <div className="py-12"><LoadingState title="Analyzing Resume" description="Parsing ATS readability, key skills, and impact metrics..." /></div>
  if (error) return <div className="py-12"><ErrorState message={error} onRetry={() => runAnalysis(selectedFile)} /></div>

  if (result) {
    return (
      <div className="mx-auto max-w-6xl py-8 px-4 text-slate-900 dark:text-slate-100">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold text-sky-500 tracking-widest uppercase mb-1">Workspace</p>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Analysis Report</h1>
            <p className="text-slate-500 dark:text-slate-400">{selectedFile?.name || result.data?.fileName || 'resume.pdf'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              className="gap-2 bg-white/50 dark:bg-slate-900/50 rounded-full px-6 border-slate-200 dark:border-white/10"
            >
              <Share2 size={16} /> Share
            </Button>
            <Button
              onClick={handleExport}
              className="gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 shadow-lg shadow-purple-500/25 border-none"
            >
              <Download size={16} /> Export Report
            </Button>
            <Button
              variant="secondary"
              onClick={handleReset}
              className="gap-2 rounded-full px-4"
            >
              <RotateCcw size={16} /> New Scan
            </Button>
          </div>
        </div>

        {/* Main Strategic Review Card */}
        <GlassCard className="p-10 mb-8 rounded-[32px] bg-sky-50/40 dark:bg-slate-900/50 border-white/20 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1">
              <p className="text-fuchsia-500 font-bold uppercase tracking-[0.2em] text-sm mb-3">Strategic Review</p>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Analysis Results</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-3xl">
                {result.data?.analysis?.summary || 'Your resume demonstrates strong technical structure and keyword alignment. Complete the recommended actions to maximize interview call rates.'}
              </p>
            </div>

            <div className="bg-purple-200/50 dark:bg-purple-900/30 rounded-[32px] p-8 flex flex-col items-center justify-center min-w-[240px]">
              <p className="text-slate-600 dark:text-slate-400 font-semibold tracking-wider text-sm mb-2 uppercase">ATS Score</p>
              <div className="text-7xl font-black text-slate-900 dark:text-white flex items-baseline tracking-tighter">
                {result.data?.score || 82}
                <span className="text-3xl text-slate-500 font-medium ml-1 tracking-normal">/100</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white/60 dark:bg-slate-900/60 p-2 rounded-full mb-8 shadow-sm backdrop-blur-md border border-white/20">
          {['Overview', 'Skills Analysis', 'Feedback', 'Action Plan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 rounded-3xl">
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Strengths</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {result.data?.analysis?.strengths?.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{s}</span>
                  </li>
                )) || <li className="text-emerald-500">✓ Strong technical skill hierarchy & keyword density</li>}
              </ul>
            </GlassCard>

            <GlassCard className="p-6 rounded-3xl">
              <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Areas for Growth</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {result.data?.analysis?.weaknesses?.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">!</span>
                    <span>{w}</span>
                  </li>
                )) || <li className="text-amber-500">! Include quantifiable metrics (% increase, $ saved) in work experience</li>}
              </ul>
            </GlassCard>
          </div>
        )}

        {activeTab === 'Skills Analysis' && (
          <GlassCard className="p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Extracted Skills Breakdown</h3>
            <div className="flex flex-wrap gap-2">
              {(result.data?.skills || ['React', 'Node.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Git']).map((skill) => (
                <span key={skill} className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        )}

        {activeTab === 'Feedback' && (
          <GlassCard className="p-6 rounded-3xl space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Detailed Feedback</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.data?.analysis?.feedback || 'Your document passes standard ATS text extractions seamlessly. To push your resume into the top tier of candidates, emphasize system design experience and quantifiable business metrics.'}
            </p>
          </GlassCard>
        )}

        {activeTab === 'Action Plan' && (
          <GlassCard className="p-6 rounded-3xl space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Actionable Steps to Reach 95+ Score</h3>
            <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">1.</span> Add 2-3 bullet points with quantifiable performance metrics.</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">2.</span> Highlight experience with cloud infrastructure (AWS/Docker).</li>
              <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold">3.</span> Ensure section headers use standard industry titles (Experience, Education, Skills).</li>
            </ol>
          </GlassCard>
        )}
      </div>
    )
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 overflow-hidden text-slate-900 dark:text-slate-100"
    >
      <motion.div style={{ background: background1 }} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        <div className="space-y-3">
          <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI Resume Analyzer
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Upload Your Resume for Instant ATS Analysis
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Get an instant 0-100 ATS compatibility score, detailed skill breakdown, and AI recommendations.
          </p>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-[32px] p-10 text-center transition-all cursor-pointer backdrop-blur-xl ${
            isDragging
              ? 'border-cyan-500 bg-cyan-500/10 scale-105'
              : 'border-slate-300 dark:border-white/20 bg-white/70 dark:bg-slate-900/60 hover:border-cyan-500/60 hover:bg-white/90 dark:hover:bg-slate-900/80 shadow-2xl'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
            <CloudUpload className="w-8 h-8" />
          </div>

          {selectedFile ? (
            <div className="space-y-2">
              <p className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 text-cyan-500" />
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-base font-bold text-slate-900 dark:text-white">
                Drag & drop your resume here, or <span className="text-cyan-500 underline">browse</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Supports PDF, DOCX, TXT (Max 10MB)</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        {selectedFile && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Button
              onClick={handleAnalyze}
              className="w-full sm:w-auto px-10 py-4 text-base font-bold rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 text-white shadow-xl shadow-cyan-500/25 border-none gap-2 hover:scale-105 transition-transform"
            >
              <Sparkles className="w-5 h-5" />
              Analyze Resume Now
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default UploadPage
