import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider {
  constructor() {
    this.ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  }

  /**
   * Generates standard text response
   */
  async generateText(prompt, systemInstruction = '') {
    try {
      const model = this.ai.getGenerativeModel({ 
        model: this.modelName,
        systemInstruction: systemInstruction || undefined
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return {
        content: response.text(),
        usage: response.usageMetadata ? {
          inputTokens: response.usageMetadata.promptTokenCount,
          outputTokens: response.usageMetadata.candidatesTokenCount,
          totalTokens: response.usageMetadata.totalTokenCount,
        } : null
      };
    } catch (error) {
      console.error('[GeminiProvider] generateText Error:', error);
      throw new Error('Failed to generate text from Gemini.');
    }
  }

  /**
   * Generates JSON response using application/json responseMimeType
   */
  async generateJson(prompt, schema = null, systemInstruction = '') {
    try {
      const config = {
        responseMimeType: 'application/json',
      };
      if (schema) {
        config.responseSchema = schema;
      }

      const model = this.ai.getGenerativeModel({ 
        model: this.modelName,
        systemInstruction: systemInstruction || undefined
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: config,
      });
      
      const response = await result.response;
      const text = response.text();
      return {
        content: JSON.parse(text),
        usage: response.usageMetadata ? {
          inputTokens: response.usageMetadata.promptTokenCount,
          outputTokens: response.usageMetadata.candidatesTokenCount,
          totalTokens: response.usageMetadata.totalTokenCount,
        } : null
      };
    } catch (error) {
      console.error('[GeminiProvider] generateJson Error:', error);
      throw new Error('Failed to generate JSON from Gemini.');
    }
  }

  /**
   * Helper to process image with Vision capabilities if buffer is provided
   */
  async _generateWithVision(prompt, imageBuffer, mimeType, schema = null) {
    try {
      const config = {
        responseMimeType: schema ? 'application/json' : 'text/plain',
      };
      if (schema) config.responseSchema = schema;

      const model = this.ai.getGenerativeModel({ model: this.modelName });
      
      const parts = [{ text: prompt }];
      if (imageBuffer && mimeType) {
        parts.push({
          inlineData: {
            data: imageBuffer.toString('base64'),
            mimeType: mimeType
          }
        });
      }

      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig: config,
      });

      const response = await result.response;
      return schema ? JSON.parse(response.text()) : response.text();
    } catch (error) {
      console.error('[GeminiProvider] Vision Error:', error);
      // Fallback to text only if vision fails or model doesn't support it
      if (schema) return this.generateJson(prompt, schema);
      return this.generateText(prompt);
    }
  }

  async generateImageMetadata(imageBuffer, mimeType, context) {
    const prompt = `Analyze this image in the context of: ${context}. Return JSON with suggested title, description, and keywords.`;
    return this._generateWithVision(prompt, imageBuffer, mimeType, {
      type: 'object',
      properties: { title: { type: 'string' }, description: { type: 'string' }, keywords: { type: 'array', items: { type: 'string' } } }
    });
  }

  async generateAltText(imageBuffer, mimeType, context) {
    const prompt = `Write a concise, accessible alt text for this image. Context: ${context}`;
    return this._generateWithVision(prompt, imageBuffer, mimeType);
  }

  async generateCaption(imageBuffer, mimeType, context) {
    const prompt = `Write an engaging caption for this image. Context: ${context}`;
    return this._generateWithVision(prompt, imageBuffer, mimeType);
  }

  async generateFilename(imageBuffer, mimeType, context) {
    const prompt = `Suggest an SEO-friendly filename for this image (lowercase, hyphens only). Context: ${context}`;
    return this._generateWithVision(prompt, imageBuffer, mimeType);
  }

  async generateAccessibilitySuggestions(imageBuffer, mimeType, context) {
    const prompt = `Analyze this image for accessibility issues (contrast, decorative vs informative). Context: ${context}. Return JSON.`;
    return this._generateWithVision(prompt, imageBuffer, mimeType, {
      type: 'object',
      properties: { isDecorative: { type: 'boolean' }, warnings: { type: 'array', items: { type: 'string' } }, suggestion: { type: 'string' } }
    });
  }
}
