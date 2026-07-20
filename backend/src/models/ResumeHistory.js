import mongoose from 'mongoose'

const resumeHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
    analysisId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResumeAnalysis', required: true },
    version: { type: Number, default: 1 },
    uploadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export const ResumeHistory = mongoose.model('ResumeHistory', resumeHistorySchema)
export default ResumeHistory
