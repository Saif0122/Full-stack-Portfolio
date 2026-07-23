import mongoose from 'mongoose';

const licenseSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  type: { type: String, enum: ['standard', 'extended', 'enterprise'], default: 'standard' },
  status: { type: String, enum: ['active', 'revoked', 'expired'], default: 'active' },
  expiresAt: { type: Date }, // null if lifetime
  domainLimits: { type: Number, default: 1 },
  registeredDomains: [{ type: String }],
}, { timestamps: true });

const License = mongoose.models.License || mongoose.model('License', licenseSchema);
export default License;
