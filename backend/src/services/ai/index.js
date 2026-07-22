import config from '../../config/env.js'
import MockAIProvider from './mockProvider.js'
import OpenAIProvider from './openAIProvider.js'
import GeminiProvider from './geminiProvider.js'
import logger from '../../config/logger.js'

class ResilientAIProvider {
  constructor(primaryProvider, fallbackProvider, providerType) {
    this.primaryProvider = primaryProvider
    this.fallbackProvider = fallbackProvider
    this.providerType = providerType
  }

  async analyze(resumeText) {
    try {
      return await this.primaryProvider.analyze(resumeText)
    } catch (error) {
      logger.warn(`Falling back to mock AI analysis after ${this.providerType} failure: ${error.message}`)
      return this.fallbackProvider.analyze(resumeText)
    }
  }

  async optimize(resumeText) {
    if (typeof this.primaryProvider.optimize !== 'function') {
      return this.fallbackProvider.optimize(resumeText)
    }

    try {
      return await this.primaryProvider.optimize(resumeText)
    } catch (error) {
      logger.warn(`Falling back to mock AI optimization after ${this.providerType} failure: ${error.message}`)
      return this.fallbackProvider.optimize(resumeText)
    }
  }
}

export const getAIProvider = () => {
  const providerType = (config.ai.provider || 'mock').toLowerCase()
  const fallbackProvider = new MockAIProvider()

  switch (providerType) {
    case 'openai':
      return new ResilientAIProvider(new OpenAIProvider(), fallbackProvider, providerType)
    case 'gemini':
      return new ResilientAIProvider(new GeminiProvider(), fallbackProvider, providerType)
    case 'mock':
    default:
      logger.info('Initializing MockAIProvider for resume analysis.')
      return fallbackProvider
  }
}
