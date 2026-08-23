class SchemaValidatorService {
  /**
   * Validate generated JSON-LD and return issues and a score
   */
  validate(schema) {
    const issues = [];
    let score = 100;

    if (!schema) {
      return { isValid: false, issues: ['Schema is null or undefined'], score: 0 };
    }

    if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
      issues.push('Missing or invalid @context. Must be "https://schema.org"');
      score -= 20;
    }

    if (!schema['@type']) {
      issues.push('Missing @type property');
      score -= 30;
    }

    // Generic checks based on @type
    if (schema['@type'] === 'BlogPosting' || schema['@type'] === 'Article') {
      if (!schema.headline) { issues.push('Article is missing "headline"'); score -= 15; }
      if (!schema.image) { issues.push('Article is missing "image"'); score -= 10; }
      if (!schema.datePublished) { issues.push('Article is missing "datePublished"'); score -= 10; }
      if (!schema.author) { issues.push('Article is missing "author"'); score -= 10; }
    }

    if (schema['@type'] === 'Product') {
      if (!schema.name) { issues.push('Product is missing "name"'); score -= 20; }
      if (!schema.image) { issues.push('Product is missing "image"'); score -= 10; }
      if (!schema.description) { issues.push('Product is missing "description"'); score -= 10; }
      if (!schema.offers) { issues.push('Product is missing "offers"'); score -= 15; }
    }

    // Check for broken URLs (simple string start check for now)
    const checkUrls = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && (key === 'url' || key === 'image' || key === '@id')) {
          if (!obj[key].startsWith('http')) {
            issues.push(`Invalid URL format found for "${key}": ${obj[key]}`);
            score -= 5;
          }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          checkUrls(obj[key]);
        }
      }
    };
    
    checkUrls(schema);

    score = Math.max(0, score); // Prevent negative scores

    return {
      isValid: issues.length === 0,
      issues,
      score, // Rich Results Readiness Score
      type: schema['@type']
    };
  }
}

export default new SchemaValidatorService();
