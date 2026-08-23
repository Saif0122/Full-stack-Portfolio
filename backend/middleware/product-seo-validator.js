export const validateProductForPublish = (req, res, next) => {
  const product = req.body;
  const { overrideSeoValidation, status } = req.body;

  // Only validate if attempting to publish
  if (status !== 'published') {
    return next();
  }

  if (overrideSeoValidation) {
    return next();
  }

  const errors = [];

  // Core Product info
  if (!product.title) errors.push('Product Name is required.');
  if (!product.description && !product.shortDescription) errors.push('Product Description is required.');

  // SEO Info
  if (!product.seo?.metaTitle) errors.push('SEO Title is required.');
  if (!product.seo?.metaDescription) errors.push('Meta Description is required.');
  if (!product.seo?.focusKeyword) errors.push('Focus Keyword is required.');

  // Media
  if (!product.thumbnail) errors.push('Hero thumbnail is required.');
  if (!product.images || product.images.length === 0) errors.push('At least one screenshot is required.');
  
  const hasImagesWithoutAlt = product.images?.some((img) => !img.altText);
  if (hasImagesWithoutAlt) errors.push('All screenshots must have alt text.');

  // Product Readiness Info
  if (!product.documentationUrl && !product.installationGuide) errors.push('Documentation or Installation Guide is required.');
  if (!product.licenseType) errors.push('License information is required.');
  if (!product.localFileUrl && !product.githubRepoUrl && product.productType !== 'course') errors.push('Download Package URL is required.');

  // Canonical / OG / Twitter (usually generated, but just check if it's there or expected)
  // Usually canonical URL is generated, so we might not strict fail it, but let's check it:
  if (!product.seo?.canonicalUrl) errors.push('Canonical URL is required.');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Product cannot be published because it failed critical Readiness and SEO validation.',
      errors,
    });
  }

  next();
};
