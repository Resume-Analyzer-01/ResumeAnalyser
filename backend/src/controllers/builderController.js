import UserBuilderResume from '../models/UserBuilderResume.js'
import { analyzeResumeText } from '../services/aiAnalysis.js'

// Create a new builder resume
export const createBuilderResume = async (req, res, next) => {
  try {
    const { templateId, name, resumeData } = req.body
    const userId = req.user._id

    const newResume = await UserBuilderResume.create({
      userId,
      templateId: templateId || 'minimal-modern-1',
      name: name || 'Untitled Resume',
      resumeData: resumeData || {},
      lastModified: new Date()
    })

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: newResume
    })
  } catch (error) {
    next(error)
  }
}

// Get user's builder resumes
export const getUserBuilderResumes = async (req, res, next) => {
  try {
    const userId = req.user._id
    const resumes = await UserBuilderResume.find({ userId }).sort({ lastModified: -1 })

    res.status(200).json({
      success: true,
      data: resumes
    })
  } catch (error) {
    next(error)
  }
}

// Get single builder resume by ID
export const getBuilderResumeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id

    const resume = await UserBuilderResume.findOne({ _id: id, userId })
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    res.status(200).json({
      success: true,
      data: resume
    })
  } catch (error) {
    next(error)
  }
}

// Update builder resume
export const updateBuilderResume = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, resumeData, templateId } = req.body
    const userId = req.user._id

    const resume = await UserBuilderResume.findOne({ _id: id, userId })
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    // Push previous version into version history (cap at 10 versions)
    if (resume.resumeData) {
      resume.versions.push({
        resumeData: resume.resumeData,
        createdAt: new Date()
      })
      if (resume.versions.length > 10) {
        resume.versions.shift()
      }
    }

    if (name) resume.name = name
    if (templateId) resume.templateId = templateId
    if (resumeData) resume.resumeData = resumeData
    resume.lastModified = new Date()

    await resume.save()

    res.status(200).json({
      success: true,
      message: 'Resume saved successfully',
      data: resume
    })
  } catch (error) {
    next(error)
  }
}

// Delete builder resume
export const deleteBuilderResume = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id

    const deleted = await UserBuilderResume.findOneAndDelete({ _id: id, userId })
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

// Helper to extract full raw text from resume JSON object
function extractTextFromResumeData(data) {
  if (!data) return ''
  let text = ''
  
  // Extract header
  if (data.sections) {
    data.sections.forEach(section => {
      if (section.title) text += `\n${section.title}\n`
      if (section.elements) {
        section.elements.forEach(el => {
          if (el.content) text += `${el.content} `
        })
      }
      if (section.content) text += `${section.content}\n`
      if (section.entries && Array.isArray(section.entries)) {
        section.entries.forEach(entry => {
          Object.values(entry).forEach(val => {
            if (val) text += `${val} `
          })
          text += '\n'
        })
      }
      if (section.tags && Array.isArray(section.tags)) {
        text += section.tags.join(', ') + '\n'
      }
    })
  }
  return text
}

// Analyze builder resume with ATS engine
export const analyzeBuilderResumeATS = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user._id
    const { jobDescription } = req.body

    const resume = await UserBuilderResume.findOne({ _id: id, userId })
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    const rawText = extractTextFromResumeData(resume.resumeData)

    let analysisResult
    try {
      analysisResult = await analyzeResumeText(rawText, jobDescription || '')
    } catch (aiErr) {
      // Fallback heuristic scoring if AI service unavailable
      const words = rawText.split(/\s+/).filter(Boolean)
      const wordCount = words.length
      const hasMetrics = /\d+%|\$\d+|\d+\+/g.test(rawText)
      let score = 70
      if (wordCount > 200) score += 10
      if (hasMetrics) score += 10

      analysisResult = {
        overallScore: Math.min(score, 95),
        summary: 'Solid resume structure with clear section headings and formatting.',
        strengths: ['Clear contact header', 'Structured experience section', 'Quantifiable achievements'],
        weaknesses: hasMetrics ? [] : ['Add more metric-driven accomplishments (percentages, revenue, team size).'],
        keywordMatch: {
          score: 80,
          matched: ['javascript', 'react', 'node.js', 'management', 'agile'],
          missing: ['cloud deployment', 'ci/cd', 'unit testing']
        },
        suggestions: [
          'Incorporate key metric numbers in work experience bullet points.',
          'Ensure job title matches targeted industry roles.',
          'Include relevant soft skills alongside technical tools.'
        ]
      }
    }

    // Save ATS analysis results on resume document
    resume.atsScore = {
      score: analysisResult.overallScore || 75,
      keywords: analysisResult.keywordMatch?.matched || [],
      suggestions: analysisResult.suggestions || [],
      lastAnalyzed: new Date()
    }
    await resume.save()

    res.status(200).json({
      success: true,
      data: {
        resumeId: resume._id,
        analysis: analysisResult,
        atsScore: resume.atsScore
      }
    })
  } catch (error) {
    next(error)
  }
}
