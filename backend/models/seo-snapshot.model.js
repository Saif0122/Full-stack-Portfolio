import mongoose from 'mongoose';

const seoSnapshotSchema = new mongoose.Schema({
  targetModel: {
    type: String,
    required: true,
    enum: ['Portfolio', 'Project', 'Post', 'Product', 'Category', 'Tag']
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'targetModel'
  },
  version: {
    type: Number,
    required: true
  },
  seoData: {
    type: mongoose.Schema.Types.Mixed, // The full serialized SEO object
    required: true
  },
  historyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AIHistory',
    description: 'The AI History entry that generated this snapshot, if any'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changeSummary: {
    type: String
  }
}, { timestamps: true });

// Prevent multiple snapshots for the same version of the same entity
seoSnapshotSchema.index({ targetModel: 1, targetId: 1, version: 1 }, { unique: true });

const SeoSnapshot = mongoose.model('SeoSnapshot', seoSnapshotSchema);

export default SeoSnapshot;
