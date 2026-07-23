import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'nexus-saas-core',
    title: 'Nexus SaaS Architecture',
    category: 'Architecture',
    summary: 'A highly scalable MERN stack modular monolith handling 50k+ req/sec.',
    description: 'Designed a multi-tenant SaaS foundation focusing on domain-driven design, isolated data partitions, and strict API contracts. Features RBAC, secure JWT rotation, and dynamic feature flagging.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Redis'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600',
    mediaGallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600', caption: 'System Architecture Dashboard' }
    ],
    githubUrl: 'https://github.com/saifulislam/nexus-saas-core',
    metrics: [
      { label: 'Throughput', value: '50k+', description: 'Requests per second' },
      { label: 'Uptime SLA', value: '99.99%', description: 'Multi-region failover' },
      { label: 'Cache Hit', value: '94%', description: 'Redis materialized views' }
    ],
    challenges: {
      problem: 'The legacy monolith suffered from tight coupling, making feature additions slow and causing memory leaks under high load.',
      solution: 'Re-architected the system into a Modular Monolith with clear bounded contexts and an event-driven internal bus.',
      architecture: 'Ports & Adapters (Hexagonal) architecture ensuring framework-agnostic business logic.'
    },
    technicalSpecs: {
      backendStructure: 'Domain-Driven Modular Monolith',
      databaseSchema: 'Multi-Tenant Discriminator Models',
      authStrategy: 'Asymmetric JWT + Secure Cookies',
      apiPrinciples: 'REST Level 3 (HATEOAS)',
      performanceOptimization: 'Redis Caching & Compound Indexing',
      cachingStrategy: 'Write-Through Cache',
      securityMeasures: 'Helmet, Rate Limiting, OWASP Top 10',
      deploymentStrategy: 'Dockerized AWS ECS',
      scalingStrategy: 'Horizontal Pod Autoscaling (HPA)',
      lessonsLearned: 'Decoupling early saves massive technical debt, but adds initial boilerplate overhead.'
    },
    stack: [
      { name: 'TypeScript', category: 'Language', benefit: 'Strict type safety and interface contracts', version: '5.0' },
      { name: 'Node.js', category: 'Backend', benefit: 'Asynchronous event-driven core', version: '20' },
      { name: 'Express', category: 'Backend', benefit: 'Lightweight HTTP server routing' },
      { name: 'MongoDB', category: 'Database', benefit: 'Flexible document schema for multi-tenant data' }
    ],
    performanceScore: 98,
    seoScore: 100,
    accessibilityScore: 100,
    markdownContent: `
## Architectural Deep Dive
The Nexus SaaS Core is designed around the principles of **Hexagonal Architecture**. 
By isolating the core domain logic from the infrastructure (HTTP, Databases), the system achieves extreme testability.

### Database Partitioning
We utilized a logical isolation strategy for multi-tenancy. Every document includes a \`tenant_id\`, and a strict Mongoose global middleware ensures all queries are scoped to the authenticated tenant.
`
  },
  {
    id: 'p2',
    slug: 'hyperstream-ws',
    title: 'HyperStream Real-Time',
    category: 'Real-Time Systems',
    summary: 'Sub-10ms latency WebSocket messaging engine for live dashboards.',
    description: 'Engineered a highly available bi-directional communication layer capable of syncing state across millions of active clients using Socket.io and Redis Pub/Sub.',
    tags: ['WebSockets', 'Redis', 'Express'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
    metrics: [
      { label: 'Latency', value: '<10ms', description: 'Message delivery time' },
      { label: 'Connections', value: '1M+', description: 'Concurrent WebSockets' },
      { label: 'Data Sync', value: '100%', description: 'State consistency guaranteed' }
    ],
    challenges: {
      problem: 'Scaling WebSockets across multiple Node.js processes without losing connection state or broadcasting duplicate messages.',
      solution: 'Integrated Redis Pub/Sub adapter to sync Socket.io events across horizontally scaled instances.',
      architecture: 'Distributed Pub/Sub event-driven architecture.'
    },
    technicalSpecs: {
      backendStructure: 'Microservice for WebSocket handling.',
      databaseSchema: 'Time-Series Data in MongoDB.',
      authStrategy: 'Socket.io Middleware JWT validation.',
      apiPrinciples: 'Event-Driven AsyncAPI.',
      performanceOptimization: 'Message batching and throttling.',
      cachingStrategy: 'In-memory state cache.',
      securityMeasures: 'WSS Encryption, Message sanitization.',
      deploymentStrategy: 'Kubernetes StatefulSets.',
      scalingStrategy: 'Load balanced via Nginx IP Hashing.',
      lessonsLearned: 'Always design for network partitions; client reconnect storms can easily crash the system without exponential backoff.'
    },
    stack: [
      { name: 'Socket.io', category: 'Real-Time', benefit: 'Robust WebSocket fallback & broadcasting' },
      { name: 'Redis Pub/Sub', category: 'Database', benefit: 'Cross-process message synchronization' }
    ],
    performanceScore: 95,
    seoScore: 90,
    accessibilityScore: 98
  },
  {
    id: 'p3',
    slug: 'data-vault-enterprise',
    title: 'DataVault Enterprise',
    category: 'Security & Database',
    summary: 'HIPAA-compliant, encrypted storage architecture for medical records.',
    description: 'Designed an advanced storage system utilizing MongoDB Field-Level Encryption (FLE) and strict RBAC to ensure 100% data privacy and compliance.',
    tags: ['MongoDB FLE', 'Crypto', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600',
    metrics: [
      { label: 'Encryption', value: 'AES-256', description: 'Military-grade security' },
      { label: 'API Response', value: '18ms', description: 'Internal p95 latency' },
      { label: 'Tenant Isolation', value: '100%', description: 'Verified middleware-level' }
    ],
    challenges: {
      problem: 'Preventing cross-tenant data leakage in a high-concurrency shared database.',
      solution: 'Implemented global Mongoose interceptors and tenant-aware drivers.',
      architecture: 'Hexagonal Monolith with domain-level isolation.'
    },
    technicalSpecs: {
      backendStructure: 'Modular Hexagonal structure.',
      databaseSchema: 'Discriminator-based multi-tenancy.',
      authStrategy: 'Secure JWT with rotation.',
      apiPrinciples: 'RESTful with strict schema validation.',
      performanceOptimization: 'Strict ESR indexing rules.',
      cachingStrategy: 'Redis materialized views.',
      securityMeasures: 'Field Level Encryption (FLE).',
      deploymentStrategy: 'AWS EKS.',
      scalingStrategy: 'Database sharding.',
      lessonsLearned: 'Middleware-driven isolation is more resilient than query-level logic.'
    },
    stack: [{ name: 'MongoDB', category: 'Database', benefit: 'High-performance multi-tenant storage' }]
  },
  {
    id: 'p4',
    slug: 'devboard-admin',
    title: 'DevBoard Admin Suite',
    category: 'B2B Tooling',
    summary: 'Custom web development of a high-performance admin dashboard for engineers.',
    description: 'Advanced admin interface for system monitoring and real-time log aggregation built with React.',
    tags: ['React', 'Tailwind', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1600',
    metrics: [], challenges: { problem: '', solution: '', architecture: '' }, technicalSpecs: { backendStructure: '', databaseSchema: '', authStrategy: '', apiPrinciples: '', performanceOptimization: '', cachingStrategy: '', securityMeasures: '', deploymentStrategy: '', scalingStrategy: '', lessonsLearned: '' }, stack: []
  },
  {
    id: 'p5',
    slug: 'clouddeploy-ci',
    title: 'CloudDeploy CI Platform',
    category: 'DevOps',
    summary: 'Scalable CI/CD orchestration engine for professional cloud deployments.',
    description: 'Containerized build environment featuring automated production-ready deployment triggers.',
    tags: ['Node.js', 'Docker', 'AWS'],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1600',
    metrics: [], challenges: { problem: '', solution: '', architecture: '' }, technicalSpecs: { backendStructure: '', databaseSchema: '', authStrategy: '', apiPrinciples: '', performanceOptimization: '', cachingStrategy: '', securityMeasures: '', deploymentStrategy: '', scalingStrategy: '', lessonsLearned: '' }, stack: []
  },
  {
    id: 'p6',
    slug: 'medsync-api',
    title: 'MedSync API Platform',
    category: 'Healthcare',
    summary: 'Secure healthcare API development services with FHIR compliance.',
    description: 'Secure data exchange API featuring strict medical-grade encryption and HIPAA-standard audit trails.',
    tags: ['Express', 'MongoDB', 'FHIR'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600',
    metrics: [], challenges: { problem: '', solution: '', architecture: '' }, technicalSpecs: { backendStructure: '', databaseSchema: '', authStrategy: '', apiPrinciples: '', performanceOptimization: '', cachingStrategy: '', securityMeasures: '', deploymentStrategy: '', scalingStrategy: '', lessonsLearned: '' }, stack: []
  },
  {
    id: 'p7',
    slug: 'educore-lms',
    title: 'EduCore LMS System',
    category: 'EdTech',
    summary: 'Custom web development of a global learning management platform.',
    description: 'Scalable LMS featuring course versioning, professional subscription management, and video streaming.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1600',
    metrics: [], challenges: { problem: '', solution: '', architecture: '' }, technicalSpecs: { backendStructure: '', databaseSchema: '', authStrategy: '', apiPrinciples: '', performanceOptimization: '', cachingStrategy: '', securityMeasures: '', deploymentStrategy: '', scalingStrategy: '', lessonsLearned: '' }, stack: []
  },
  {
    id: 'p8',
    slug: 'ecomedge-storefront',
    title: 'EcomEdge Storefront Pro',
    category: 'E-commerce',
    summary: 'High-performance headless e-commerce storefront development.',
    description: 'Blazing fast headless e-commerce frontend featuring real-time inventory sync and custom search.',
    tags: ['React', 'Redux', 'Shopify'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
    metrics: [], challenges: { problem: '', solution: '', architecture: '' }, technicalSpecs: { backendStructure: '', databaseSchema: '', authStrategy: '', apiPrinciples: '', performanceOptimization: '', cachingStrategy: '', securityMeasures: '', deploymentStrategy: '', scalingStrategy: '', lessonsLearned: '' }, stack: []
  }
];

export const PROJECT_CATEGORIES = ['All', 'Architecture', 'Real-Time Systems', 'Security & Database', 'B2B Tooling', 'DevOps', 'Healthcare', 'EdTech', 'E-commerce'];
