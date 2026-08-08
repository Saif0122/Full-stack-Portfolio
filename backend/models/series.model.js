import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  coverImage: { type: String }
}, { timestamps: true });

const Series = mongoose.models.Series || mongoose.model('Series', seriesSchema);
export default Series;
