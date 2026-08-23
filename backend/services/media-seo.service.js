import Media from '../models/media.model.js';
import { StorageProviderFactory } from '../providers/storage/storage-provider.factory.js';

class MediaSeoService {
  constructor() {
    this.storage = StorageProviderFactory.getProvider();
  }

  async getMediaLibrary(filters = {}, skip = 0, limit = 50) {
    const query = {};
    if (filters.type) {
      if (filters.type === 'image') query.mimetype = { $regex: '^image/' };
      if (filters.type === 'video') query.isVideo = true;
    }
    if (filters.isMissingAlt) query.isMissingAlt = true;
    if (filters.isDuplicate) query.isDuplicate = true;
    if (filters.isBroken) query.isBroken = true;
    
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploadedBy', 'name email');

    const total = await Media.countDocuments(query);
    
    return { data: media, total };
  }

  async uploadMedia(buffer, metadata, userId) {
    // 1. Upload to active storage provider
    const result = await this.storage.upload(buffer, metadata);

    // 2. Check for duplicate hash
    const existing = await Media.findOne({ hash: result.hash });
    const isDuplicate = !!existing;

    // 3. Create initial Media record
    const media = await Media.create({
      filename: result.publicId,
      originalName: metadata.originalName,
      mimetype: metadata.mimetype,
      size: result.size,
      url: result.url,
      hash: result.hash,
      width: result.width,
      height: result.height,
      uploadedBy: userId,
      isDuplicate,
      isMissingAlt: true,
      versions: { original: result.url }
    });

    // 4. Trigger asynchronous processing (responsive variants, scoring)
    this.processMediaAsync(media._id);

    return media;
  }

  async processMediaAsync(mediaId) {
    const media = await Media.findById(mediaId);
    if (!media) return;

    try {
      // Generate Responsive Variants
      if (media.mimetype.startsWith('image/')) {
        const variants = await this.storage.generateResponsiveVariants(media.filename);
        media.responsiveVariants = variants;
      }
      
      // Calculate Scores
      this.calculateScores(media);
      
      await media.save();
    } catch (error) {
      console.error(`Failed to process media async [${mediaId}]:`, error);
    }
  }

  calculateScores(media) {
    // 1. Accessibility Score
    let accessScore = 100;
    if (!media.altText && !media.isDecorative) accessScore -= 50;
    if (!media.caption) accessScore -= 20;
    media.accessibilityScore = Math.max(0, accessScore);
    media.isMissingAlt = !media.altText && !media.isDecorative;

    // 2. SEO Score
    let seoScore = 100;
    if (media.isMissingAlt) seoScore -= 40;
    if (!media.description) seoScore -= 20;
    if (!media.title) seoScore -= 10;
    media.seoScore = Math.max(0, seoScore);

    // 3. Performance Score
    let perfScore = 100;
    if (media.size > 500000) perfScore -= 30; // > 500kb
    if (media.size > 1000000) perfScore -= 50; // > 1mb
    if (media.responsiveVariants && media.responsiveVariants.length > 0) perfScore += 10;
    media.performanceScore = Math.min(100, Math.max(0, perfScore));

    // 4. Overall Readiness
    media.overallReadinessScore = Math.round(
      (media.seoScore * 0.4) + (media.accessibilityScore * 0.3) + (media.performanceScore * 0.3)
    );
  }

  async getAuditStats() {
    const total = await Media.countDocuments();
    const images = await Media.countDocuments({ mimetype: { $regex: '^image/' } });
    const missingAlt = await Media.countDocuments({ isMissingAlt: true, isDecorative: false });
    const duplicates = await Media.countDocuments({ isDuplicate: true });
    
    // Calculate average score
    const result = await Media.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$overallReadinessScore' }, avgAccess: { $avg: '$accessibilityScore' } } }
    ]);

    return {
      total,
      images,
      missingAltText: missingAlt,
      duplicateImages: duplicates,
      overallMediaScore: result.length ? Math.round(result[0].avgScore) : 0,
      accessibilityScore: result.length ? Math.round(result[0].avgAccess) : 0
    };
  }
}

export default new MediaSeoService();
