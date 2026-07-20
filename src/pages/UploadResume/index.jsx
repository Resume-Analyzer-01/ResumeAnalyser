import { Link } from 'react-router-dom'
import { ArrowRight, FileCheck2 } from 'lucide-react'
import { FileUploader } from '../../components/upload/FileUploader'
import { PageTransition } from '../../components/common/PageTransition'
import { useResumeAnalysis } from '../../hooks/useResumeAnalysis'
import { DashboardShell } from '../../layouts/DashboardShell'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { GlassCard } from '../../components/ui/GlassCard'
import { LoadingState } from '../../components/shared/LoadingState'

const UploadResumePage = () => {
  const { isAnalyzing, result, error, runAnalysis } = useResumeAnalysis()

  return (
    <PageTransition>
      <DashboardShell
        title="Upload Resume"
        description="Drag, preview, replace, and prepare resumes for mock analysis with production-ready states."
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <FileUploader onAnalyze={runAnalysis} />
          <div className="space-y-5">
            <GlassCard>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-[16px] bg-emerald-500 text-white">
                  <FileCheck2 size={21} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">Supported files</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">PDF and DOCX resume flows.</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Upload animation', 'Progress bar', 'Preview', 'Replace', 'Remove', 'Analyze state'].map((item) => (
                  <div key={item} className="rounded-[16px] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            {isAnalyzing ? <LoadingState title="Analyzing resume" description="Mock scoring engine is preparing your report." /> : null}
            {error ? <Alert variant="danger" title="Analysis error" description={error} /> : null}
            {result ? (
              <Alert variant="success" title="Analysis complete">
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span>Score: {result.data.score}/100</span>
                  <Link to={`/analysis/${result.data.resumeId}`}>
                    <Button className="gap-2 py-2">
                      View Report
                      <ArrowRight size={15} />
                    </Button>
                  </Link>
                </div>
              </Alert>
            ) : null}
          </div>
        </div>
      </DashboardShell>
    </PageTransition>
  )
}

export default UploadResumePage
