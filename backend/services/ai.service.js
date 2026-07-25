import aiRepository from '../repositories/ai.repository.js';
import AIFactory from './ai/ai.factory.js';

class AIService {
  async getSettings() {
    return aiRepository.getSettings();
  }

  async updateSettings(data) {
    return aiRepository.updateSettings(data);
  }

  async getPrompts(query) {
    return aiRepository.getPrompts(query);
  }

  async generateContent(userId, module, prompt, options = {}) {
    const settings = await aiRepository.getSettings();
    const provider = AIFactory.getProvider(settings.activeProvider);

    const response = await provider.generateText(prompt, {
      model: settings.defaultModel,
      maxTokens: settings.maxTokens,
      temperature: settings.temperature,
      ...options
    });

    await aiRepository.logHistory({
      user: userId,
      module,
      prompt,
      response: response.text,
      provider: settings.activeProvider,
      tokensUsed: response.usage?.totalTokens || 0
    });

    return response;
  }
}

export default new AIService();
