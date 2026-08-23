import mongoose from 'mongoose';

const aiSettingSchema = new mongoose.Schema({
  activeProvider: {
    type: String,
    enum: ['gemini', 'openai', 'anthropic'],
    default: 'gemini',
    required: true
  },
  activeModel: {
    type: String,
    default: 'gemini-1.5-flash',
    required: true
  },
  contextWindow: {
    type: Number,
    default: 1048576, // Gemini 1.5 Flash default context
  },
  maxOutputTokens: {
    type: Number,
    default: 8192,
  },
  temperature: {
    type: Number,
    default: 0.7,
    min: 0,
    max: 2,
  },
  topP: {
    type: Number,
    default: 0.95,
  },
  topK: {
    type: Number,
    default: 64,
  },
  safetySettings: {
    type: Map,
    of: String,
    default: {
      HARM_CATEGORY_HARASSMENT: 'BLOCK_MEDIUM_AND_ABOVE',
      HARM_CATEGORY_HATE_SPEECH: 'BLOCK_MEDIUM_AND_ABOVE',
      HARM_CATEGORY_SEXUALLY_EXPLICIT: 'BLOCK_MEDIUM_AND_ABOVE',
      HARM_CATEGORY_DANGEROUS_CONTENT: 'BLOCK_MEDIUM_AND_ABOVE',
    }
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Ensure only one global setting document exists
const AiSetting = mongoose.model('AiSetting', aiSettingSchema);

export default AiSetting;
