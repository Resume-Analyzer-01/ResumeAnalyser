import app from './app.js'
import config from './config/env.js'
import { connectDB } from './config/db.js'
import logger from './config/logger.js'

const startServer = async () => {
  // Connect MongoDB database
  await connectDB()

  // Listen on configured port
  const server = app.listen(config.port, () => {
    logger.info(`ResumeAI server listening on port ${config.port}`)
    logger.info(`API Documentation active at http://localhost:${config.port}/api-docs`)
    logger.info(`Health check active at http://localhost:${config.port}/health`)
  })

  // Graceful shutdowns
  const shutdown = (signal) => {
    logger.info(`[SHUTDOWN] Received ${signal}. Closing server listener...`)
    server.close(() => {
      logger.info('HTTP server listener closed. Node process exiting.')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

startServer()
