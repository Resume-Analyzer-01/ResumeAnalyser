import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    const err = new Error('Upload rejected: File must be a PDF or DOCX document.')
    err.statusCode = 400
    cb(err, false)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limit
  }
})
export default upload
