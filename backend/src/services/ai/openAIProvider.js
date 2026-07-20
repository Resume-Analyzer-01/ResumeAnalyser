import axios from 'axios'
import AIProvider from './aiProvider.js'
import config from '../../config/env.js'
import logger from '../../config/logger.js'

export class OpenAIProvider extends AIProvider {
  async analyze(resumeText) {
    if (!config.ai.openaiKey) {
      logger.warn('OpenAI API key missing. Unable to complete OpenAI request.')
      throw new Error('OpenAI key not configured.')
    }

    try {
      const prompt = `
You are an expert ATS (Applicant Tracking System) reviewer and hiring manager.
Analyze the following resume text and provide a structured JSON assessment.

Resume Text:
"""
${resumeText}
"""

You MUST respond with a JSON object EXACTLY in this format:
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
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful career advisor and resume analyst. Respond with pure JSON.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.ai.openaiKey}`
          },
          timeout: 15000
        }
      )

      const result = JSON.parse(response.data.choices[0].message.content)
      return {
        ...result,
        aiProvider: 'openai',
        analysisVersion: 1
      }
    } catch (error) {
      logger.error(`OpenAI Request failed: ${error.message}`)
      throw error
    }
  }
}
export default OpenAIProvider
