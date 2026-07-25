import mongoose from 'mongoose';

const licenseSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  type: { type: String, enum: ['single_device', 'multi_device', 'unlimited'], default: 'single_device' },
  status: { type: String, enum: ['active', 'revoked', 'expired'], default: 'active' },
  expiresAt: { type: Date }, // null if lifetime
  deviceLimit: { type: Number, default: 1 }, // -1 for unlimited
  activatedDevices: [{
    deviceId: String,
    activatedAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

const License = mongoose.models.License || mongoose.model('License', licenseSchema);
export default License;
