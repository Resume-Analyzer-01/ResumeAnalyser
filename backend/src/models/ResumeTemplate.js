import mongoose from 'mongoose'

const resumeTemplateSchema = new mongoose.Schema(
  {
    templateId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    colors: {
      primary: { type: String, default: '#1a472a' },
      accent: { type: String, default: '#4ade80' },
      text: { type: String, default: '#1f2937' },
      lightText: { type: String, default: '#6b7280' },
      background: { type: String, default: '#ffffff' },
      sectionBorder: { type: String, default: '#e5e7eb' }
    },
    fonts: {
      heading: { type: String, default: 'Poppins' },
      body: { type: String, default: 'Inter' }
    },
    templateData: { type: Object, required: true },
    isPublic: { type: Boolean, default: true },
    downloads: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export const ResumeTemplate = mongoose.model('ResumeTemplate', resumeTemplateSchema)
export default ResumeTemplate
