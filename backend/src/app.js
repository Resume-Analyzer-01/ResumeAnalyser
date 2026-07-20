import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

import swaggerDocs from './docs/swagger.js'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorMiddleware.js'
import passport from './config/passport.js'

const app = express()

// Content Security Policy disabled partially in development to allow Swagger UI styling
app.use(helmet({
  contentSecurityPolicy: false
}))

// Configure CORS for client access
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))

// HTTP Request logging
app.use(morgan('dev'))

// Compress response payloads
app.use(compression())

// Body Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())

// Rate limiting to protect API resources
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 200,
  message: { success: false, message: 'Too many requests from this IP. Please try again later.' }
})
app.use('/api', limiter)

// Static directories serving
app.use('/storage/uploads', express.static(path.resolve(process.cwd(), 'storage', 'uploads')))
app.use('/storage/templates', express.static(path.resolve(process.cwd(), 'storage', 'templates')))

// Serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Register REST Routes
app.use('/api', routes)

// Server Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ResumeAI REST backend service is healthy.',
    timestamp: new Date().toISOString()
  })
})

// Centralized error boundary
app.use(errorHandler)

export default app
