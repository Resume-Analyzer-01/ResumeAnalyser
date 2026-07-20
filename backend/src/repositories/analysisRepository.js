import mongoose from 'mongoose'
import { ResumeAnalysis } from '../models/ResumeAnalysis.js'

const mockAnalyses = [
  {
    _id: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b888'),
    resumeId: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b111'),
    atsScore: 84,
    grammarScore: 88,
    keywordScore: 78,
    formattingScore: 90,
    readabilityScore: 82,
    strengths: ['Clear job timelines', 'Active outcome verbs'],
    weaknesses: ['Missing concrete achievements metrics'],
    missingSkills: ['Kubernetes', 'CI/CD Orchestration'],
    matchedSkills: ['REACT', 'NODE', 'EXPRESS', 'JAVASCRIPT'],
    recommendations: ['Integrate achievement metrics'],
    summary: 'The resume shows solid experience with modern frontend tech stacks.',
    aiProvider: 'mock-engine',
    analysisVersion: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const createAnalysis = async (analysisData) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    const analysis = new ResumeAnalysis(analysisData)
    return await analysis.save()
  }

  const mockAnalysis = {
    _id: new mongoose.Types.ObjectId(),
    ...analysisData,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  mockAnalyses.push(mockAnalysis)
  return mockAnalysis
}

export const findAnalysisByResumeId = async (resumeId) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await ResumeAnalysis.findOne({ resumeId })
  }
  return mockAnalyses.find((a) => String(a.resumeId) === String(resumeId)) || null
}
export default createAnalysis
