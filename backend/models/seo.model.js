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
}, { timestamps: true });

const Seo = mongoose.models.Seo || mongoose.model('Seo', seoSchema);
export default Seo;
