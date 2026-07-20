import logger from '../config/logger.js'

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  // Log error via winston
  logger.error(`[ERROR] ${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  if (err.stack && process.env.NODE_ENV !== 'production') {
    logger.debug(err.stack)
  }

  // Mongoose invalid object ID format
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Resource not found. Invalid ID format.'
    })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(409).json({
      success: false,
      message: `Conflict: Duplicate value entered for field '${field}'.`
    })
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({
      success: false,
      message: 'Schema validation failed.',
      errors
    })
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || []
  })
}
export default errorHandler
