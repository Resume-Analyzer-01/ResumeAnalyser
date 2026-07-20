import config from '../../config/env.js'
import MockAIProvider from './mockProvider.js'
import OpenAIProvider from './openAIProvider.js'
import GeminiProvider from './geminiProvider.js'
import logger from '../../config/logger.js'

export const getAIProvider = () => {
  const providerType = (config.ai.provider || 'mock').toLowerCase()

  switch (providerType) {
    case 'openai':
      return new OpenAIProvider()
    case 'gemini':
      return new GeminiProvider()
    case 'mock':
    default:
      logger.info('Initializing MockAIProvider for resume analysis.')
      return new MockAIProvider()
  }
}
