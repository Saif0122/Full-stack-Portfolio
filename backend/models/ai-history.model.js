import mongoose from 'mongoose';

const aiHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  module: {
    type: String, // e.g., 'Portfolio', 'Blog', 'Developer'
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
  },
  inputTokens: {
    type: Number,
    default: 0,
  },
  outputTokens: {
    type: Number,
    default: 0,
  },
  totalTokens: {
    type: Number,
    default: 0,
  },
  isEstimated: {
    type: Boolean,
    default: false,
  },
  cost: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'edited'],
    default: 'pending'
  },
  originalSuggestion: {
    type: mongoose.Schema.Types.Mixed, // Can be text or JSON
  },
  finalApplied: {
    type: mongoose.Schema.Types.Mixed,
  },
  confidenceScore: {
    type: Number
  },
  explanation: {
    type: String
  },
  promptVersion: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

const AIHistory = mongoose.model('AIHistory', aiHistorySchema);
export default AIHistory;
