import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String }, // Detailed markdown description (Legacy, but keeping for compatibility)
  markdownContent: { type: String },
  thumbnail: { type: String },
  image: { type: String },
  images: [{ type: String }],
  mediaGallery: [{ type: mongoose.Schema.Types.Mixed }], // array of { type: 'image'|'video', url: string, caption?: string }
  technologies: [{ type: String }], // Legacy tags
  stack: [{ type: mongoose.Schema.Types.Mixed }], // array of { name: string, category: string, benefit: string, version: string }
  category: { type: String, default: 'All' },
  summary: { type: String },
  metrics: [{ type: mongoose.Schema.Types.Mixed }], // array of { label: string, value: string, description: string }
  challenges: { type: mongoose.Schema.Types.Mixed }, // { problem: string, solution: string, architecture: string }
  technicalSpecs: { type: mongoose.Schema.Types.Mixed }, // { backendStructure: string, databaseSchema: string, etc }
  liveUrl: { type: String },
  githubUrl: { type: String },
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  order: { type: Number, default: 0 },
  // Per-project SEO override — consumed by projects/[slug]/page.tsx generateMetadata
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    canonicalUrl: { type: String },
    noIndex: { type: Boolean, default: false },
    openGraphImage: { type: String }
  }
}, { timestamps: true });

projectSchema.index({ slug: 1, status: 1 });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;

