import mongoose from 'mongoose';

const promptExperimentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  controlPromptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AIPrompt',
    required: true
  },
  variantPromptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AIPrompt',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'running', 'completed', 'stopped'],
    default: 'draft'
  },
  targetModule: {
    type: String, // 'Portfolio', 'Product', 'Blog'
    required: true
  },
  splitRatio: {
    type: Number,
    default: 50 // 50% traffic to variant
  },
  metrics: {
    control: {
      invocations: { type: Number, default: 0 },
      accepted: { type: Number, default: 0 },
      avgConfidence: { type: Number, default: 0 },
      avgCost: { type: Number, default: 0 },
    },
    variant: {
      invocations: { type: Number, default: 0 },
      accepted: { type: Number, default: 0 },
      avgConfidence: { type: Number, default: 0 },
      avgCost: { type: Number, default: 0 },
    }
  },
  winnerPromptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AIPrompt'
  },
  startDate: Date,
  endDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const PromptExperiment = mongoose.model('PromptExperiment', promptExperimentSchema);

export default PromptExperiment;
