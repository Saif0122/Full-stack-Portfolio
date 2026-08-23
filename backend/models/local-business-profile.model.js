import mongoose from 'mongoose';

const localBusinessProfileSchema = new mongoose.Schema({
  internalName: { type: String, required: true }, // e.g. "Main HQ", "London Office"
  isPrimary: { type: Boolean, default: false },
  
  businessName: { type: String, required: true },
  businessCategory: { type: String, required: true }, // e.g. "Software Company"
  website: { type: String },
  phone: { type: String },
  email: { type: String },
  logo: { type: String },
  description: { type: String },
  
  socialProfiles: [{ type: String }],
  
  status: { type: String, enum: ['Pending', 'Verified', 'Suspended'], default: 'Pending' },
  verificationNotes: { type: String },
  
  timeZone: { type: String, default: 'UTC' },
  language: { type: String, default: 'en' },

  isMigrated: { type: Boolean, default: false } // Track if it was seeded from schema-config
}, { timestamps: true });

const LocalBusinessProfile = mongoose.models.LocalBusinessProfile || mongoose.model('LocalBusinessProfile', localBusinessProfileSchema);
export default LocalBusinessProfile;
