import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    originalFileName: { type: String, required: true },
    storageUrl: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },
    status: { type: String, enum: ['uploaded', 'parsed', 'analyzed', 'failed'], default: 'uploaded' }
  },
  { timestamps: true }
)

export const Resume = mongoose.model('Resume', resumeSchema)
export default Resume
