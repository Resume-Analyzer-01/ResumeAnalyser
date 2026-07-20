import mongoose from 'mongoose'
import config from './env.js'
import logger from './logger.js'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri)
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`)
    // In demo/dev mode, don't exit process if mongo is missing, just warning
    logger.warn('Proceeding with MongoDB offline simulation (repository layer fallback logic).')
  }
}
