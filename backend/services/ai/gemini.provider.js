import AIProvider from './ai.provider.js';

export default class GeminiProvider extends AIProvider {
  constructor(apiKey) {
    super(apiKey);
    this.name = 'Gemini';
  }

  async generateText(prompt, options = {}) {
    console.log(`[Gemini Mock] Generating text for prompt: ${prompt.substring(0, 20)}...`);
    return {
      text: `Mock Gemini Response to: "${prompt.substring(0, 50)}..."`,
      usage: {
        promptTokens: 15,
        completionTokens: 30,
        totalTokens: 45
      },
      model: options.model || 'gemini-1.5-pro'
    };
  }

  async generateStructuredData(prompt, options = {}) {
    console.log(`[Gemini Mock] Generating JSON...`);
    return {
      data: { status: 'mock_success', provider: 'Gemini' },
      usage: { totalTokens: 50 }
    };
  }

  async streamResponse(prompt, options = {}, onChunk) {
    const chunks = ['Mock', 'Gemini', 'Streaming', 'Response'];
    for (const chunk of chunks) {
      onChunk(chunk + ' ');
      await new Promise(r => setTimeout(r, 100));
    }
  }
}
