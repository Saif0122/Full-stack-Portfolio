export const generateArticleSchema = (post: any) => {
  const authorName = post.author?.name || 'Saiful Islam';
  const url = `https://saifulislam.vercel.app/blog/${post.slug}`;
  const datePublished = new Date(post.publishedAt || Date.now()).toISOString();
  const dateModified = new Date(post.updatedAt || post.publishedAt || Date.now()).toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    image: post.seo?.openGraphImage || 'https://saifulislam.vercel.app/og-default.png',
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://saifulislam.vercel.app/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saiful Islam',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saifulislam.vercel.app/logo.png'
      }
    },
    datePublished,
    dateModified,
    keywords: post.seo?.focusKeyword 
      ? [post.seo.focusKeyword, ...(post.seo.secondaryKeywords || [])].join(', ') 
      : undefined
  };
};

export const generateFaqSchema = (faqs: any[]) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export const generateBreadcrumbSchema = (items: any[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};
