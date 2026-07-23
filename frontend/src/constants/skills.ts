import { Skill } from '@/types/skills';

export const SKILL_DATABASE: Skill[] = [
  // Frontend
  {
    id: 'fe-1',
    name: 'Next.js (App Router)',
    category: 'Frontend',
    level: 'Expert',
    yearsOfExperience: 3,
    projectCount: 15,
    description: 'Server-side rendering, API routes, and optimized build patterns.'
  },
  {
    id: 'fe-2',
    name: 'React Architecture',
    category: 'Frontend',
    level: 'Expert',
    yearsOfExperience: 4,
    projectCount: 25,
    description: 'Component-driven design, hooks, and scalable frontend structure.'
  },
  {
    id: 'fe-3',
    name: 'Performance Optimization',
    category: 'Frontend',
    level: 'Advanced',
    yearsOfExperience: 3,
    projectCount: 12,
    description: 'Lighthouse audits, bundle splitting, and rendering optimization.'
  },
  {
    id: 'fe-4',
    name: 'SSR / ISR',
    category: 'Frontend',
    level: 'Advanced',
    yearsOfExperience: 3,
    projectCount: 10,
    description: 'Dynamic data fetching strategies for high-SEO web apps.'
  },
  {
    id: 'fe-5',
    name: 'State Management',
    category: 'Frontend',
    level: 'Expert',
    yearsOfExperience: 4,
    projectCount: 20,
    description: 'Redux, Zustand, and Context API for complex application state.'
  },

  // Backend
  {
    id: 'be-1',
    name: 'Node.js & Express',
    category: 'Backend',
    level: 'Expert',
    yearsOfExperience: 4,
    projectCount: 30,
    description: 'Scalable RESTful services, middleware architecture, and event loop optimization.'
  },
  {
    id: 'be-2',
    name: 'REST & GraphQL Design',
    category: 'Backend',
    level: 'Advanced',
    yearsOfExperience: 3,
    projectCount: 18,
    description: 'Strict API contracts, Apollo server, and precise endpoint design.'
  },
  {
    id: 'be-3',
    name: 'WebSocket Systems',
    category: 'Backend',
    level: 'Advanced',
    yearsOfExperience: 2,
    projectCount: 8,
    description: 'Real-time bi-directional communication using Socket.io.'
  },
  {
    id: 'be-4',
    name: 'JWT & OIDC Auth',
    category: 'Backend',
    level: 'Expert',
    yearsOfExperience: 4,
    projectCount: 25,
    description: 'Secure token-based authentication and role-based access control.'
  },
  {
    id: 'be-5',
    name: 'Middleware Architecture',
    category: 'Backend',
    level: 'Expert',
    yearsOfExperience: 4,
    projectCount: 20,
    description: 'Custom request interceptors, logging, and error handling layers.'
  },

  // Database
  {
    id: 'db-1',
    name: 'MongoDB Indexing',
    category: 'Database',
    level: 'Expert',
    yearsOfExperience: 3,
    projectCount: 15,
    description: 'Compound indexes, ESR rule, and query execution planning.'
  },
  {
    id: 'db-2',
    name: 'Aggregation Pipelines',
    category: 'Database',
    level: 'Advanced',
    yearsOfExperience: 3,
    projectCount: 12,
    description: 'Complex data transformations and multi-stage queries.'
  },
  {
    id: 'db-3',
    name: 'NoSQL Schema Design',
    category: 'Database',
    level: 'Expert',
    yearsOfExperience: 4,
    projectCount: 20,
    description: 'Data modeling, denormalization vs embedding strategies.'
  },
  {
    id: 'db-4',
    name: 'Query Performance Tuning',
    category: 'Database',
    level: 'Advanced',
    yearsOfExperience: 3,
    projectCount: 10,
    description: 'Identifying bottlenecks using explain plans and query profiling.'
  },

  // DevOps
  {
    id: 'do-1',
    name: 'Vercel / AWS Deployment',
    category: 'DevOps',
    level: 'Advanced',
    yearsOfExperience: 3,
    projectCount: 20,
    description: 'Serverless deployment, edge networking, and containerization basics.'
  },
  {
    id: 'do-2',
    name: 'CI/CD Pipelines',
    category: 'DevOps',
    level: 'Intermediate',
    yearsOfExperience: 2,
    projectCount: 10,
    description: 'Automated testing and deployment using GitHub Actions.'
  },
  {
    id: 'do-3',
    name: 'System Monitoring',
    category: 'DevOps',
    level: 'Intermediate',
    yearsOfExperience: 2,
    projectCount: 8,
    description: 'Uptime tracking, error alerts, and basic observability.'
  },
  {
    id: 'do-4',
    name: 'Log Aggregation',
    category: 'DevOps',
    level: 'Intermediate',
    yearsOfExperience: 2,
    projectCount: 5,
    description: 'Centralized error logging across distributed services.'
  }
];

export const SKILL_CATEGORIES: Array<{ id: string; label: string }> = [
  { id: 'All', label: 'All Technologies' },
  { id: 'Frontend', label: 'Frontend' },
  { id: 'Backend', label: 'Backend' },
  { id: 'Database', label: 'Database' },
  { id: 'DevOps', label: 'DevOps' }
];
