import mongoose from 'mongoose';

const aiUsageLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tokensUsed: {
    type: Number,
    required: true,
  },
  action: {
    type: String,
    required: true, // e.g., 'Generate Code', 'Write Blog Draft'
  },
  provider: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

// Index for tracking daily/monthly usage per user
aiUsageLogSchema.index({ user: 1, date: -1 });

const AIUsageLog = mongoose.model('AIUsageLog', aiUsageLogSchema);
export default AIUsageLog;
