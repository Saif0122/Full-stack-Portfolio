import AIPrompt from '../models/ai-prompt.model.js';
import AIWorkflow from '../models/ai-workflow.model.js';
import AISettings from '../models/ai-settings.model.js';
import AIHistory from '../models/ai-history.model.js';
import AITemplate from '../models/ai-template.model.js';

class AIRepository {
  async getSettings() {
    let settings = await AISettings.findOne();
    if (!settings) {
      settings = await AISettings.create({ activeProvider: 'OpenAI' });
    }
    return settings;
  }

  async updateSettings(data) {
    return AISettings.findOneAndUpdate({}, data, { new: true, upsert: true });
  }

  async getPrompts(query = {}) {
    return AIPrompt.find(query).sort({ createdAt: -1 });
  }

  async createPrompt(data) {
    return AIPrompt.create(data);
  }

  async getWorkflows(query = {}) {
    return AIWorkflow.find(query).sort({ createdAt: -1 });
  }

  async logHistory(data) {
    return AIHistory.create(data);
  }
}

export default new AIRepository();
