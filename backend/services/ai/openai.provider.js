import AIProvider from './ai.provider.js';
import OpenAI from 'openai';

export default class OpenAIProvider extends AIProvider {
  constructor(apiKey) {
    super(apiKey);
    this.name = 'OpenAI';
    this.openai = new OpenAI({ apiKey: apiKey });
  }

  async generateText(prompt, options = {}) {
    const response = await this.openai.chat.completions.create({
      model: options.model || 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.maxTokens,
      temperature: options.temperature,
    });

    return {
      text: response.choices[0].message.content,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens
      },
      model: response.model
    };
  }

  async generateStructuredData(prompt, options = {}) {
    const response = await this.openai.chat.completions.create({
      model: options.model || 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: options.maxTokens,
      temperature: options.temperature,
    });

    return {
      data: JSON.parse(response.choices[0].message.content),
      usage: { totalTokens: response.usage.total_tokens }
    };
  }

  async streamResponse(prompt, options = {}, onChunk) {
    const stream = await this.openai.chat.completions.create({
      model: options.model || 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      max_tokens: options.maxTokens,
      temperature: options.temperature,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  }
}
