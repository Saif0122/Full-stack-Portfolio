import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'site_title', 'contact_email', 'social_links'
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  group: { type: String, default: 'general' }, // e.g., 'general', 'seo', 'social', 'branding'
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
export default Setting;
