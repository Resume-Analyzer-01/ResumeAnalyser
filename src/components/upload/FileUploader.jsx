import { AnimatePresence, motion } from 'framer-motion'
import { FileText, UploadCloud, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/Button'
import { ProgressBar } from '../common/ProgressBar'

export const FileUploader = ({ onAnalyze }) => {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!file) {
      setProgress(0)
      return undefined
    }

    setProgress(12)
    const timer = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 18))
    }, 220)

    return () => window.clearInterval(timer)
  }, [file])

  const acceptFile = (nextFile) => {
    if (!nextFile) return
    setFile(nextFile)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    acceptFile(event.dataTransfer.files?.[0])
  }

  return (
    <div className="space-y-5">
      <div
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`rounded-[28px] border border-dashed p-8 text-center transition ${
          dragging
            ? 'border-cyan-400 bg-cyan-400/10'
            : 'border-slate-300/80 bg-white/70 dark:border-white/15 dark:bg-slate-900/60'
        }`}
      >
        <motion.div
          animate={{ y: dragging ? -6 : [0, -6, 0] }}
          transition={{ duration: 2, repeat: dragging ? 0 : Infinity }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-xl shadow-cyan-500/20"
        >
          <UploadCloud size={28} />
        </motion.div>
        <h2 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">Upload your resume</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-300">
          Drag and drop a PDF or DOCX resume, or browse your device to prepare a mock analysis.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={() => inputRef.current?.click()} className="gap-2">
            <UploadCloud size={16} />
            Browse file
          </Button>
          <Button type="button" variant="secondary" onClick={() => setFile(null)}>
            Reset
          </Button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(event) => acceptFile(event.target.files?.[0])}
        />
      </div>

      <AnimatePresence>
        {file ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-[22px] border border-white/20 bg-white/75 p-5 shadow-xl shadow-slate-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white">
                  <FileText size={21} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-950 dark:text-white">{file.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{Math.max(1, Math.round(file.size / 1024))} KB</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
                  Replace
                </Button>
                <button
                  type="button"
                  aria-label="Remove selected resume"
                  onClick={() => setFile(null)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <ProgressBar label="Upload preparation" value={progress} color="bg-cyan-500" className="mt-5" />
            <Button type="button" disabled={progress < 100} onClick={() => onAnalyze?.(file)} className="mt-5 w-full gap-2">
              <UploadCloud size={16} />
              Analyze Resume
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
