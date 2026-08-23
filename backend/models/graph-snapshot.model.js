import mongoose from 'mongoose';

const graphSnapshotSchema = new mongoose.Schema({
  // Timestamp when snapshot was generated
  generatedAt: { type: Date, default: Date.now, index: true },
  
  // High-level Metrics
  nodeCount: { type: Number, required: true },
  edgeCount: { type: Number, required: true },
  
  // Readiness Scores
  connectivityScore: { type: Number, default: 0 },
  crawlDepthScore: { type: Number, default: 0 },
  linkEquityScore: { type: Number, default: 0 },
  anchorDiversityScore: { type: Number, default: 0 },
  internalLinkingReadiness: { type: Number, default: 0 }, // Aggregate score
  
  // Health Metrics
  orphanPageCount: { type: Number, default: 0 },
  brokenLinkCount: { type: Number, default: 0 },
  redirectChainCount: { type: Number, default: 0 },

}, { timestamps: true });

const GraphSnapshot = mongoose.models.GraphSnapshot || mongoose.model('GraphSnapshot', graphSnapshotSchema);
export default GraphSnapshot;
