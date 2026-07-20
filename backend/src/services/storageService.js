import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import config from '../config/env.js'
import logger from '../config/logger.js'

// Configure Cloudinary if keys exist
const useCloudinary = !!(
  config.cloudinary.cloudName &&
  config.cloudinary.apiKey &&
  config.cloudinary.apiSecret
)

if (useCloudinary) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
  })
  logger.info('Cloudinary client loaded.')
} else {
  logger.info('Storage falling back to local file system (storage/uploads/).')
}

/**
 * Uploads a file buffer and returns a URL.
 * @param {object} file - Express Multer file object.
 * @returns {Promise<string>} Url of the stored file.
 */
export const uploadFile = async (file) => {
  if (useCloudinary) {
    try {
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'raw', folder: 'resumes', public_id: `${Date.now()}-${file.originalname}` },
          (error, result) => {
            if (error) reject(error)
            else resolve(result.secure_url)
          }
        )
        stream.end(file.buffer)
      })
    } catch (error) {
      logger.error(`Cloudinary upload failed: ${error.message}. Saving to disk instead.`)
    }
  }

  // Local Disk Storage
  const uploadDir = path.resolve(process.cwd(), 'storage', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`
  const filePath = path.join(uploadDir, filename)

  await fs.promises.writeFile(filePath, file.buffer)
  return `http://localhost:5000/storage/uploads/${filename}`
}
