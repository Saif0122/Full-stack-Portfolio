import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true }, // Added for UI
  price: { type: Number, required: true },
  salePrice: { type: Number }, // Renamed from discountPrice to match UI
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  technologies: [{ type: String }],
  version: { type: String, default: '1.0.0' },
  features: [{ type: String }],
  requirements: [{ type: String }],
  images: [{ type: String }], // Renamed from screenshots to match UI
  thumbnail: { type: String }, // Renamed from coverImage to match UI
  videoPreviewUrl: { type: String },
  githubRepoUrl: { type: String },
  livePreviewUrl: { type: String },
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }, // Renamed from reviewsCount
  isPopular: { type: Boolean, default: false }, // Added for UI badge
  isNewBadge: { type: Boolean, default: false }, // Added for UI badge
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
