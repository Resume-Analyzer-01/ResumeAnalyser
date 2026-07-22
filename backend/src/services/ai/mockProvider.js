import AIProvider from './aiProvider.js'

export class MockAIProvider extends AIProvider {
  async analyze(resumeText) {
    // Generate realistic, consistent scores based on length of resume
    const length = resumeText ? resumeText.length : 0
    const scoreSeed = length > 0 ? (length % 20) : 0
    const atsScore = 75 + scoreSeed

    return {
      atsScore,
      grammarScore: 80 + (scoreSeed % 15),
      keywordScore: 70 + (scoreSeed % 25),
      formattingScore: 85,
      readabilityScore: 82 + (scoreSeed % 10),
      strengths: [
        'Clear narrative formatting with distinct job timelines',
        'Strong bullet points leading with action-oriented verbs',
        'Demonstrates good leadership signal and product ownership'
      ],
      weaknesses: [
        'Achievements could benefit from more quantitative metrics',
        'Slight keyword mismatch in target industry standard terminology',
        'Verify indentation consistency across section dividers'
      ],
      missingSkills: [
        'CI/CD Orchestration',
        'AWS Cloud Architecture',
        'Redis Caching Strategies'
      ],
      matchedSkills: [
        'React.js Development',
        'Node.js REST API Design',
        'Mongoose Schema Design',
        'TypeScript Implementation'
      ],
      recommendations: [
        'Integrate percentage results into current bullet points (e.g., "reduced load time by 30%")',
        'Incorporate target keywords (CI/CD, AWS) explicitly in a core skills section',
        'Shorten bio description to prevent text overlap in layout tools'
      ],
      summary: 'The resume demonstrates solid experience as a software engineer with strong technical foundations. Incorporating quantitative metrics and adding missing industry cloud skills will maximize ATS compatibility and reader impact.',
      aiProvider: 'mock-engine',
      analysisVersion: 1
    }
  }

  async optimize(resumeText) {
    const normalizedText = (resumeText || '').trim()

    if (!normalizedText) {
      return [
        '# Optimized Resume',
        '',
        '## Professional Summary',
        '- Add a concise summary with target role keywords.',
        '',
        '## Core Skills',
        '- Add ATS-relevant skills aligned to the job description.',
        '',
        '## Experience',
        '- Rewrite bullets with action verbs and measurable outcomes.'
      ].join('\n')
    }

    return [
      '# ATS-Optimized Resume Draft',
      '',
      '## Professional Summary',
      'Results-driven candidate with experience aligned to modern ATS screening criteria. Emphasizes measurable impact, role-specific keywords, and concise achievement-focused writing.',
      '',
      '## Core Skills',
      '- Resume Optimization',
      '- Applicant Tracking Systems (ATS)',
      '- Keyword Targeting',
      '- Impact-Focused Writing',
      '',
      '## Source Content',
      normalizedText,
      '',
      '## Recommended Improvements',
      '- Quantify achievements with percentages, revenue, time saved, or scale.',
      '- Add exact keywords from the target job description.',
      '- Keep bullet points concise and begin each with a strong action verb.'
    ].join('\n')
  }
}
export default MockAIProvider
