import mongoose from 'mongoose';

const localKeywordSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  
  // Geotargeting
  country: { type: String },
  region: { type: String },
  city: { type: String },
  serviceArea: { type: String },
  
  searchIntent: { type: String, enum: ['informational', 'navigational', 'commercial', 'transactional'] },
  
  // Ranking & tracking
  currentRank: { type: Number, default: 0 },
  previousRank: { type: Number, default: 0 },
  rankTrend: { type: String, enum: ['up', 'down', 'stable', 'new'], default: 'new' },
  lastCheckedAt: { type: Date, default: Date.now },
  
  // Optimization
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
  optimizationStatus: { type: String, enum: ['optimized', 'needs-improvement', 'unoptimized'], default: 'unoptimized' },

  // Associated Location reference (Optional - if the keyword is tightly coupled to one specific local landing page)
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'LocalLocation' }
}, { timestamps: true });

localKeywordSchema.index({ keyword: 1, city: 1, country: 1 }, { unique: true });

const LocalKeyword = mongoose.models.LocalKeyword || mongoose.model('LocalKeyword', localKeywordSchema);
export default LocalKeyword;
