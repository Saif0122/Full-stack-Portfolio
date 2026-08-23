import { GeminiProvider } from './gemini.provider.js';

class AiProviderFactory {
  static getProvider(providerName = process.env.AI_PROVIDER || 'gemini') {
    switch (providerName.toLowerCase()) {
      case 'gemini':
        return new GeminiProvider();
      case 'openai':
      case 'anthropic':
      case 'local':
      default:
        // Future extensions will go here. Fallback to gemini for now.
        if (providerName.toLowerCase() !== 'gemini') {
          console.warn(`[AI Provider] ${providerName} is not yet implemented. Falling back to Gemini.`);
        }
        return new GeminiProvider();
    }
  }
}

export default AiProviderFactory;
