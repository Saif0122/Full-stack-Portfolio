import mongoose from 'mongoose';

const localCitationSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'LocalBusinessProfile', required: true },
  
  platformName: { 
    type: String, 
    required: true,
    enum: [
      'Google Business Profile', 
      'Bing Places', 
      'Apple Business Connect', 
      'Facebook', 
      'LinkedIn Company Page', 
      'GitHub Profile', 
      'Clutch', 
      'GoodFirms',
      'Other'
    ]
  },
  
  profileUrl: { type: String },
  
  // Status tracking
  listingStatus: { type: String, enum: ['Published', 'Pending', 'Unclaimed', 'Suspended'], default: 'Unclaimed' },
  verificationStatus: { type: String, enum: ['Verified', 'Unverified', 'In Progress'], default: 'Unverified' },
  
  // Auditing
  napConsistencyScore: { type: Number, min: 0, max: 100, default: 0 },
  citationCompleteness: { type: Number, min: 0, max: 100, default: 0 },
  
  lastCheckedAt: { type: Date, default: Date.now },
  notes: { type: String }
}, { timestamps: true });

localCitationSchema.index({ profileId: 1, platformName: 1 }, { unique: true });

const LocalCitation = mongoose.models.LocalCitation || mongoose.model('LocalCitation', localCitationSchema);
export default LocalCitation;
