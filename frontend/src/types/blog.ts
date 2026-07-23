export interface BlogAuthor {
  name: string;
  avatarUrl: string;
  role: string;
}

export interface BlogSeo {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywordDifficulty: string;
  schemaMarkup?: string;
  internalLinks: string[];
  externalLinks: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  clusterId?: string;
  isPillar?: boolean;
  date: string;
  updatedAt?: string;
  readTime: string;
  author: BlogAuthor;
  coverImage?: string;
  tags: string[];
  
  // Future capabilities
  draft?: boolean;
  featured?: boolean;
  trending?: boolean;
  
  // Content blocks
  content: string; // The HTML string we have right now
  markdownContent?: string; // Prepared for future MDX replacement
  mermaidDiagram?: string;
  
  // Technical specs
  githubRepo?: {
    owner: string;
    repo: string;
    stars: number;
    cta: string;
  };
  technicalSegments?: {
    architecturalDecisions: string;
    tradeOffs: string;
    bottlenecks: string;
    scalingStrategy: string;
    securityConsiderations: string;
    performanceOptimization: string;
    monitoring: string;
  };
  
  seo: BlogSeo;
}

export interface AuthorityCluster {
  id: string;
  name: string;
  pillarSlug: string;
  description: string;
}
