import mongoose from 'mongoose';

const internalLinkSuggestionSchema = new mongoose.Schema({
  // The node where the link should be added
  sourceNode: { type: mongoose.Schema.Types.ObjectId, ref: 'GraphNode', required: true, index: true },
  
  // The recommended destination
  targetNode: { type: mongoose.Schema.Types.ObjectId, ref: 'GraphNode', required: true },
  
  // Suggested anchor text
  suggestedAnchorText: { type: String, required: true },
  
  // E.g., 'Related Articles section', 'Inline in paragraph 2'
  suggestedPlacement: { type: String }, 
  
  // AI rationale
  contextualRationale: { type: String },
  confidenceScore: { type: Number, min: 0, max: 100 },
  
  // Status workflow
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'applied'], 
    default: 'pending',
    index: true 
  },
  
  // Administrator who reviewed it
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date }

}, { timestamps: true });

const InternalLinkSuggestion = mongoose.models.InternalLinkSuggestion || mongoose.model('InternalLinkSuggestion', internalLinkSuggestionSchema);
export default InternalLinkSuggestion;
