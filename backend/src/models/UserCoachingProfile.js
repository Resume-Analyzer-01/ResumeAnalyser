import mongoose from 'mongoose'

const userCoachingProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    totalVersions: {
      type: Number,
      default: 1
    },
    currentScore: {
      type: Number,
      default: 75
    },
    highestScore: {
      type: Number,
      default: 75
    },
    scoreHistory: [
      {
        version: Number,
        score: Number,
        date: { type: Date, default: Date.now },
        improvement: Number
      }
    ],
    coachingPlan: {
      currentPhase: { type: String, default: 'skills-gap' },
      nextAction: { type: String, default: 'Add cloud architecture metrics to your experience section.' },
      estimatedScoreIfCompleted: { type: Number, default: 85 }
    },
    achievements: [
      {
        id: String,
        name: String,
        description: String,
        unlockedAt: { type: Date, default: Date.now }
      }
    ],
    streaks: {
      currentStreak: { type: Number, default: 3 },
      longestStreak: { type: Number, default: 5 },
      lastImprovement: { type: Date, default: Date.now }
    }
  },
  { timestamps: true }
)

export const UserCoachingProfile = mongoose.model('UserCoachingProfile', userCoachingProfileSchema)
