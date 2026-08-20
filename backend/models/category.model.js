import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String }, // optional icon class or url
  isActive: { type: Boolean, default: true },
  // Per-category SEO override
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    canonicalUrl: { type: String },
    noIndex: { type: Boolean, default: false },
    openGraphImage: { type: String }
  }
}, { timestamps: true });

import { slugify } from '../utils/slugify.util.js';

categorySchema.index({ slug: 1 });

categorySchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = slugify(this.name);
  } else if (this.isModified('slug')) {
    this.slug = slugify(this.slug);
  }
  next();
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
