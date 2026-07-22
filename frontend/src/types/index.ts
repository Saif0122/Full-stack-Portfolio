
export interface ProjectMetric {
  label: string;
  value: string | number;
  description?: string;
}

export interface TechnicalChallenge {
  problem: string;
  solution: string;
  architecture: string;
}

export interface TechnicalSpecs {
  backendStructure: string;
  databaseSchema: string;
  authStrategy: string;
  apiPrinciples: string;
  performanceOptimization: string;
  cachingStrategy: string;
  securityMeasures: string;
  deploymentStrategy: string;
  scalingStrategy: string;
  lessonsLearned: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  metrics: ProjectMetric[];
  challenges: TechnicalChallenge;
  technicalSpecs: TechnicalSpecs;
  stack: {
    name: string;
    category: 'frontend' | 'backend' | 'devops' | 'database' | 'ai';
    benefit: string;
  }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'ai';
  level: number;
}

export interface AuthorityCluster {
  id: string;
  name: string;
  pillarSlug: string;
  description: string;
}

export interface TechnicalSegments {
  architecturalDecisions: string;
  tradeOffs: string;
  bottlenecks: string;
  scalingStrategy: string;
  securityConsiderations: string;
  performanceOptimization: string;
  monitoring: string;
}

export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  schemaMarkup: string; // Stringified JSON-LD
  keywordDifficulty: string;
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
  readTime: string;
  content: string; // Markdown or complex HTML
  mermaidDiagram?: string;
  githubRepo?: {
    owner: string;
    repo: string;
    stars?: number;
    cta?: string;
  };
  technicalSegments: TechnicalSegments;
  seo: BlogSEO;
}

export interface Service {
  title: string;
  description: string;
}

export interface PricingPlan {
  title: string;
  description: string;
  price: string;
  features: string[];
  isHighlighted: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  // Fix: Added company field to match existing data and fix "Object literal may only specify known properties" errors in data/content.ts
  company: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
