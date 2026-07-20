import mongoose from 'mongoose'
import { Resume } from '../models/Resume.js'

const mockResumes = [
  {
    _id: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b111'),
    userId: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b333'),
    originalFileName: 'technical-resume-v2.pdf',
    storageUrl: 'http://localhost:5000/storage/uploads/1721020000000-technical-resume-v2.pdf',
    mimeType: 'application/pdf',
    fileSize: 102450,
    uploadDate: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
    version: 1,
    status: 'analyzed',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 2)
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b222'),
    userId: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b333'),
    originalFileName: 'riley-carter-marketing.docx',
    storageUrl: 'http://localhost:5000/storage/uploads/1721021000000-riley-carter-marketing.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileSize: 84500,
    uploadDate: new Date(Date.now() - 3600000), // 1 hour ago
    version: 1,
    status: 'analyzed',
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000)
  }
]

export const createResume = async (resumeData) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    const resume = new Resume(resumeData)
    return await resume.save()
  }

  const mockResume = {
    _id: new mongoose.Types.ObjectId(),
    ...resumeData,
    uploadDate: new Date(),
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  mockResumes.push(mockResume)
  return mockResume
}

export const findResumeById = async (id) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await Resume.findById(id)
  }
  return mockResumes.find((r) => String(r._id) === String(id)) || null
}

export const getResumesByUserId = async (userId, query = {}, options = {}) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    const { page = 1, limit = 5, sort = 'createdAt', order = 'desc' } = options
    const skip = (page - 1) * limit
    const sortOrder = order === 'desc' ? -1 : 1

    const filter = { userId, ...query }

    const count = await Resume.countDocuments(filter)
    const items = await Resume.find(filter)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limit)

    return { items, count }
  }

  // Local mock store filter
  let items = mockResumes.filter((r) => String(r.userId) === String(userId))
  
  if (query.originalFileName) {
    const term = query.originalFileName.toLowerCase()
    items = items.filter((r) => r.originalFileName.toLowerCase().includes(term))
  }

  const count = items.length
  
  // Sort
  const sortKey = options.sort || 'createdAt'
  const sortOrder = options.order === 'desc' ? -1 : 1
  items.sort((a, b) => {
    if (sortOrder === -1) {
      return String(b[sortKey]).localeCompare(String(a[sortKey]))
    }
    return String(a[sortKey]).localeCompare(String(b[sortKey]))
  })

  // Paginate
  const page = parseInt(options.page || '1', 10)
  const limit = parseInt(options.limit || '5', 10)
  const skip = (page - 1) * limit
  const pagedItems = items.slice(skip, skip + limit)

  return { items: pagedItems, count }
}

export const deleteResumeById = async (id) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await Resume.findByIdAndDelete(id)
  }
  const index = mockResumes.findIndex((r) => String(r._id) === String(id))
  if (index !== -1) {
    return mockResumes.splice(index, 1)[0]
  }
  return null
}
