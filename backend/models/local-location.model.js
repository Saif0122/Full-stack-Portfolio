import mongoose from 'mongoose';

const localLocationSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'LocalBusinessProfile', required: true }, // Links to canonical business identity
  
  // Naming & Meta
  locationName: { type: String, required: true }, // e.g. "Peshawar Office"
  slug: { type: String, required: true, unique: true }, // e.g. "pakistan-peshawar" or "peshawar"
  
  // Physical Address (if applicable)
  country: { type: String },
  stateProvince: { type: String },
  city: { type: String },
  postalCode: { type: String },
  streetAddress: { type: String },
  
  geoCoordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },

  // Service Areas (can be broader than physical address)
  primaryServiceArea: { type: String },
  secondaryServiceAreas: [{ type: String }],
  
  // Availability Types
  officeType: { type: String, enum: ['Headquarters', 'Branch', 'Virtual', 'Client-Site'], default: 'Virtual' },
  remoteAvailability: { type: Boolean, default: false },
  freelanceAvailability: { type: Boolean, default: false },
  onsiteAvailability: { type: Boolean, default: false },
  hybridAvailability: { type: Boolean, default: false },
  
  // Opening Hours override (optional, defaults to profile if not set)
  openingHours: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    open: { type: String },
    close: { type: String },
    isClosed: { type: Boolean, default: false }
  }],
  
  // Localized Landing Page SEO reference (will generate /locations/:slug)
  seo: { type: mongoose.Schema.Types.ObjectId, ref: 'Seo' },
  
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Indexes for geospatial queries and slug lookups
localLocationSchema.index({ slug: 1 });
localLocationSchema.index({ profileId: 1 });

const LocalLocation = mongoose.models.LocalLocation || mongoose.model('LocalLocation', localLocationSchema);
export default LocalLocation;
