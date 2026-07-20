import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { analyzeResume } from '../services/aiAnalysis.js'

const router = express.Router();

// Multer configuration – store uploads in a temporary folder
const upload = multer({
  dest: path.join(process.cwd(), 'tmp'),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
});

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { path: filePath, originalname } = req.file;
    const fileBuffer = await fs.readFile(filePath);
    // Call Gemini AI analysis service
    const analysis = await analyzeResume(fileBuffer);
    // Clean up temporary file
    await fs.unlink(filePath);
    res.json({ filename: originalname, ...analysis });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message || 'Failed to analyze resume' });
  }
});

export default router;
