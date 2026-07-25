import OpenAIProvider from './openai.provider.js';
import GeminiProvider from './gemini.provider.js';
import AnthropicProvider from './anthropic.provider.js';

class AIFactory {
  /**
   * Initialize the AI Provider based on settings
   * @param {String} providerName 'OpenAI', 'Gemini', 'Anthropic', etc.
   */
  static getProvider(providerName) {
    switch (providerName) {
      case 'OpenAI':
        return new OpenAIProvider(process.env.OPENAI_API_KEY || 'mock-key');
      case 'Gemini':
        return new GeminiProvider(process.env.GEMINI_API_KEY || 'mock-key');
      case 'Anthropic':
        return new AnthropicProvider(process.env.ANTHROPIC_API_KEY || 'mock-key');
      default:
        // Default to OpenAI mock if unknown
        return new OpenAIProvider('mock-key');
    }
  }
}

export default AIFactory;
