/**
 * Abstract Base Class for AI Providers
 */
export default class AIProvider {
  constructor(apiKey) {
    if (new.target === AIProvider) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.apiKey = apiKey;
  }

  /**
   * Generate a text response based on a prompt
   * @param {String} prompt 
   * @param {Object} options (e.g. temperature, maxTokens)
   */
  async generateText(prompt, options = {}) {
    throw new Error('Method generateText() must be implemented');
  }

  /**
   * Generate structured JSON data
   * @param {String} prompt 
   * @param {Object} options 
   */
  async generateStructuredData(prompt, options = {}) {
    throw new Error('Method generateStructuredData() must be implemented');
  }

  /**
   * Stream a response back to the client
   * @param {String} prompt 
   * @param {Object} options 
   * @param {Function} onChunk Callback when a chunk arrives
   */
  async streamResponse(prompt, options = {}, onChunk) {
    throw new Error('Method streamResponse() must be implemented');
  }
}
