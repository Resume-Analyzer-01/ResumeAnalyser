import mongoose from 'mongoose'

const userBuilderResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    templateId: { type: String, required: true },
    name: { type: String, default: 'Untitled Resume' },
    resumeData: { type: Object, required: true },
    atsScore: {
      score: { type: Number, default: null },
      keywords: [String],
      suggestions: [String],
      lastAnalyzed: Date
    },
    versions: [
      {
        resumeData: Object,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    lastModified: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export const UserBuilderResume = mongoose.model('UserBuilderResume', userBuilderResumeSchema)
export default UserBuilderResume
