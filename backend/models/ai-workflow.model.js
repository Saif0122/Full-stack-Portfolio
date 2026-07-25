import mongoose from 'mongoose';

const aiWorkflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  trigger: {
    type: String, // e.g., 'Publish Blog', 'Generate SEO'
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft',
  },
  steps: [{
    stepOrder: Number,
    action: String,
    promptTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AIPrompt',
    },
    config: {
      type: Map,
      of: String
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const AIWorkflow = mongoose.model('AIWorkflow', aiWorkflowSchema);
export default AIWorkflow;
