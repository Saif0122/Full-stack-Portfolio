import mongoose from 'mongoose';

const aiPromptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'React', 'Next.js', 'Node.js', 'MongoDB', 'UI/UX', 'DevOps', 'SEO', 'Marketing', 'Documentation', 'General'],
    default: 'General',
  },
  variables: [{
    type: String,
  }],
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

const AIPrompt = mongoose.model('AIPrompt', aiPromptSchema);
export default AIPrompt;
