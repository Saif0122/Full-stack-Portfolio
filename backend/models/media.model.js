import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  // Core
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true }, // in bytes
  url: { type: String, required: true },
  folder: { type: String, default: '/' },
  hash: { type: String, required: true, index: true }, // SHA-256 for duplicate detection
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Dimensions
  width: { type: Number },
  height: { type: Number },
  aspectRatio: { type: Number },
  
  // SEO & Metadata
  title: { type: String },
  altText: { type: String },
  caption: { type: String },
  description: { type: String },
  copyright: { type: String },
  author: { type: String },
  license: { type: String },
  language: { type: String, default: 'en' },
  focusKeyword: { type: String },
  relatedKeywords: [{ type: String }],
  
  // Flags & Status
  isMissingAlt: { type: Boolean, default: true },
  isDecorative: { type: Boolean, default: false },
  isDuplicate: { type: Boolean, default: false },
  isBroken: { type: Boolean, default: false },
  isOpenGraphImage: { type: Boolean, default: false },
  isTwitterImage: { type: Boolean, default: false },
  
  // Scores
  seoScore: { type: Number, default: 0 },
  accessibilityScore: { type: Number, default: 0 },
  optimizationScore: { type: Number, default: 0 },
  performanceScore: { type: Number, default: 0 },
  mediaQualityScore: { type: Number, default: 0 },
  overallReadinessScore: { type: Number, default: 0 },
  lastOptimizedDate: { type: Date },

  // Variants & Versioning
  versions: {
    original: { type: String }, // url
    optimized: { type: String },
    previous: { type: String },
    thumbnail: { type: String },
    openGraph: { type: String },
    twitter: { type: String }
  },
  responsiveVariants: [{
    width: Number,
    url: String
  }],
  
  // Associated Content (Generic ref approach)
  associatedContent: [{
    kind: { type: String, enum: ['Post', 'Product', 'Project', 'Portfolio', 'Category', 'User'] },
    item: { type: mongoose.Schema.Types.ObjectId, refPath: 'associatedContent.kind' }
  }],

  // Video SEO Prep (Future)
  isVideo: { type: Boolean, default: false },
  transcript: { type: String },
  captions: { type: String }, // url to vtt
  duration: { type: Number }, // seconds
  resolution: { type: String }, // e.g., '1080p'
  streamingUrl: { type: String },
  previewClip: { type: String } // url to short preview

}, { timestamps: true });

// Pre-save to calculate aspect ratio
mediaSchema.pre('save', function(next) {
  if (this.width && this.height) {
    this.aspectRatio = parseFloat((this.width / this.height).toFixed(4));
  }
  next();
});

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
export default Media;
