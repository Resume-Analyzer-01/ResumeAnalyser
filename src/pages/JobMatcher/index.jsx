import React, { useState, useEffect } from 'react'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { JobUploader } from '../../components/jobs/JobUploader'
import { DemandHeatmap } from '../../components/jobs/DemandHeatmap'
import { JobMatchingResults } from '../../components/jobs/JobMatchingResults'
import { JobComparison } from '../../components/jobs/JobComparison'

export const JobMatcherPage = () => {
  const [jobs, setJobs] = useState([])
  const [demandHeatmap, setDemandHeatmap] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // Initial fetch of user's uploaded jobs & demand heatmap
  const fetchUserJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs')
      const data = await res.json()
      if (data.success) {
        setJobs(data.jobs || [])
        setDemandHeatmap(data.demandHeatmap)
      }
    } catch (err) {
      console.error('Fetch Jobs Error:', err)
    }
  }

  useEffect(() => {
    fetchUserJobs()
  }, [])

  const handleAddJob = async (jobPayload) => {
    setIsUploading(true)
    try {
      const res = await fetch('http://localhost:5000/api/jobs/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobPayload)
      })
      const data = await res.json()
      if (data.success) {
        fetchUserJobs()
      }
    } catch (err) {
      alert('Failed to parse job description. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveJob = async (jobId) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${jobId}`, { method: 'DELETE' })
      fetchUserJobs()
    } catch (err) {
      console.error('Delete Job Error:', err)
    }
  }

  return (
    <PageTransition>
      <div className="space-y-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Targeted Job Search"
          title="Job Matcher & Demand Intelligence"
          description="Upload 3-5 job postings to extract skill heatmaps, evaluate per-job resume match scores, and bridge proficiency gaps."
        />

        {/* Component 1: Job Uploader */}
        <JobUploader
          jobs={jobs}
          onJobAdded={handleAddJob}
          onJobRemoved={handleRemoveJob}
          isUploading={isUploading}
        />

        {/* Component 2: Demand Heatmap */}
        <DemandHeatmap heatmapData={demandHeatmap} />

        {/* Component 3: Job Matching Results */}
        <JobMatchingResults jobs={jobs} />

        {/* Component 4: Side-by-Side Job Comparison Matrix */}
        <JobComparison jobs={jobs} />
      </div>
    </PageTransition>
  )
}

export default JobMatcherPage
