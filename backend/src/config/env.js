import dotenv from 'dotenv'
import path from 'path'

// Load .env from backend directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-analyzer',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access_secret_key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_key',
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d'
  },
  email: {
    host: process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '2525', 10),
    user: process.env.SMTP_USER || process.env.EMAIL_USER || '',
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || '',
    from: process.env.SMTP_FROM || process.env.EMAIL_FROM || 'no-reply@resume-analyzer.local'
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || ''
  },
  ai: {
    provider: process.env.AI_PROVIDER || 'mock',
    openaiKey: process.env.OPENAI_API_KEY || '',
    geminiKey: process.env.GEMINI_API_KEY || ''
  },
  redisUrl: process.env.REDIS_URL || ''
}
export default config
