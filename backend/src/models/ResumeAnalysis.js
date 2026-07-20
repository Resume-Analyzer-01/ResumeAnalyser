import mongoose from 'mongoose'

const resumeAnalysisSchema = new mongoose.Schema(
  {
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
    atsScore: { type: Number, required: true },
    grammarScore: { type: Number, required: true },
    keywordScore: { type: Number, required: true },
    formattingScore: { type: Number, required: true },
    readabilityScore: { type: Number, required: true },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    missingSkills: [{ type: String }],
    matchedSkills: [{ type: String }],
    recommendations: [{ type: String }],
    summary: { type: String, default: '' },
    aiProvider: { type: String, required: true },
    analysisVersion: { type: Number, default: 1 }
  },
  { timestamps: true }
)

export const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema)
export default ResumeAnalysis
