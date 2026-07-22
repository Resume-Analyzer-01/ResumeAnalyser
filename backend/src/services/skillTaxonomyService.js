// Seed Taxonomy Knowledge Base
const DEFAULT_SKILL_TAXONOMY = [
  {
    skillId: 'react',
    name: 'React.js',
    category: 'Frontend',
    demandScore: 92,
    salaryBoost: 18,
    relatedSkills: ['javascript', 'redux', 'zustand', 'next.js', 'typescript', 'tailwind']
  },
  {
    skillId: 'spring-boot',
    name: 'Spring Boot',
    category: 'Backend',
    demandScore: 90,
    salaryBoost: 22,
    relatedSkills: ['java', 'microservices', 'kafka', 'postgresql', 'docker', 'oauth2']
  },
  {
    skillId: 'python',
    name: 'Python',
    category: 'Backend / AI',
    demandScore: 95,
    salaryBoost: 20,
    relatedSkills: ['fastapi', 'django', 'spacy', 'pandas', 'scikit-learn', 'docker']
  },
  {
    skillId: 'kubernetes',
    name: 'Kubernetes',
    category: 'DevOps',
    demandScore: 88,
    salaryBoost: 25,
    relatedSkills: ['docker', 'aws', 'helm', 'ci/cd', 'terraform']
  },
  {
    skillId: 'node.js',
    name: 'Node.js',
    category: 'Backend',
    demandScore: 91,
    salaryBoost: 17,
    relatedSkills: ['javascript', 'express', 'mongodb', 'typescript', 'graphql']
  }
]

/**
 * Calculates context multiplier for a skill based on surrounding tech stack in resume.
 */
export const calculateSkillContextScore = (skillName, allResumeSkills = []) => {
  const normalizedSkill = skillName.toLowerCase().trim()
  const normalizedResumeSkills = allResumeSkills.map((s) => s.toLowerCase().trim())

  const taxonomyItem = DEFAULT_SKILL_TAXONOMY.find(
    (item) => item.skillId === normalizedSkill || item.name.toLowerCase() === normalizedSkill
  )

  if (!taxonomyItem) {
    return { multiplier: 1.0, relatedFound: [] }
  }

  const relatedFound = taxonomyItem.relatedSkills.filter((rel) => normalizedResumeSkills.includes(rel))

  // +10% multiplier per complementary skill found (up to 1.5x max)
  const multiplier = Math.min(1.0 + relatedFound.length * 0.1, 1.5)

  return {
    multiplier: parseFloat(multiplier.toFixed(2)),
    relatedFound,
    demandScore: taxonomyItem.demandScore,
    salaryBoost: taxonomyItem.salaryBoost
  }
}

/**
 * Perform context-aware scoring of a resume against a target job requirements
 */
export const scoreResumeContextAware = (resumeSkills = [], jobRequiredSkills = [], resumeText = '') => {
  let score = 0
  const matchedSkills = []
  const missingSkills = []
  const proficiencyGaps = []

  const normalizedResumeSkills = resumeSkills.map((s) => (typeof s === 'string' ? s.toLowerCase() : s.name?.toLowerCase()))

  jobRequiredSkills.forEach((jobSkill) => {
    const sName = typeof jobSkill === 'string' ? jobSkill : jobSkill.skill
    const normalizedName = sName.toLowerCase().trim()
    const reqLevel = jobSkill.proficiency || 'intermediate'
    const importance = jobSkill.importance || 'important'

    const importanceMultiplier = importance === 'critical' ? 1.5 : importance === 'important' ? 1.2 : 1.0

    const isMatch = normalizedResumeSkills.some(
      (rSkill) => rSkill === normalizedName || normalizedName.includes(rSkill) || rSkill.includes(normalizedName)
    )

    if (isMatch) {
      const contextInfo = calculateSkillContextScore(normalizedName, normalizedResumeSkills)
      const basePoints = 15 * importanceMultiplier * contextInfo.multiplier
      score += basePoints
      matchedSkills.push({
        skill: sName,
        contextMultiplier: contextInfo.multiplier,
        relatedSkillsFound: contextInfo.relatedFound
      })
    } else {
      missingSkills.push({
        skill: sName,
        importance,
        requiredLevel: reqLevel
      })

      proficiencyGaps.push({
        skill: sName,
        required: reqLevel,
        userLevel: 'none',
        recommendation: `Add experience or projects demonstrating ${sName} to boost match score.`
      })
    }
  })

  // Normalize final match score between 0 and 100
  const maxPossible = Math.max(jobRequiredSkills.length * 18, 10)
  const finalMatchScore = Math.min(Math.round((score / maxPossible) * 100), 98)

  return {
    matchScore: Math.max(finalMatchScore, 45), // Base score floor for parsed resumes
    matchedSkills: matchedSkills.map((m) => m.skill),
    matchedSkillsDetailed: matchedSkills,
    missingSkills: missingSkills.map((m) => m.skill),
    missingSkillsDetailed: missingSkills,
    proficiencyGaps
  }
}
