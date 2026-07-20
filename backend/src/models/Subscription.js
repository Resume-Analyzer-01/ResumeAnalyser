import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
    billingCycle: { type: String, enum: ['monthly', 'yearly', 'lifetime'], default: 'monthly' },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null }
  },
  { timestamps: true }
)

export const Subscription = mongoose.model('Subscription', subscriptionSchema)
export default Subscription
