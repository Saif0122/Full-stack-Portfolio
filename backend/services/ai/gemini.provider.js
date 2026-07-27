import AIProvider from './ai.provider.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default class GeminiProvider extends AIProvider {
  constructor(apiKey) {
    super(apiKey);
    this.name = 'Gemini';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateText(prompt, options = {}) {
    const model = this.genAI.getGenerativeModel({ model: options.model || 'gemini-1.5-pro' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: options.maxTokens,
        temperature: options.temperature,
      }
    });
    
    const response = await result.response;
    return {
      text: response.text(),
      usage: {
        totalTokens: response.usageMetadata?.totalTokenCount || 0,
        promptTokens: response.usageMetadata?.promptTokenCount || 0,
        completionTokens: response.usageMetadata?.candidatesTokenCount || 0
      },
      model: options.model || 'gemini-1.5-pro'
    };
  }

  async generateStructuredData(prompt, options = {}) {
    const model = this.genAI.getGenerativeModel({ model: options.model || 'gemini-1.5-pro' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: options.maxTokens,
        temperature: options.temperature,
      }
    });

    const response = await result.response;
    return {
      data: JSON.parse(response.text()),
      usage: { totalTokens: response.usageMetadata?.totalTokenCount || 0 }
    };
  }

  async streamResponse(prompt, options = {}, onChunk) {
    const model = this.genAI.getGenerativeModel({ model: options.model || 'gemini-1.5-pro' });
    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: options.maxTokens,
        temperature: options.temperature,
      }
    });

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      onChunk(chunkText);
    }
  }
}
