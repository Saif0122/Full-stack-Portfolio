import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true }, // route path e.g. '/portfolio', '/store', '/blog', or 'GLOBAL_DEFAULTS'
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  keywords: [{ type: String }],
  openGraph: {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    type: { type: String, default: 'website' }
  },
  twitterCard: {
    card: { type: String, default: 'summary_large_image' },
    site: { type: String },
    creator: { type: String }
  },
  structuredData: { type: mongoose.Schema.Types.Mixed }, // JSON-LD payload
  canonicalUrl: { type: String },
  noIndex: { type: Boolean, default: false },
  noFollow: { type: Boolean, default: false },
  sitemapPriority: { type: Number, default: 0.8 },
  redirectUrl: { type: String }, // 301/302 redirect destination if path moved
  redirectType: { type: Number, default: 301 },
  isBrokenLink: { type: Boolean, default: false }, // marked true if scanner detects dead targets

  // Schema type for the JSON-LD structured data on this path
  schemaType: {
    type: String,
    enum: ['WebSite', 'ProfilePage', 'Organization', 'TechArticle', 'BlogPosting', 'Product', 'SoftwareApplication', 'BreadcrumbList', 'ItemList'],
  },

  // Audit log: every update saves a version snapshot before overwriting
  versions: [{
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    noIndex: Boolean,
    canonicalUrl: String,
    changeNote: { type: String, default: '' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now }
  }],

  // Metadata validation issues detected by the validation engine
  validationIssues: [{
    type: { type: String }, // 'missing_title' | 'title_too_long' | 'duplicate_title' | etc.
    severity: { type: String, enum: ['error', 'warning', 'info'], default: 'warning' },
    message: { type: String },
    field: { type: String },
    detectedAt: { type: Date, default: Date.now }
  }],

}, { timestamps: true });

// Indexes for performance
seoSchema.index({ path: 1 });
seoSchema.index({ noIndex: 1 });
seoSchema.index({ updatedAt: -1 });

const Seo = mongoose.models.Seo || mongoose.model('Seo', seoSchema);
export default Seo;

