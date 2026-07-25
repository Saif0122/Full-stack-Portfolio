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

export const updateConfig = async (req, res, next) => {
  try {
    const { error, value } = seoValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const data = await seoService.updateConfig(value.path, value);
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
