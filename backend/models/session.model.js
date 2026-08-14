import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true, required: true },
  visitorId: { type: String, index: true },
  ipHash: { type: String }, // Anonymized
  device: { type: String },
  os: { type: String },
  browser: { type: String },
  country: { type: String },
  city: { type: String },
  referrer: { type: String },
  landingPage: { type: String },
  exitPage: { type: String },
  duration: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
}, { timestamps: true });

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

sessionSchema.index({ device: 1 });
sessionSchema.index({ os: 1 });
sessionSchema.index({ referrer: 1 });

export default Session;
