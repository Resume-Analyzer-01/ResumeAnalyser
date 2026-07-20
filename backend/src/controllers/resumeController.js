import {
  createResume,
  findResumeById,
  getResumesByUserId,
  deleteResumeById
} from '../repositories/resumeRepository.js'
import { createAnalysis, findAnalysisByResumeId } from '../repositories/analysisRepository.js'
import { uploadFile } from '../services/storageService.js'
import { parseResume } from '../services/parserService.js'
import { getAIProvider } from '../services/ai/index.js'
import logger from '../config/logger.js'
import { Notification } from '../models/Notification.js'

/**
 * Handle resume upload, parsing, and structured AI analysis.
 */
export const uploadResume = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'File is required. Please upload a PDF or DOCX document.' })
  }

  try {
    logger.info(`Processing resume upload: ${req.file.originalname} (size: ${req.file.size} bytes)`)

    // 1. Storage upload
    const storageUrl = await uploadFile(req.file)

    // 2. Extracted text from parser
    const { rawText, extractedInfo } = await parseResume(req.file.buffer, req.file.mimetype)

    // 3. Create metadata entry
    const resume = await createResume({
      userId: req.user.id,
      originalFileName: req.file.originalname,
      storageUrl,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      status: 'uploaded'
    })

    // 4. Run AI analysis
    const provider = getAIProvider()
    let analysisOutput
    try {
      analysisOutput = await provider.analyze(rawText)
    } catch (error) {
      logger.error(`AI analysis pipeline error: ${error.message}`)
      if (resume.save) {
        resume.status = 'failed'
        await resume.save()
      }
      
      await Notification.create({
        userId: req.user.id,
        title: 'Analysis failed',
        message: `Failed to analyze ${req.file.originalname}. Please try again later.`,
        type: 'error'
      });

      return res.status(502).json({ success: false, message: 'AI Analysis engine failed to process resume text.' })
    }

    // Include extracted skills in matchedSkills if empty
    if ((!analysisOutput.matchedSkills || analysisOutput.matchedSkills.length === 0) && extractedInfo.skills.length > 0) {
      analysisOutput.matchedSkills = extractedInfo.skills
    }

    // 5. Store structured analysis results
    const analysis = await createAnalysis({
      resumeId: resume._id,
      ...analysisOutput
    })

    // 6. Mark analyzed
    if (resume.save) {
      resume.status = 'analyzed'
      await resume.save()
    }

    await Notification.create({
      userId: req.user.id,
      title: 'Analysis complete',
      message: `Your report for ${req.file.originalname} is ready with an ATS score of ${analysis.atsScore}.`,
      type: 'success'
    });

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully.',
      data: {
        resumeId: resume._id,
        fileName: resume.originalFileName,
        url: resume.storageUrl,
        score: analysis.atsScore,
        analysis
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get resume history with pagination, sorting, and filtering.
 */
export const getHistory = async (req, res, next) => {
  const { page = 1, limit = 5, sort = 'createdAt', order = 'desc', search = '', status } = req.query

  try {
    const query = {}
    if (search) {
      query.originalFileName = search
    }
    if (status) {
      query.status = status
    }

    const { items, count } = await getResumesByUserId(req.user.id, query, { page, limit, sort, order })

    res.status(200).json({
      success: true,
      data: {
        resumes: items,
        pagination: {
          totalItems: count,
          currentPage: parseInt(page, 10),
          totalPages: Math.ceil(count / limit),
          pageSize: parseInt(limit, 10)
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get detailed analysis output for a specific resume ID.
 */
export const getAnalysisDetails = async (req, res, next) => {
  const { id } = req.params
  try {
    const resume = await findResumeById(id)
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume record not found.' })
    }

    // Security check: ensure file belongs to the logged-in user (unless admin)
    if (String(resume.userId) !== String(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' })
    }

    const analysis = await findAnalysisByResumeId(resume._id)
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis details not found.' })
    }

    res.status(200).json({
      success: true,
      data: {
        resume,
        analysis
      }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete a resume and its analysis record.
 */
export const deleteResume = async (req, res, next) => {
  const { id } = req.params
  try {
    const resume = await findResumeById(id)
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume record not found.' })
    }

    if (String(resume.userId) !== String(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' })
    }

    await deleteResumeById(resume._id)
    res.status(200).json({ success: true, message: 'Resume deleted successfully.' })
  } catch (error) {
    next(error)
  }
}

/**
 * Handle resume optimization (make ATS friendly).
 */
export const optimizeResume = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'File is required. Please upload a PDF or DOCX document.' })
  }

  try {
    logger.info(`Processing resume optimization: ${req.file.originalname}`)

    const { rawText } = await parseResume(req.file.buffer, req.file.mimetype)
    const provider = getAIProvider()
    let optimizedText
    
    try {
      if (typeof provider.optimize === 'function') {
        optimizedText = await provider.optimize(rawText)
      } else {
         return res.status(500).json({ success: false, message: 'AI Optimization not supported by current provider.' })
      }
    } catch (error) {
      logger.error(`AI optimization error: ${error.message}`)
      return res.status(502).json({ success: false, message: 'AI Engine failed to optimize resume.' })
    }

    res.status(200).json({
      success: true,
      message: 'Resume optimized successfully.',
      data: {
        optimizedResume: optimizedText
      }
    })
  } catch (error) {
    next(error)
  }
}
