import Joi from 'joi';

export const seoValidationSchema = Joi.object({
  path: Joi.string().required(),
  metaTitle: Joi.string().required(),
  metaDescription: Joi.string().required(),
  keywords: Joi.array().items(Joi.string()).optional(),
  openGraph: Joi.object().optional(),
  twitterCard: Joi.object().optional(),
  structuredData: Joi.object().optional(),
  canonicalUrl: Joi.string().optional().allow(''),
  noIndex: Joi.boolean().optional(),
  noFollow: Joi.boolean().optional(),
  sitemapPriority: Joi.number().min(0).max(1).optional(),
  redirectUrl: Joi.string().optional().allow(''),
  redirectType: Joi.number().optional(),
  isBrokenLink: Joi.boolean().optional()
});
