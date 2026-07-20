export class AIProvider {
  /**
   * Analyze the extracted text from a resume.
   * @param {string} resumeText - The extracted raw text of the resume.
   * @returns {Promise<object>} - Structured analysis result.
   */
  async analyze(resumeText) {
    throw new Error('Method "analyze" must be implemented by subclasses.')
  }
}
export default AIProvider
