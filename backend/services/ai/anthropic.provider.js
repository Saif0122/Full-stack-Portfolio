import AIProvider from './ai.provider.js';

export default class AnthropicProvider extends AIProvider {
  constructor(apiKey) {
    super(apiKey);
    this.name = 'Anthropic';
  }

  async generateText(prompt, options = {}) {
    console.log(`[Anthropic Mock] Generating text for prompt: ${prompt.substring(0, 20)}...`);
    return {
      text: `Mock Anthropic Response to: "${prompt.substring(0, 50)}..."`,
      usage: {
        promptTokens: 12,
        completionTokens: 28,
        totalTokens: 40
      },
      model: options.model || 'claude-3-5-sonnet'
    };
  }

  async generateStructuredData(prompt, options = {}) {
    console.log(`[Anthropic Mock] Generating JSON...`);
    return {
      data: { status: 'mock_success', provider: 'Anthropic' },
      usage: { totalTokens: 45 }
    };
  }

  async streamResponse(prompt, options = {}, onChunk) {
    const chunks = ['Mock', 'Anthropic', 'Streaming', 'Response'];
    for (const chunk of chunks) {
      onChunk(chunk + ' ');
      await new Promise(r => setTimeout(r, 100));
    }
  }
}
