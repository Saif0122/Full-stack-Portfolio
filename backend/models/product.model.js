import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  technologies: [{ type: String }],
  version: { type: String, default: '1.0.0' },
  features: [{ type: String }],
  requirements: [{ type: String }],
  screenshots: [{ url: String, alt: String }],
  coverImage: { type: String },
  videoPreviewUrl: { type: String },
  githubRepoUrl: { type: String },
  livePreviewUrl: { type: String },
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
