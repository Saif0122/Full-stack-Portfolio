import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true }, // in bytes
  url: { type: String, required: true },
  folder: { type: String, default: '/' },
  altText: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
export default Media;
