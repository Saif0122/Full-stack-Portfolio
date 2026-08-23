import MediaSeoService from '../services/media-seo.service.js';

export const getAuditStats = async (req, res) => {
  try {
    const stats = await MediaSeoService.getAuditStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLibrary = async (req, res) => {
  try {
    const { type, isMissingAlt, isDuplicate, skip, limit } = req.query;
    const filters = { type, isMissingAlt: isMissingAlt === 'true', isDuplicate: isDuplicate === 'true' };
    const library = await MediaSeoService.getMediaLibrary(filters, parseInt(skip) || 0, parseInt(limit) || 50);
    res.json({ success: true, ...library });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
