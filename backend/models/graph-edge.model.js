import mongoose from 'mongoose';

const graphEdgeSchema = new mongoose.Schema({
  // The source node of the link
  sourceNode: { type: mongoose.Schema.Types.ObjectId, ref: 'GraphNode', required: true, index: true },
  
  // The target node of the link
  targetNode: { type: mongoose.Schema.Types.ObjectId, ref: 'GraphNode', required: true, index: true },
  
  // Text used to hyperlink
  anchorText: { type: String, required: true },
  
  // Categorization of the anchor
  anchorType: { 
    type: String, 
    enum: ['Primary', 'Secondary', 'Keyword', 'Branded', 'Generic', 'Empty', 'Image'],
    default: 'Generic',
    index: true
  },
  
  // Relationship nature
  relationship: { 
    type: String, 
    enum: ['inline', 'navigation', 'footer', 'sidebar', 'related', 'dependent', 'canonical', 'author'],
    default: 'inline',
    index: true
  },
  
  // Link Health
  isBroken: { type: Boolean, default: false, index: true },
  isRedirect: { type: Boolean, default: false },
  redirectUrl: { type: String }, // if isRedirect is true
  
  // Flow
  isNofollow: { type: Boolean, default: false },

}, { timestamps: true });

// Prevent duplicate exact edges, though multiple edges between same nodes with different anchor text are possible.
// So we won't strictly enforce unique on (source, target), but we should index them together.
graphEdgeSchema.index({ sourceNode: 1, targetNode: 1 });

const GraphEdge = mongoose.models.GraphEdge || mongoose.model('GraphEdge', graphEdgeSchema);
export default GraphEdge;
