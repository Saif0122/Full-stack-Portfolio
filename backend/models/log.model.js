import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  level: { type: String, enum: ['info', 'warn', 'error', 'critical'], required: true },
  category: { type: String, enum: ['auth', 'admin', 'payment', 'system', 'security'], required: true },
  message: { type: String, required: true },
  context: { type: mongoose.Schema.Types.Mixed }, // User ID, IP, Error Stack
}, { timestamps: true });

const Log = mongoose.models.Log || mongoose.model('Log', logSchema);
export default Log;
