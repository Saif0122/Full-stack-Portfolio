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
  tokensUsed: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const AIHistory = mongoose.model('AIHistory', aiHistorySchema);
export default AIHistory;
