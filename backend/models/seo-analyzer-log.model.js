import mongoose from 'mongoose';

const seoAnalyzerLogSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  analyzedAt: { type: Date, default: Date.now },
  seoScore: { type: Number, required: true, min: 0, max: 100 },
  keywordDensity: { type: Number },
  issuesFound: [{
    type: { type: String, enum: ['missing_alt', 'duplicate_keyword', 'thin_content', 'missing_heading', 'passive_voice', 'other'] },
    severity: { type: String, enum: ['critical', 'warning', 'info'] },
    message: String
  }],
  aiSuggestionsApplied: { type: Number, default: 0 },
  timeSpentOptimizing: { type: Number } // in seconds
}, { timestamps: true });

seoAnalyzerLogSchema.index({ post: 1, analyzedAt: -1 });

const SeoAnalyzerLog = mongoose.models.SeoAnalyzerLog || mongoose.model('SeoAnalyzerLog', seoAnalyzerLogSchema);
export default SeoAnalyzerLog;
