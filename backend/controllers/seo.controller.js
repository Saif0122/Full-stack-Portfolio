import { SeoService } from '../services/seo.service.js';
import { seoValidationSchema } from '../validators/seo.validator.js';

const seoService = new SeoService();

export const getAllConfigs = async (req, res, next) => {
  try {
    const data = await seoService.getAllConfigs();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getConfig = async (req, res, next) => {
  try {
    const { path } = req.query;
    if (!path) return res.status(400).json({ success: false, message: 'Path query parameter is required' });
    const data = await seoService.getConfig(path);
    if (!data) return res.status(404).json({ success: false, message: 'SEO configuration not found for this path' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getGlobalDefaults = async (req, res, next) => {
  try {
    const data = await seoService.getGlobalDefaults();
    if (!data) return res.status(404).json({ success: false, message: 'Global SEO defaults not found. They will be seeded on next getAllConfigs call.' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateGlobalDefaults = async (req, res, next) => {
  try {
    const userId = req.user?._id || null;
    const { changeNote, ...seoData } = req.body;
    const data = await seoService.updateGlobalDefaults(seoData, userId, changeNote);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateConfig = async (req, res, next) => {
  try {
    const { error, value } = seoValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const userId = req.user?._id || null;
    const { changeNote, ...seoData } = value;
    const data = await seoService.updateConfig(seoData.path, seoData, userId, changeNote);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteConfig = async (req, res, next) => {
  try {
    const { path } = req.params;
    await seoService.deleteConfig(decodeURIComponent(path));
    res.status(200).json({ success: true, message: 'SEO configuration removed successfully' });
  } catch (error) {
    next(error);
  }
};

export const getSitemapManifest = async (req, res, next) => {
  try {
    const data = await seoService.generateSitemapManifest();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const scanBrokenLinks = async (req, res, next) => {
  try {
    const auditResults = await seoService.runBrokenLinksScan();
    res.status(200).json({ success: true, data: auditResults });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/seo/validate
 * Runs the metadata validation engine on all SEO records.
 * Stores validation issues in the DB for display in Admin Dashboard.
 */
export const validateAllConfigs = async (req, res, next) => {
  try {
    const results = await seoService.validateAllConfigs();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/seo/:path/versions
 * Returns the audit version history for a specific SEO path.
 */
export const getVersionHistory = async (req, res, next) => {
  try {
    const path = decodeURIComponent(req.params.path);
    const versions = await seoService.getVersionHistory(path);
    res.status(200).json({ success: true, data: versions });
  } catch (error) {
    next(error);
  }
};

