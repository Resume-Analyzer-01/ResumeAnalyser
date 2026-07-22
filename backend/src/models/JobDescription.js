import mongoose from 'mongoose'

const jobDescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    jobId: {
      type: String,
      required: true,
      unique: true
    },
    jobTitle: {
      type: String,
      required: true,
      default: 'Software Engineer'
    },
    company: {
      type: String,
      default: 'Target Company'
    },
    location: {
      type: String,
      default: 'Remote / India'
    },
    originalText: {
      type: String,
      required: true
    },
    salaryRange: {
      min: { type: Number, default: 8 },
      max: { type: Number, default: 22 },
      currency: { type: String, default: 'INR' }
    },
    requiredSkills: [
      {
        skill: { type: String, required: true },
        proficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
        importance: { type: String, enum: ['critical', 'important', 'nice-to-have'], default: 'important' },
        yearsRequired: { type: Number, default: 2 }
      }
    ],
    niceToHaveSkills: [
      {
        skill: { type: String, required: true },
        importance: { type: String, default: 'nice-to-have' }
      }
    ],
    experienceLevel: {
      type: String,
      enum: ['fresher', 'junior', 'mid', 'senior'],
      default: 'mid'
    },
    yearsRequired: {
      type: Number,
      default: 3
    },
    responsibilities: [{ type: String }],
    summary: { type: String }
  },
  { timestamps: true }
)

export const JobDescription = mongoose.model('JobDescription', jobDescriptionSchema)
