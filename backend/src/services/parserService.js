import pdf from 'pdf-parse'
import mammoth from 'mammoth'
import logger from '../config/logger.js'

/**
 * Extract text and basic contact/skill info from resume buffers.
 * @param {Buffer} fileBuffer - The uploaded file buffer.
 * @param {string} mimeType - The file mime type.
 * @returns {Promise<object>} Extracted text and parsed fields.
 */
export const parseResume = async (fileBuffer, mimeType) => {
  let text = ''
  try {
    if (mimeType === 'application/pdf') {
      const parsed = await pdf(fileBuffer)
      text = parsed.text
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword'
    ) {
      const parsed = await mammoth.extractRawText({ buffer: fileBuffer })
      text = parsed.value
    } else {
      // Fallback
      text = fileBuffer.toString('utf-8')
    }
  } catch (error) {
    logger.error(`Error parsing file with mimeType ${mimeType}: ${error.message}`)
    throw new Error('Failed to extract text from the upload. The file may be corrupted.')
  }

  // Basic regex extracts
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  const phoneRegex = /(\+?\d{1,4}[-.\s]??\d{1,10}[-.\s]??\d{1,10}[-.\s]??\d{1,10})/g

  const emails = text.match(emailRegex) || []
  const phones = text.match(phoneRegex) || []

  // Basic skills filter
  const skillsList = [
    'react', 'node', 'express', 'mongodb', 'javascript', 'typescript', 
    'python', 'java', 'aws', 'docker', 'kubernetes', 'sql', 'git', 
    'html', 'css', 'tailwind', 'redux', 'graphql', 'nest', 'next'
  ]
  const matchedSkills = []
  const textLower = text.toLowerCase()
  skillsList.forEach((skill) => {
    // Exact word boundary checks or simple inclusions
    if (textLower.includes(skill)) {
      matchedSkills.push(skill.toUpperCase())
    }
  })

  return {
    rawText: text,
    extractedInfo: {
      name: '', // Will be matched or input later
      email: emails[0] || '',
      phone: phones[0] || '',
      skills: matchedSkills
    }
  }
}
