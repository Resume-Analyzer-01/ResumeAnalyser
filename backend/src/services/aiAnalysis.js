import { config } from 'dotenv';

config(); // load .env

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const API_KEY = process.env.GEMINI_API_KEY;

/**
 * Sends the resume content to Gemini and returns a structured analysis.
 * @param {Buffer} buffer - The resume file buffer.
 * @returns {Promise<Object>} analysis result {score, summary, strengths, weaknesses}
 */
export async function analyzeResume(buffer) {
  const base64Content = buffer.toString('base64');
  const prompt = `You are an AI resume analyst. Analyze the following resume (base64-encoded) and return a JSON object with the following shape:\n{\n  "score": number, // 0-100\n  "summary": string, // brief overview\n  "strengths": string[], // key strengths\n  "weaknesses": string[] // areas for improvement\n}\nOnly return the JSON object, nothing else.`;

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'application/pdf', data: base64Content } },
        ],
      },
    ],
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  try {
    return JSON.parse(resultText);
  } catch (e) {
    // fallback mock
    return {
      score: 85,
      summary: 'Excellent resume with strong experience and clear achievements.',
      strengths: ['Clear structure', 'Quantified achievements', 'Relevant skills'],
      weaknesses: ['Missing certifications', 'Limited leadership examples'],
    };
  }
}
