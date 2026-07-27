import AIProvider from './ai.provider.js';
import Anthropic from '@anthropic-ai/sdk';

export default class AnthropicProvider extends AIProvider {
  constructor(apiKey) {
    super(apiKey);
    this.name = 'Anthropic';
    this.anthropic = new Anthropic({ apiKey: apiKey });
  }

  async generateText(prompt, options = {}) {
    const response = await this.anthropic.messages.create({
      model: options.model || 'claude-3-5-sonnet-20240620',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature,
    });

    return {
      text: response.content[0].text,
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens
      },
      model: response.model
    };
  }

  async generateStructuredData(prompt, options = {}) {
    const response = await this.anthropic.messages.create({
      model: options.model || 'claude-3-5-sonnet-20240620',
      messages: [{ role: 'user', content: prompt + '\n\nPlease output valid JSON only without markdown formatting.' }],
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature,
    });

    // Strip markdown JSON wrapping if present
    let text = response.content[0].text.trim();
    if (text.startsWith('```json')) text = text.replace(/^```json/, '');
    if (text.startsWith('```')) text = text.replace(/^```/, '');
    if (text.endsWith('```')) text = text.replace(/```$/, '');
    
    return {
      data: JSON.parse(text.trim()),
      usage: { totalTokens: response.usage.input_tokens + response.usage.output_tokens }
    };
  }

  async streamResponse(prompt, options = {}, onChunk) {
    const stream = await this.anthropic.messages.create({
      model: options.model || 'claude-3-5-sonnet-20240620',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature,
      stream: true,
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.text) {
        onChunk(chunk.delta.text);
      }
    }
  }
}
