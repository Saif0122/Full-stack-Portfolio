import LocalBusinessProfile from '../models/local-business-profile.model.js';
import LocalLocation from '../models/local-location.model.js';
import LocalCitation from '../models/local-citation.model.js';
import LocalKeyword from '../models/local-keyword.model.js';
import SchemaConfig from '../models/schema-config.model.js';

export const LocalSEOService = {
  // Profiles
  getProfiles: async () => await LocalBusinessProfile.find().sort({ createdAt: -1 }),
  getProfileById: async (id) => await LocalBusinessProfile.findById(id),
  createProfile: async (data) => await LocalBusinessProfile.create(data),
  updateProfile: async (id, data) => await LocalBusinessProfile.findByIdAndUpdate(id, data, { new: true }),
  
  // Locations
  getLocations: async () => await LocalLocation.find().populate('profileId').sort({ createdAt: -1 }),
  createLocation: async (data) => await LocalLocation.create(data),
  updateLocation: async (id, data) => await LocalLocation.findByIdAndUpdate(id, data, { new: true }),
  
  // Citations
  getCitations: async () => await LocalCitation.find().populate('profileId').sort({ createdAt: -1 }),
  createCitation: async (data) => await LocalCitation.create(data),
  updateCitation: async (id, data) => await LocalCitation.findByIdAndUpdate(id, data, { new: true }),
  
  // Keywords
  getKeywords: async () => await LocalKeyword.find().populate('locationId').sort({ createdAt: -1 }),
  createKeyword: async (data) => await LocalKeyword.create(data),
  updateKeyword: async (id, data) => await LocalKeyword.findByIdAndUpdate(id, data, { new: true }),
  
  // One-time idempotent migration to seed initial NAP
  migrateNapDataIfNeeded: async () => {
    try {
      const config = await SchemaConfig.findOne({});
      if (!config) return { success: false, message: 'No schema config to migrate from' };
      
      const existingProfile = await LocalBusinessProfile.findOne({ isMigrated: true });
      if (existingProfile) return { success: true, message: 'Data already migrated', profile: existingProfile };
      
      // Migrate
      const newProfile = await LocalBusinessProfile.create({
        internalName: 'Main Headquarters',
        isPrimary: true,
        businessName: config.organizationName || 'My Business',
        businessCategory: config.businessType || 'Organization',
        website: config.websiteUrl || '',
        phone: '', // schema-config didn't have phone, so empty
        email: config.contactEmail || '',
        logo: config.organizationLogo || '',
        description: config.knowledgeGraph?.description || '',
        socialProfiles: config.socialProfiles || [],
        isMigrated: true,
        status: 'Pending'
      });
      
      // Also create a default location for it based on the schema config address
      await LocalLocation.create({
        profileId: newProfile._id,
        locationName: 'Headquarters',
        slug: 'hq',
        country: config.address?.addressCountry || '',
        stateProvince: config.address?.addressRegion || '',
        city: config.address?.addressLocality || '',
        postalCode: config.address?.postalCode || '',
        streetAddress: config.address?.streetAddress || '',
        officeType: 'Headquarters'
      });
      
      return { success: true, message: 'Migration complete', profile: newProfile };
    } catch (error) {
      console.error('[LocalSEOService] Migration error:', error);
      return { success: false, message: error.message };
    }
  },

  // Calculate overall Audit Score
  calculateAuditScore: async () => {
    let score = 0;
    const maxScore = 100;
    const profiles = await LocalBusinessProfile.find();
    if (profiles.length === 0) return { score: 0, status: 'Needs Setup' };
    
    // NAP Consistency (has name, phone, address mapping etc)
    const primaryProfile = profiles.find(p => p.isPrimary) || profiles[0];
    let napScore = 0;
    if (primaryProfile.businessName) napScore += 25;
    if (primaryProfile.phone) napScore += 25;
    if (primaryProfile.website) napScore += 25;
    if (primaryProfile.email) napScore += 25;
    score += (napScore * 0.4); // 40% weight
    
    // Citations completeness
    const citations = await LocalCitation.find({ profileId: primaryProfile._id });
    if (citations.length > 0) {
      const gbp = citations.find(c => c.platformName === 'Google Business Profile');
      if (gbp && gbp.listingStatus === 'Published') {
        score += 30; // 30% weight for GBP Published
      }
    }
    
    // Service Area Coverage
    const locations = await LocalLocation.find({ profileId: primaryProfile._id });
    if (locations.length > 0) {
      score += 15; // 15% weight
    }
    
    // Local Keyword Optimization
    const localKeywords = await LocalKeyword.find();
    if (localKeywords.length > 0) {
      score += 15; // 15% weight
    }
    
    let status = 'Critical';
    if (score >= 95) status = 'Excellent';
    else if (score >= 80) status = 'Good';
    else if (score >= 60) status = 'Needs Improvement';
    
    return {
      score: Math.round(score),
      status,
      napCompleteness: napScore,
      citationCount: citations.length,
      locationCount: locations.length,
      keywordCount: localKeywords.length
    };
  }
};
