import React, { useState, useEffect } from 'react'
import { PageTransition } from '../../components/common/PageTransition'
import { SectionHeader } from '../../components/common/SectionHeader'
import { CoachingDashboard } from '../../components/coaching/CoachingDashboard'
import { AICoach } from '../../components/coaching/AICoach'
import { SkillTaxonomyVisualizer } from '../../components/skills/SkillTaxonomyVisualizer'

export const CoachingPage = () => {
  const [profile, setProfile] = useState(null)

  const fetchCoachingProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/coaching/profile')
      const data = await res.json()
      if (data.success) {
        setProfile(data.profile)
      }
    } catch (err) {
      console.error('Coaching Profile Fetch Error:', err)
    }
  }

  useEffect(() => {
    fetchCoachingProfile()
  }, [])

  return (
    <PageTransition>
      <div className="space-y-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Iterative Guidance"
          title="AI Coach & Career Progression"
          description="Track score improvements over versions, complete step-by-step coaching actions, and explore skill dependency graphs."
        />

        {/* AI Step-by-Step Coach */}
        <AICoach currentScore={profile?.currentScore || 78} previousScore={68} />

        {/* Dashboard Progress & Streak */}
        <CoachingDashboard profile={profile} />

        {/* Skill Taxonomy Graph Visualizer */}
        <SkillTaxonomyVisualizer />
      </div>
    </PageTransition>
  )
}

export default CoachingPage
