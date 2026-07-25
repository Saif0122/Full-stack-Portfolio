import mongoose from 'mongoose';

const aiTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    enum: ['Portfolio', 'Blog', 'Store', 'Developer', 'General'],
    required: true,
  },
  systemPrompt: {
    type: String,
    required: true,
  },
  userPromptTemplate: {
    type: String,
    required: true,
  },
  parameters: [{
    name: String,
    type: { type: String }, // e.g., 'String', 'Number'
    required: Boolean,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const AITemplate = mongoose.model('AITemplate', aiTemplateSchema);
export default AITemplate;
