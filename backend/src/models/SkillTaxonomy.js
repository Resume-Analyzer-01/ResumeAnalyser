import mongoose from 'mongoose'

const skillTaxonomySchema = new mongoose.Schema(
  {
    skillId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      default: 'Backend'
    },
    subCategory: {
      type: String,
      default: 'Frameworks'
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate'
    },
    dependencies: [
      {
        skillId: { type: String, required: true },
        type: { type: String, enum: ['prerequisite', 'complements', 'advanced'], default: 'complements' },
        importance: { type: String, enum: ['required', 'recommended'], default: 'recommended' }
      }
    ],
    demandScore: {
      type: Number,
      default: 85
    },
    jobsCount: {
      type: Number,
      default: 120
    },
    salaryBoost: {
      type: Number,
      default: 15 // % salary increase
    },
    trendDirection: {
      type: String,
      enum: ['up', 'down', 'stable'],
      default: 'up'
    },
    averageSalary: {
      type: Number,
      default: 14 // LPA
    },
    sampleProjects: [
      {
        title: String,
        description: String,
        skills: [String]
      }
    ]
  },
  { timestamps: true }
)

export const SkillTaxonomy = mongoose.model('SkillTaxonomy', skillTaxonomySchema)
