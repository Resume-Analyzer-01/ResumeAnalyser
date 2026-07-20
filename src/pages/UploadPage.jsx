import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { CloudUpload, FileText, Sparkles, Share2, Download } from 'lucide-react'
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

  if (isAnalyzing) return <div className="py-12"><LoadingState /></div>
  if (error) return <div className="py-12"><ErrorState message={error} onRetry={() => runAnalysis(selectedFile)} /></div>
  
  if (result) {
    return (
      <div className="mx-auto max-w-6xl py-8 px-4">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold text-sky-500 tracking-widest uppercase mb-1">Workspace</p>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Analysis Report</h1>
            <p className="text-slate-500 dark:text-slate-400">{selectedFile?.name || result.data?.fileName || 'resume.pdf'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-white/50 dark:bg-slate-900/50 rounded-full px-6 border-slate-200 dark:border-white/10">
              <Share2 size={16} /> Share
            </Button>
            <Button className="gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full px-6 shadow-lg shadow-purple-500/25 border-none">
              <Download size={16} /> Download Resume
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
                {result.data?.analysis?.summary}
              </p>
            </div>
            
            <div className="bg-purple-200/50 dark:bg-purple-900/30 rounded-[32px] p-8 flex flex-col items-center justify-center min-w-[240px]">
              <p className="text-slate-600 dark:text-slate-400 font-semibold tracking-wider text-sm mb-2 uppercase">ATS Score</p>
              <div className="text-7xl font-black text-slate-900 dark:text-white flex items-baseline tracking-tighter">
                {result.data?.score}
                <span className="text-3xl text-slate-500 font-medium ml-1 tracking-normal">/100</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white/60 dark:bg-slate-900/60 p-2 rounded-full mb-8 shadow-sm backdrop-blur-md border border-white/20">
          {['Overview', 'Skills Analysis', 'Feedback', 'Action Plan'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'Overview' && (
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Detailed Overview</h3>
              <div className="space-y-8">
                {/* Strengths */}
                {(result.data?.analysis?.strengths?.length > 0) && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest dark:text-slate-400 mb-4">Strengths</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {result.data.analysis.strengths.map((item, i) => (
                        <div key={`strength-${i}`} className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-slate-700 dark:text-slate-200">{item}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          )}

          {activeTab === 'Feedback' && (
            <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Constructive Feedback</h3>
                {/* Weaknesses */}
                {(result.data?.analysis?.weaknesses?.length > 0) && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest dark:text-slate-400 mb-4">Areas for Improvement</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {result.data.analysis.weaknesses.map((item, i) => (
                        <div key={`weakness-${i}`} className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm text-slate-700 dark:text-slate-200">{item}</div>
                      ))}
                    </div>
                  </div>
                )}
            </GlassCard>
          )}

          {activeTab === 'Skills Analysis' && (
            <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Skills Assessment</h3>
                {/* Missing Skills */}
                {(result.data?.analysis?.missingSkills?.length > 0) && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest dark:text-slate-400 mb-4">Suggested Skills to Add</h4>
                    <div className="flex flex-wrap gap-3">
                      {result.data.analysis.missingSkills.map((skill, i) => (
                        <span key={`skill-${i}`} className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-600 dark:text-amber-300">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
            </GlassCard>
          )}

          {activeTab === 'Action Plan' && (
            <GlassCard className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Next Steps</h3>
                  <Button 
                    onClick={() => runOptimization(selectedFile)}
                    disabled={isOptimizing}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 shadow-lg shadow-emerald-500/25 border-none gap-2 whitespace-nowrap"
                  >
                    <Sparkles size={16} />
                    {isOptimizing ? 'Optimizing Resume...' : 'Make ATS Friendly'}
                  </Button>
                </div>

                {optimizedResume && (
                  <div className="mb-8 p-6 bg-slate-900 rounded-3xl border border-slate-700 shadow-inner">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">ATS Optimized Resume</h4>
                      <Button variant="outline" className="text-xs py-1 px-3 h-8 bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white rounded-full" onClick={() => navigator.clipboard.writeText(optimizedResume)}>Copy Markdown</Button>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono overflow-auto max-h-[500px] p-4 bg-slate-950 rounded-xl custom-scrollbar">
                      {optimizedResume}
                    </pre>
                  </div>
                )}

                {/* Recommendations */}
                {(result.data?.analysis?.recommendations?.length > 0) && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest dark:text-slate-400 mb-4">Actionable Recommendations</h4>
                    <div className="space-y-3">
                      {result.data.analysis.recommendations.map((item, i) => (
                        <div key={`rec-${i}`} className="rounded-2xl border border-blue-400/20 bg-blue-400/10 px-5 py-4 text-sm text-slate-700 dark:text-slate-200">{item}</div>
                      ))}
                    </div>
                  </div>
                )}
            </GlassCard>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[80vh] w-full items-center justify-center py-8">
      <div className="w-full flex justify-center px-4">
        {/* Section 2: Upload Area Card */}
        <GlassCard 
          onMouseMove={handleMouseMove}
          className={`group relative overflow-hidden flex min-h-[420px] w-full max-w-2xl flex-col !rounded-[48px] p-4 transition-all duration-300 ${isDragging ? 'bg-fuchsia-500/5' : ''}`} 
          onDragOver={handleDragOver} 
          onDragLeave={handleDragLeave} 
          onDrop={handleDrop}
        >
          {/* Interactive Background Glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: background1,
            }}
          />
          {/* Sharp center core for the cursor */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background: background2,
            }}
          />
          
          <div className={`relative z-10 flex h-full w-full flex-1 flex-col items-center justify-center rounded-[36px] border-2 border-dashed transition-all duration-300 p-8 ${isDragging ? 'border-fuchsia-500' : 'border-slate-300 dark:border-white/20'}`}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25">
              <CloudUpload size={28} />
            </div>
            
            <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Upload your resume</h2>
            <p className="mt-3 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
              {selectedFile 
                ? `Selected: ${selectedFile.name}` 
                : 'Drag and drop a PDF or DOCX resume, or browse your device to prepare a mock analysis.'}
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              {!selectedFile ? (
                <Button onClick={() => inputRef.current?.click()} className="gap-2 px-6 py-2.5 shadow-md shadow-fuchsia-500/20">
                  <CloudUpload size={18} /> Browse file
                </Button>
              ) : (
                <Button onClick={handleAnalyze} className="gap-2 px-6 py-2.5 shadow-md shadow-fuchsia-500/20">
                  <Sparkles size={18} /> Analyze
                </Button>
              )}
              <Button variant="secondary" onClick={handleReset} className="px-6 py-2.5">
                Reset
              </Button>
            </div>
            <input ref={inputRef} type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default UploadPage
