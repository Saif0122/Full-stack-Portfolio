import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.util.js';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number }, 
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: String }], // Added based on requirements
  technologies: [{ type: String }],
  version: { type: String, default: '1.0.0' },
  features: [{ type: String }],
  requirements: [{ type: String }],
  
  // Media
  images: [{ 
    url: { type: String },
    altText: { type: String },
    format: { type: String },
    width: { type: Number },
    height: { type: Number }
  }],
  thumbnail: { type: String }, 
  videoPreviewUrl: { type: String },
  githubRepoUrl: { type: String },
  livePreviewUrl: { type: String },
  
  // Stats
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }, 
  
  // Badges & Status
  isPopular: { type: Boolean, default: false }, 
  isNewBadge: { type: Boolean, default: false }, 
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  priority: { type: Number, default: 0 },
  
  // Digital Marketplace fields
  productType: { 
    type: String, 
    enum: ['template', 'uikit', 'source_code', 'course', 'pdf', 'ebook', 'premium_article', 'admin_dashboard', 'mern_project'],
    default: 'source_code'
  },
  localFileUrl: { type: String }, 
  downloadLimit: { type: Number, default: 0 }, 
  isSubscriptionBased: { type: Boolean, default: false },

  // Product Specific Metadata
  sku: { type: String },
  brand: { type: String },
  licenseType: { type: String, default: 'MIT' },
  changelog: [{
    version: String,
    date: Date,
    changes: [String]
  }],

  // Extended Content & Support
  documentationUrl: { type: String },
  installationGuide: { type: String },
  quickStartGuide: { type: String },
  supportInfo: { type: String },
  contactMethod: { type: String },
  faq: [{
    question: String,
    answer: String
  }],
  
  // Future Trust Signals
  trustSignals: {
    verifiedProduct: { type: Boolean, default: false },
    verifiedAuthor: { type: Boolean, default: false },
    digitalSignature: { type: Boolean, default: false },
    downloadVerified: { type: Boolean, default: false },
    licenseVerified: { type: Boolean, default: false },
    activelyMaintained: { type: Boolean, default: true }
  },

  // Scores
  seoScore: { type: Number, default: 0 },
  readinessScore: { type: Number, default: 0 },
  
  // Comprehensive SEO Block
  seo: {
    metaTitle: { type: String, maxLength: 60 },
    metaDescription: { type: String, maxLength: 160 },
    focusKeyword: { type: String },
    secondaryKeywords: [{ type: String }],
    longTailKeywords: [{ type: String }],
    canonicalUrl: { type: String },
    openGraphImage: { type: String },
    twitterImage: { type: String },
    robots: {
      index: { type: Boolean, default: true },
      follow: { type: Boolean, default: true }
    },
    schemaType: { type: String, default: 'Product' },
    aiSuggestions: { type: mongoose.Schema.Types.Mixed } // To store generated suggestions
  }

}, { timestamps: true });

// Indexes for performance
productSchema.index({ category: 1, isActive: 1, createdAt: -1 });
productSchema.index({ title: 'text', description: 'text' });
productSchema.index({ slug: 1 });

productSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = slugify(this.title);
  } else if (this.isModified('slug')) {
    this.slug = slugify(this.slug);
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
