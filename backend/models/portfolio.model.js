import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // e.g., 'hero', 'about', 'skills', 'experience'
  content: { type: mongoose.Schema.Types.Mixed, required: true }, // JSON object containing section-specific data
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
