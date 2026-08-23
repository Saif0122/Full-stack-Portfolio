import Product from '../models/product.model.js';

export const getMarketplaceSeoOverview = async (req, res) => {
  try {
    const products = await Product.find({ status: { $ne: 'archived' } })
      .select('title slug seo readinessScore seoScore isActive status thumbnail images documentationUrl licenseType localFileUrl githubRepoUrl')
      .lean();

    const totalProducts = products.length;
    if (totalProducts === 0) {
      return res.status(200).json({
        success: true,
        data: {
          overallSeoScore: 0,
          overallReadinessScore: 0,
          products: [],
          stats: {
            missingMetaDescription: 0,
            missingFocusKeyword: 0,
            missingAltText: 0,
            missingDocumentation: 0,
            missingLicense: 0,
            missingDownload: 0,
            duplicateSlugs: 0
          }
        }
      });
    }

    let totalSeoScore = 0;
    let totalReadinessScore = 0;
    let missingMetaDescription = 0;
    let missingFocusKeyword = 0;
    let missingAltText = 0;
    let missingDocumentation = 0;
    let missingLicense = 0;
    let missingDownload = 0;

    const slugs = new Set();
    let duplicateSlugs = 0;

    products.forEach(p => {
      totalSeoScore += (p.seoScore || 0);
      totalReadinessScore += (p.readinessScore || 0);

      if (!p.seo?.metaDescription) missingMetaDescription++;
      if (!p.seo?.focusKeyword) missingFocusKeyword++;
      
      const hasImages = p.images?.length > 0;
      const allImagesHaveAlt = hasImages && p.images.every(img => img.altText);
      if (!allImagesHaveAlt) missingAltText++;

      if (!p.documentationUrl) missingDocumentation++;
      if (!p.licenseType) missingLicense++;
      if (!p.localFileUrl && !p.githubRepoUrl) missingDownload++;

      if (slugs.has(p.slug)) duplicateSlugs++;
      slugs.add(p.slug);
    });

    res.status(200).json({
      success: true,
      data: {
        overallSeoScore: Math.round(totalSeoScore / totalProducts),
        overallReadinessScore: Math.round(totalReadinessScore / totalProducts),
        products,
        stats: {
          missingMetaDescription,
          missingFocusKeyword,
          missingAltText,
          missingDocumentation,
          missingLicense,
          missingDownload,
          duplicateSlugs
        }
      }
    });

  } catch (error) {
    console.error('Error fetching Marketplace SEO Overview:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
