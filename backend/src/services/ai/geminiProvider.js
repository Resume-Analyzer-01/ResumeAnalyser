import axios from 'axios'
import AIProvider from './aiProvider.js'
import config from '../../config/env.js'
import logger from '../../config/logger.js'

export class GeminiProvider extends AIProvider {
  async analyze(resumeText) {
    if (!config.ai.geminiKey) {
      logger.warn('Gemini API key missing. Unable to complete Gemini request.')
      throw new Error('Gemini key not configured.')
    }

    try {
      const prompt = `
You are an expert ATS (Applicant Tracking System) reviewer and hiring manager.
Analyze the following resume text and provide a structured JSON assessment.

Resume Text:
"""
${resumeText}
"""

You MUST respond with a JSON object in this format:
{
  "atsScore": 85, 
  "grammarScore": 90, 
  "keywordScore": 80, 
  "formattingScore": 85, 
  "readabilityScore": 88, 
  "strengths": ["...", "..."], 
  "weaknesses": ["...", "..."], 
  "missingSkills": ["...", "..."], 
  "matchedSkills": ["...", "..."], 
  "recommendations": ["...", "..."], 
  "summary": "..." 
}
      `

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${config.ai.geminiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      )

      const responseText = response.data.candidates[0].content.parts[0].text
      const result = JSON.parse(responseText)
      return {
        ...result,
        aiProvider: 'gemini',
        analysisVersion: 1
      }
    } catch (error) {
      logger.error(`Gemini Request failed: ${error.message}`)
      throw error
    }
  }
  async optimize(resumeText) {
    if (!config.ai.geminiKey) {
      throw new Error('Gemini key not configured.')
    }

    try {
      const prompt = `
You are an expert resume writer and career coach.
Rewrite the following resume to be highly ATS-friendly.
Ensure the layout is clean, action verbs are used effectively, and keywords are naturally integrated.
Use proper Markdown formatting (e.g., # Name, ## Work Experience, bullet points).
Do NOT include any commentary, just output the final optimized resume in Markdown.

Original Resume:
"""
${resumeText}
"""
      `

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${config.ai.geminiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      )

      return response.data.candidates[0].content.parts[0].text
    } catch (error) {
      logger.error(`Gemini Optimization failed: ${error.message}`)
      throw error
    }
  }
}
export default GeminiProvider
