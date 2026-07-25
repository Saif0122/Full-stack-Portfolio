import mongoose from 'mongoose';

const aiSettingsSchema = new mongoose.Schema({
  activeProvider: {
    type: String,
    enum: ['OpenAI', 'Gemini', 'Anthropic', 'OpenRouter', 'Local'],
    default: 'OpenAI',
  },
  defaultModel: {
    type: String,
    default: 'gpt-4o',
  },
  maxTokens: {
    type: Number,
    default: 2000,
  },
  temperature: {
    type: Number,
    default: 0.7,
  },
  enabledModules: [{
    type: String,
    enum: ['Portfolio', 'Blog', 'Store', 'Developer', 'Automations'],
  }],
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const AISettings = mongoose.model('AISettings', aiSettingsSchema);
export default AISettings;
