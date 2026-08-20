import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  // Per-tag SEO override
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    canonicalUrl: { type: String },
    noIndex: { type: Boolean, default: false },
    openGraphImage: { type: String }
  }
}, { timestamps: true });

tagSchema.index({ slug: 1 });

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
export default Tag;
