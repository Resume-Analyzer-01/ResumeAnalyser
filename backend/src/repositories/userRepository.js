import mongoose from 'mongoose'
import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'

const mockUsers = [
  {
    _id: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b333'),
    name: 'Riley Carter',
    email: 'you@example.com',
    passwordHash: '$2a$10$7Z01ySjT9d/dswp/t4wXGeZ.xX0qA7gCsw7P.E41w6jLcrN2v9YtW', // 'Password123!'
    role: 'user',
    emailVerified: true,
    phone: '+1 555-0199',
    linkedin: 'linkedin.com/in/rileycarter',
    github: 'github.com/rileycarter',
    portfolio: 'rileycarter.dev',
    preferences: { theme: 'system', language: 'en' },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ecb863a6a12b48d1b444'),
    name: 'System Administrator',
    email: 'admin@resume-analyzer.local',
    passwordHash: '$2a$10$7Z01ySjT9d/dswp/t4wXGeZ.xX0qA7gCsw7P.E41w6jLcrN2v9YtW', // 'Password123!'
    role: 'admin',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const createUser = async (userData) => {
  const passwordHash = await bcrypt.hash(userData.password, 10)
  const isConnected = mongoose.connection.readyState === 1

  if (isConnected) {
    const user = new User({ ...userData, passwordHash })
    return await user.save()
  }

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    name: userData.name,
    email: userData.email,
    passwordHash,
    role: userData.role || 'user',
    emailVerified: false,
    preferences: { theme: 'system', language: 'en' },
    createdAt: new Date(),
    updatedAt: new Date()
  }
  mockUsers.push(mockUser)
  return mockUser
}

export const findUserByEmail = async (email) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await User.findOne({ email })
  }
  const u = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (u) {
    // Add comparePassword helper dynamically to simulated user
    return {
      ...u,
      comparePassword: async (pwd) => bcrypt.compare(pwd, u.passwordHash)
    }
  }
  return null
}

export const findUserById = async (id) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await User.findById(id)
  }
  return mockUsers.find((u) => String(u._id) === String(id)) || null
}

export const updateUserById = async (id, updateData) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await User.findByIdAndUpdate(id, updateData, { new: true })
  }
  const index = mockUsers.findIndex((u) => String(u._id) === String(id))
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...updateData, updatedAt: new Date() }
    return mockUsers[index]
  }
  return null
}

export const getAllUsers = async () => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await User.find({}).select('-passwordHash')
  }
  return mockUsers.map(({ passwordHash, ...rest }) => rest)
}

export const deleteUserById = async (id) => {
  const isConnected = mongoose.connection.readyState === 1
  if (isConnected) {
    return await User.findByIdAndDelete(id)
  }
  const index = mockUsers.findIndex((u) => String(u._id) === String(id))
  if (index !== -1) {
    return mockUsers.splice(index, 1)[0]
  }
  return null
}
