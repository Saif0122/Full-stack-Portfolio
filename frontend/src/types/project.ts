export type MediaType = 'image' | 'video' | 'gif';

export interface ProjectMedia {
  type: MediaType;
  url: string;
  alt?: string;
  caption?: string;
}

export interface Metric {
  label: string;
  value: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: string;
  benefit: string;
  version?: string;
}

export interface ProjectChallenges {
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
  image: string; // Cover image
  
  // Future-ready media gallery
  mediaGallery?: ProjectMedia[];
  
  // Repositories and Live Links
  githubUrl?: string;
  liveUrl?: string;
  
  metrics: Metric[];
  challenges: ProjectChallenges;
  technicalSpecs: TechnicalSpecs;
  stack: TechItem[];
  
  // Rich markdown for detailed case study route
  markdownContent?: string;
  
  // Optional scores out of 100
  performanceScore?: number;
  seoScore?: number;
  accessibilityScore?: number;
}
