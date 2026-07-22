import { BlogPost } from '../types';

export const generateArticleSchema = (post: BlogPost) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://saiful.code/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": "https://saiful.code/og-image.png",
    "author": {
      "@type": "Person",
      "name": "Saiful Islam",
      "jobTitle": "Senior MERN Stack Developer & Full Stack Engineer",
      "url": "https://saiful.code"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nexus Technical Archives",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saiful.code/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "articleBody": post.content,
    "keywords": `MERN stack, SaaS architecture, ${post.seo.focusKeyword}`
  });
};

export const generateOrganizationSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Saiful Islam",
    "url": "https://saiful.code",
    "jobTitle": "Senior MERN Stack Developer & Full Stack Engineer",
    "description": "Expert in SaaS application development, scalable web applications, and high-performance MERN architecture.",
    "knowsAbout": ["MERN Stack", "Next.js", "MongoDB", "Node.js", "SaaS Architecture", "API Development"],
    "sameAs": [
      "https://github.com/saifulislam",
      "https://linkedin.com/in/saifulislam"
    ]
  });
};

export const generateFAQSchema = (faqs: { q: string, a: string }[]) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  });
};

export const generateBreadcrumbSchema = (items: { name: string, item: string }[]) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  });
};

export const generateWebSiteSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Saiful Islam Portfolio | Principal MERN Stack Developer",
    "url": "https://saiful.code",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://saiful.code/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  });
};
