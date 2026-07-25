import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  version: { type: String, required: true },
  fileUrl: { type: String, required: true },
  releaseNotes: { type: String },
  releaseDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  downloadCount: { type: Number, default: 0 },
}, { timestamps: true });

const Download = mongoose.models.Download || mongoose.model('Download', downloadSchema);
export default Download;
