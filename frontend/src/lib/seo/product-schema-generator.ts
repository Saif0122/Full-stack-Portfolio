export const generateProductSchema = (product: any, storeUrl: string) => {
  if (!product) return null;

  const url = `${storeUrl}/store/${product.slug}`;
  const images = product.images?.map((img: any) => img.url) || [product.thumbnail].filter(Boolean);

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.seo?.metaTitle || product.title,
    description: product.seo?.metaDescription || product.description || product.shortDescription,
    image: images,
    url: url,
    sku: product.sku || product._id,
  };

  if (product.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: product.brand,
    };
  }

  // Offer
  schema.offers = {
    '@type': 'Offer',
    url: url,
    priceCurrency: 'USD',
    price: product.salePrice || product.price || 0,
    availability: product.isActive ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
  };

  // Placeholders for Reviews and Aggregate Rating
  if (product.rating > 0 && product.reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  } else {
    // Future-ready placeholders when no reviews exist yet
    // schema.aggregateRating = null; 
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: storeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Store',
        item: `${storeUrl}/store`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: url,
      },
    ],
  };

  return [schema, breadcrumbSchema];
};
