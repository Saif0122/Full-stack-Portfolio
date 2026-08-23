import mongoose from 'mongoose';

const graphNodeSchema = new mongoose.Schema({
  // Reference to the actual content entity (Blog, Product, etc.)
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  
  // The Mongoose model name of the referenced entity
  nodeType: { 
    type: String, 
    required: true,
    enum: ['Post', 'Product', 'Project', 'Category', 'Tag', 'Technology', 'Skill', 'Service', 'Portfolio', 'Course', 'Documentation'],
    index: true 
  },
  
  // Core Node Data
  title: { type: String, required: true },
  uri: { type: String, required: true, unique: true }, // The relative URL e.g. /blog/my-post
  isPillarPage: { type: Boolean, default: false },
  
  // Graph Metrics
  incomingLinksCount: { type: Number, default: 0 },
  outgoingLinksCount: { type: Number, default: 0 },
  crawlDepth: { type: Number, default: 0 },
  linkEquityScore: { type: Number, default: 0 },
  topicAuthorityScore: { type: Number, default: 0 },
  
  // Status Flags
  isOrphan: { type: Boolean, default: true, index: true },
  
  // Clustering
  clusterId: { type: mongoose.Schema.Types.ObjectId, ref: 'TopicCluster' }, // Future integration

  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active', index: true }

}, { timestamps: true });

// Compound index for quick lookups
graphNodeSchema.index({ nodeType: 1, referenceId: 1 }, { unique: true });

const GraphNode = mongoose.models.GraphNode || mongoose.model('GraphNode', graphNodeSchema);
export default GraphNode;
