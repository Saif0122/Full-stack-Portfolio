import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  markdownContent: { type: String },
  coverImage: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  publishedAt: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
  clusterId: { type: String },
  isPillar: { type: Boolean, default: false },
  readTime: { type: String },
  mermaidDiagram: { type: String },
  githubRepo: {
    owner: String,
    repo: String,
    stars: Number,
    cta: String,
  },
  technicalSegments: {
    architecturalDecisions: String,
    tradeOffs: String,
    bottlenecks: String,
    scalingStrategy: String,
    securityConsiderations: String,
    performanceOptimization: String,
    monitoring: String,
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    focusKeyword: String,
    keywordDifficulty: String,
    internalLinks: [String],
    externalLinks: [String],
  }
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
