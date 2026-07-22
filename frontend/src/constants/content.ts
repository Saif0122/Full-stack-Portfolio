
import { Project, Skill, BlogPost, Service, PricingPlan, Testimonial, FAQItem, AuthorityCluster } from '../types';

export const CLUSTERS: AuthorityCluster[] = [
  { id: 'mern-arch', name: 'MERN Architecture Series', pillarSlug: 'mern-architecture-saas-scaling-2026', description: 'Mastering modular and scalable distributed systems.' },
  { id: 'next-perf', name: 'Next.js Performance Series', pillarSlug: 'nextjs-performance-optimization', description: 'Deep dives into rendering strategies and bundle size.' },
  { id: 'db-deep', name: 'MongoDB Deep Dive', pillarSlug: 'mongodb-aggregation-optimization', description: 'High-velocity data partitioning and schema design.' }
];

export const SERVICES: Service[] = [
  { title: 'SaaS Application Development', description: 'Architecting robust, multi-tenant SaaS platforms with extreme focus on scalability and modern system design.' },
  { title: 'Custom Web Development', description: 'Building bespoke, high-performance web applications tailored to complex enterprise business logic and user needs.' },
  { title: 'API Development Services', description: 'Building high-throughput REST & GraphQL API layers with strict contract validation and technical documentation.' },
  { title: 'Real-Time Web Applications', description: 'Implementing low-latency bi-directional communication using WebSockets for live features and dashboard feeds.' },
  { title: 'Microservices Architecture', description: 'Structuring applications with modular monolith or microservices patterns for independent scaling and high velocity.' },
  { title: 'MongoDB Performance Optimization', description: 'Fine-tuning query performance and MongoDB indexing strategies for massive production enterprise datasets.' },
  { title: 'Cloud Deployment (Vercel/AWS)', description: 'Managing serverless and containerized deployments with professional CI/CD pipelines and monitoring.' },
  { title: 'Full Stack Software Engineering', description: 'End-to-end engineering of digital products with a focus on clean code and maintainable software architecture.' },
  { title: 'Secure JWT Authentication', description: 'Implementing OIDC, JWT rotation, and OWASP-standard security layers for enterprise SaaS security.' },
  { title: 'Performance Engineering', description: 'Lighthouse-optimized frontend development and stress testing to ensure sub-100ms response times at scale.' }
];

//Blog page data stating

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'scaling-mongodb-1m-users',
    title: 'Scaling MongoDB for 1M+ Users: Expert Guide',
    excerpt: 'Advanced MongoDB performance optimization strategies including indexing, sharding, and query tuning for high-traffic SaaS apps.',
    category: 'Database',
    clusterId: 'db-deep',
    date: 'June 15, 2026',
    readTime: '12 min read',
    content: `<h2>Mastering the ESR Rule</h2><p>In high-velocity MERN systems, the database often becomes the primary bottleneck. To scale MongoDB to handle 1M+ active users, we must move beyond basic CRUD and implement the <strong>Equality, Sort, Range (ESR)</strong> rule for index design.</p><h3>Compound Index Optimization</h3><p>A compound index <code>{ status: 1, created_at: -1, price: 1 }</code> is optimized when the equality field comes first, followed by the sort order, and finally the range filter. This prevents large-scale collection scans and minimizes the "Scanned / Returned" ratio.</p><h3>Sharding and Partitioning</h3><p>Horizontal scaling via sharding requires a robust <strong>Shard Key</strong> strategy. Hashing the <code>tenant_id</code> or <code>user_id</code> ensures an even distribution of data across chunks, preventing "Hot Shards" in write-heavy applications.</p>`,
    mermaidDiagram: `graph TD
      A[Client App] --> B[Nginx Load Balancer]
      B --> C[Node.js API Instances]
      C --> D[MongoDB Mongos]
      D --> E[Shard 1 - Atlas]
      D --> F[Shard 2 - Atlas]
      D --> G[Shard 3 - Atlas]`,
    githubRepo: {
      owner: 'saifulislam',
      repo: 'mongodb-scaling-toolkit',
      stars: 420,
      cta: 'Explore Indexing Tools'
    },
    technicalSegments: {
      architecturalDecisions: 'Switched from vertical scaling to a 3-shard cluster on MongoDB Atlas with hashed shard keys.',
      tradeOffs: 'Higher architectural complexity vs absolute horizontal write scalability.',
      bottlenecks: 'Inefficient range queries on unindexed fields causing high p99 latency.',
      scalingStrategy: 'Sharding by TenantID to isolate high-traffic clients and ensure data locality.',
      securityConsiderations: 'Implementing Field-Level Encryption (FLE) for PII data and IP whitelisting.',
      performanceOptimization: 'Using Mongoose Lean queries and strict ESR indexing patterns.',
      monitoring: 'Real-time alerting via Atlas Metrics and custom Datadog dashboards.'
    },
    seo: {
      metaTitle: 'Scaling MongoDB for 1M+ Users | Senior Engineering Guide',
      metaDescription: 'Expert strategies for MongoDB scaling: ESR indexing, sharding, and performance tuning for MERN apps.',
      focusKeyword: 'Scaling MongoDB',
      keywordDifficulty: 'High',
      schemaMarkup: '',
      internalLinks: ['/blog/multi-tenant-saas-node'],
      externalLinks: ['https://www.mongodb.com/docs/manual/core/index-compound/']
    }
  },
  {
    id: 'blog-2',
    slug: 'multi-tenant-saas-node',
    title: 'Multi-Tenant SaaS Architecture with Node.js',
    excerpt: 'Professional isolation strategies and tenant-aware middleware for building production-ready scalable SaaS platforms.',
    category: 'Architecture',
    clusterId: 'mern-arch',
    date: 'June 10, 2026',
    readTime: '15 min read',
    content: `<h2>The Challenge of Multi-Tenancy</h2><p>Multi-tenancy is the backbone of modern SaaS. Whether you choose <strong>Logical Isolation</strong> (shared database) or <strong>Physical Isolation</strong> (separate databases), the goal remains the same: ensure no data leakage between customers.</p><h3>The Tenant Context Middleware</h3><p>In Node.js, we utilize <code>AsyncLocalStorage</code> or custom middleware to inject the <code>tenantId</code> into every database request. This creates a "Tenant Sandbox" where the application logic automatically filters results based on the authenticated context.</p><h3>Dynamic RBAC Implementation</h3><p>Scaling permissions requires a robust Role-Based Access Control (RBAC) engine. By storing permissions in a Redis cache, we can verify authorization in sub-5ms without taxing the primary database.</p>`,
    mermaidDiagram: `sequenceDiagram
      User->>API: Request with JWT
      API->>Middleware: Extract TenantID
      Middleware->>Context: Set Global Context
      Context->>DB: Query { tenantId: "ctx.id" }
      DB-->>User: Isolated Data`,
    githubRepo: {
      owner: 'saifulislam',
      repo: 'nexus-saas-core',
      stars: 850,
      cta: 'View SaaS Boilerplate'
    },
    technicalSegments: {
      architecturalDecisions: 'Adopted a "Single-DB, Logical Isolation" model with strict Mongoose middleware hooks.',
      tradeOffs: 'Cost efficiency vs potential risk of noisy neighbor issues.',
      bottlenecks: 'Middleware overhead during high-concurrency authentication cycles.',
      scalingStrategy: 'Using horizontal pod autoscaling (HPA) in Kubernetes for API workers.',
      securityConsiderations: 'Implementing row-level security and strict JWT validation with JTI blacklisting.',
      performanceOptimization: 'Materialized views in Redis to speed up per-tenant dashboards.',
      monitoring: 'Tenant-specific usage quotas and anomaly detection.'
    },
    seo: {
      metaTitle: 'Multi-Tenant SaaS Node.js Architecture | 2026 Guide',
      metaDescription: 'Build enterprise-grade multi-tenant apps with Node.js. Isolation, RBAC, and security deep dive.',
      focusKeyword: 'Multi-Tenant SaaS',
      keywordDifficulty: 'High',
      schemaMarkup: '',
      internalLinks: ['/blog/scaling-mongodb-1m-users'],
      externalLinks: []
    }
  },
  {
    id: 'mern-pillar-deep-dive',
    slug: 'mern-architecture-saas-scaling-2026',
    title: 'Scalable MERN Architecture: The 2026 Guide',
    excerpt: 'The definitive engineering guide to architecting modular, high-concurrency MERN systems and scalable web applications.',
    category: 'Architecture',
    clusterId: 'mern-arch',
    isPillar: true,
    date: 'June 12, 2026',
    readTime: '45 min read',
    content: `<h2>Architecting for the Future</h2><p>High-performance MERN architecture is no longer about just connecting four technologies. It is about <strong>Distributed Systems Design</strong>. In this first part, we focus on the foundation: Hexagonal Architecture (Ports and Adapters) in Node.js.</p><h3>Why Hexagonal?</h3><p>By decoupling your business logic from external drivers like MongoDB or Express, you make your system highly testable and resilient to technology swaps. Your "Core Domain" becomes a pure JavaScript engine that doesn't care about the HTTP layer.</p>`,
    technicalSegments: {
      architecturalDecisions: 'Implementing Hexagonal Architecture to isolate core business rules from infrastructure.',
      tradeOffs: 'Higher initial boilerplate vs significant long-term maintainability.',
      bottlenecks: 'Potential overhead of multiple abstraction layers.',
      scalingStrategy: 'Decoupled services allowed for independent vertical scaling of data-intensive modules.',
      securityConsiderations: 'Clean separation allows for easier auditing of sensitive domain logic.',
      performanceOptimization: 'Dependency injection for optimized mock testing and faster dev cycles.',
      monitoring: 'OpenTelemetry integration at the domain boundary.'
    },
    seo: {
      metaTitle: 'Designing Scalable MERN Architecture | Part 1: Foundation',
      metaDescription: 'Step-by-step guide to senior-level MERN architecture using Hexagonal patterns.',
      focusKeyword: 'MERN Architecture',
      keywordDifficulty: 'Extreme',
      schemaMarkup: '',
      internalLinks: ['/blog/mern-modular-vs-monolith'],
      externalLinks: []
    }
  },
  {
    id: 'blog-4',
    slug: 'mern-modular-vs-monolith',
    title: 'MERN Architecture: Modular vs Monolith (Part 2)',
    excerpt: 'Architectural comparison between modular structures and microservices in the MERN stack context.',
    category: 'Architecture',
    clusterId: 'mern-arch',
    date: 'June 20, 2026',
    readTime: '14 min read',
    content: `<p>Part 2 of our series explores the transition from a messy monolith to a clean, <strong>Modular Monolith</strong>. This approach provides the organizational benefits of microservices without the operational nightmare of distributed networking.</p><h3>Domain-Driven Design</h3><p>Grouping code by feature rather than layer (Controllers, Models, Services) creates high cohesion and low coupling. It allows teams to own specific vertical slices of the product.</p>`,
    technicalSegments: {
      architecturalDecisions: 'Chose a Modular Monolith over Microservices to maintain a single source of truth and reduce network latency.',
      tradeOffs: 'Single point of failure (shared process) vs deployment simplicity.',
      bottlenecks: 'Memory usage peaks when multiple heavy modules run in one container.',
      scalingStrategy: 'Namespace-based module loading for future microservice extraction.',
      securityConsiderations: 'Module-level isolation for auth and payment domains.',
      performanceOptimization: 'Shared memory caches for internal module communication.',
      monitoring: 'Per-module CPU and memory profiling.'
    },
    seo: {
      metaTitle: 'Modular Monolith vs Microservices in Node.js | Architecture',
      metaDescription: 'Deep dive into Modular Monolith architecture for Node.js and React applications.',
      focusKeyword: 'Modular Monolith',
      keywordDifficulty: 'Medium',
      schemaMarkup: '',
      internalLinks: ['/blog/mern-multi-tenant-design'],
      externalLinks: []
    }
  },
  {
    id: 'blog-5',
    slug: 'mern-multi-tenant-design',
    title: 'SaaS Multi-Tenant Design in MERN (Part 3)',
    excerpt: 'Detailed analysis of database partitioning and secure tenant context management in SaaS architecture.',
    category: 'Architecture',
    clusterId: 'mern-arch',
    date: 'June 25, 2026',
    readTime: '18 min read',
    content: `<p>Finalizing our architecture series, we dive deep into the <strong>Data Partitioning Layer</strong>. We examine the trade-offs between Schema-per-tenant, DB-per-tenant, and Discriminator-based multi-tenancy.</p><h3>Security at Scale</h3><p>We implement strict Mongoose Query Hooks to ensure every <code>find()</code> or <code>update()</code> call is automatically scoped to the current tenant, preventing the "forgotten where clause" security disaster.</p>`,
    technicalSegments: {
      architecturalDecisions: 'Selected Discriminator-based logical isolation for superior cost-to-scale ratio.',
      tradeOffs: 'Data volume in single collections vs operational simplicity.',
      bottlenecks: 'Large indexes potentially exceeding RAM on standard instances.',
      scalingStrategy: 'Database sharding combined with tenant-aware routing.',
      securityConsiderations: 'Mandatory tenantId check in every database middleware.',
      performanceOptimization: 'Prefixing all compound indexes with tenantId for faster filtered lookups.',
      monitoring: 'Cross-tenant query detection alerts.'
    },
    seo: {
      metaTitle: 'Secure Multi-Tenant Design in MERN | Part 3',
      metaDescription: 'Expert guide to database partitioning and security in multi-tenant SaaS.',
      focusKeyword: 'Multi-Tenant Design',
      keywordDifficulty: 'High',
      schemaMarkup: '',
      internalLinks: ['/blog/mern-architecture-saas-scaling-2026'],
      externalLinks: []
    }
  },
  {
    id: 'blog-6',
    slug: 'redis-caching-strategies',
    title: 'High-Performance Redis Caching in Node.js',
    excerpt: 'Advanced caching strategies: Materialized views and distributed locks for high-performance web apps.',
    category: 'DevOps',
    date: 'July 02, 2026',
    readTime: '10 min read',
    content: `<p>Caching is the most effective way to reduce p99 latency. However, naive caching leads to <strong>Cache Invalidation</strong> nightmares. In this post, we explore the <strong>Cache-Aside</strong> pattern and <strong>Write-Through</strong> caching.</p><h3>Materialized Views</h3><p>Instead of calculating dashboard metrics on every load, we pre-aggregate them and store them as JSON objects in Redis. This turns complex O(n) database operations into O(1) memory lookups.</p>`,
    mermaidDiagram: `graph LR
      A[Client] --> B[API]
      B -- 1. Check Cache --> C[Redis]
      C -- 2. Cache Miss --> D[MongoDB]
      D -- 3. Return Data --> B
      B -- 4. Update Cache --> C`,
    technicalSegments: {
      architecturalDecisions: 'Implemented Redis as a primary read-layer for analytical dashboards.',
      tradeOffs: 'Potential data stale-ness vs massive reduction in DB load.',
      bottlenecks: 'Redis memory exhaustion under high-throughput logging.',
      scalingStrategy: 'Redis Cluster with Master-Slave replication.',
      securityConsiderations: 'Encrypted payloads for sensitive cached data.',
      performanceOptimization: 'Using Redis Pipelines for bulk data retrieval.',
      monitoring: 'Cache hit/miss ratio tracking via Prometheus.'
    },
    seo: {
      metaTitle: 'Advanced Redis Caching in Node.js | Performance',
      metaDescription: 'Scale your MERN app with Redis. Materialized views and distributed locking.',
      focusKeyword: 'Redis Caching',
      keywordDifficulty: 'Medium',
      schemaMarkup: '',
      internalLinks: [],
      externalLinks: []
    }
  },
  {
    id: 'blog-7',
    slug: 'scaling-websockets-100k',
    title: 'Scaling WebSockets for 100k+ Connections',
    excerpt: 'Architectural patterns for horizontal WebSocket scaling in high-throughput real-time web applications.',
    category: 'Real-time',
    date: 'July 05, 2026',
    readTime: '22 min read',
    content: `<p>Scaling bi-directional communication requires more than just a <code>socket.io</code> server. When you move to multiple server instances, you need a way to synchronize messages across them. The answer is <strong>Redis Pub/Sub</strong>.</p><h3>The Sticky Session Problem</h3><p>WebSockets require a persistent handshake. We explore how to configure Nginx or AWS ALBs to handle sticky sessions correctly while allowing for horizontal scaling of the Node.js processes.</p>`,
    technicalSegments: {
      architecturalDecisions: 'Utilized Socket.io with the Redis adapter for cross-instance state synchronization.',
      tradeOffs: 'Increased infrastructure cost vs unified real-time experience.',
      bottlenecks: 'High memory usage of Node.js processes holding 100k open TCP connections.',
      scalingStrategy: 'Using small, horizontally-scaled containers to distribute connection weight.',
      securityConsiderations: 'Socket-level auth via middleware and rate limiting.',
      performanceOptimization: 'Binary message payloads via MsgPack.',
      monitoring: 'Real-time connection count and message throughput tracking.'
    },
    seo: {
      metaTitle: 'How to Scale WebSockets to 100k+ Users | Senior Engineering',
      metaDescription: 'Comprehensive guide to scaling real-time apps with Node.js and Redis.',
      focusKeyword: 'Scaling WebSockets',
      keywordDifficulty: 'High',
      schemaMarkup: '',
      internalLinks: ['/blog/redis-caching-strategies'],
      externalLinks: []
    }
  },
  {
    id: 'blog-8',
    slug: 'secure-jwt-auth-scale',
    title: 'Secure JWT Authentication at Enterprise Scale',
    excerpt: 'Implementing secure JWT patterns, refresh token rotation, and OIDC for enterprise SaaS platforms.',
    category: 'Security',
    date: 'July 10, 2026',
    readTime: '16 min read',
    content: `<p>Stateless authentication with JSON Web Tokens (JWT) is standard, but most implementations are insecure. We look at <strong>Refresh Token Rotation</strong> and how to effectively "Log out" a user in a stateless system.</p><h3>JTI Blacklisting</h3><p>By assigning a unique ID (JTI) to every token and checking it against a Redis blacklist, we can revoke individual tokens instantly without the overhead of session-based storage.</p>`,
    technicalSegments: {
      architecturalDecisions: 'Implemented Refresh Token Rotation with one-time use tokens.',
      tradeOffs: 'Higher auth complexity vs significantly reduced replay attack surface.',
      bottlenecks: 'Database lookups for user profile during every token refresh.',
      scalingStrategy: 'Distributing JWT signing keys via AWS Secrets Manager.',
      securityConsiderations: 'Strict CORS policies and Secure/HttpOnly/SameSite cookie attributes.',
      performanceOptimization: 'Asynchronous JTI cleanup tasks.',
      monitoring: 'Alerts for failed token rotation attempts (possible breach).'
    },
    seo: {
      metaTitle: 'Secure JWT Authentication for Enterprise Node.js',
      metaDescription: 'Best practices for JWT security, rotation, and revocation in MERN apps.',
      focusKeyword: 'JWT Authentication',
      keywordDifficulty: 'High',
      schemaMarkup: '',
      internalLinks: ['/blog/multi-tenant-saas-node'],
      externalLinks: []
    }
  },
  {
    id: 'blog-9',
    slug: 'deploying-nextjs-vercel-production',
    title: 'Deploying Production Next.js on Vercel',
    excerpt: 'Optimizing build pipelines and edge middleware for high-performance web apps on Vercel.',
    category: 'DevOps',
    date: 'July 15, 2026',
    readTime: '12 min read',
    content: `<p>Next.js 15 brings radical changes to how we deploy. We explore <strong>Edge Runtime</strong>, ISR caching strategies, and how to use <strong>Middleware</strong> for global A/B testing and security headers.</p><h3>Optimizing Build Performance</h3><p>We analyze how to reduce cold boot times for Serverless Functions and how to optimize bundle sizes for sub-second Core Web Vitals.</p>`,
    technicalSegments: {
      architecturalDecisions: 'Moved heavy logic to Edge Middleware to reduce latency for global users.',
      tradeOffs: 'Edge runtime limitations vs lightning-fast initial responses.',
      bottlenecks: 'Next.js build times on large monorepos.',
      scalingStrategy: 'Utilizing Vercel ISR for static-performance with dynamic data.',
      securityConsiderations: 'CSP headers and environment variable protection.',
      performanceOptimization: 'Aggressive image optimization and font self-hosting.',
      monitoring: 'Vercel Analytics and Core Web Vitals tracking.'
    },
    seo: {
      metaTitle: 'Next.js 15 Production Deployment Guide | Vercel',
      metaDescription: 'Professional guide to deploying and optimizing Next.js on Vercel.',
      focusKeyword: 'Next.js Deployment',
      keywordDifficulty: 'Medium',
      schemaMarkup: '',
      internalLinks: ['/blog/scaling-mongodb-1m-users'],
      externalLinks: ['https://nextjs.org/docs/app/building-your-application/deploying']
    }
  }
];

//Project section starting 

export const PROJECTS: Project[] = [
  {
    id: 'p2',
    slug: 'finflow-analytics',
    title: 'FinFlow Analytics Pro',
    category: 'FinTech Dashboard',
    summary: 'High-performance real-time financial analytics dashboard handling 100k+ daily active users.',
    description: 'A high-depth analytics platform and scalable web application featuring advanced MongoDB aggregation pipelines and real-time WebSocket streaming.',
    tags: ['Next.js', 'MongoDB', 'Redis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    metrics: [
      { label: 'Active Users', value: '100k+', description: 'Concurrent daily traffic' },
      { label: 'Latency', value: '45ms', description: 'Avg data refresh rate' }
    ],
    challenges: {
      problem: 'Processing 1M+ financial events per hour without blocking the Node.js event loop.',
      solution: 'Offloaded aggregation to MongoDB replicas and used Redis for high-speed materialized views.',
      architecture: 'Distributed micro-services with edge-caching for massive scale.'
    },
    technicalSpecs: {
      backendStructure: 'Modular Node.js services.',
      databaseSchema: 'Optimized MongoDB time-series collections.',
      authStrategy: 'Secure JWT with MFA.',
      apiPrinciples: 'REST with auto-generated OpenAPI docs.',
      performanceOptimization: 'Pre-computed metrics in Redis.',
      cachingStrategy: 'Multi-layer Cache-Aside pattern.',
      securityMeasures: 'End-to-end encryption for financial data.',
      deploymentStrategy: 'Vercel for frontend, AWS ECS for backend.',
      scalingStrategy: 'Horizontal pod autoscaling (HPA).',
      lessonsLearned: 'Materialized views in Redis are critical for low-latency analytics.'
    },
    stack: [
      { name: 'Next.js', category: 'frontend', benefit: 'SSR for SEO and extreme speed' },
      { name: 'Redis', category: 'backend', benefit: 'High-performance materialized views' }
    ]
  },
  {
    id: 'p3',
    slug: 'scalechat-pro',
    title: 'ScaleChat Pro Engine',
    category: 'Communication Engine',
    summary: 'Scalable real-time messaging infrastructure built with Node.js and WebSockets.',
    description: 'Enterprise communication platform supporting 50k+ concurrent connections using a scalable multi-node WebSocket architecture.',
    tags: ['Node.js', 'Socket.io', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1600',
    metrics: [
      { label: 'Concurrent Sockets', value: '50k+', description: 'Per instance limit' },
      { label: 'Message Queue', value: 'Sub-10ms', description: 'Delivery latency' }
    ],
    challenges: {
      problem: 'Maintaining persistent socket state across horizontally scaled Node.js instances.',
      solution: 'Implemented Redis Pub/Sub as a cross-instance event bridge.',
      architecture: 'Event-driven system design with sticky-session load balancing.'
    },
    technicalSpecs: {
      backendStructure: 'Event-driven Socket bridge.',
      databaseSchema: 'Normalized PostgreSQL for message persistence.',
      authStrategy: 'Token-based WebSocket auth.',
      apiPrinciples: 'Asynchronous event patterns.',
      performanceOptimization: 'Binary MessagePack serialization.',
      cachingStrategy: 'User presence tracking in Redis.',
      securityMeasures: 'Global rate limiting per connection.',
      deploymentStrategy: 'Kubernetes orchestration.',
      scalingStrategy: 'Horizontal scaling via Redis Pub/Sub.',
      lessonsLearned: 'Decoupling message routing from the socket process is key to scale.'
    },
    stack: [
      { name: 'Socket.io', category: 'backend', benefit: 'Reliable bi-directional communication' },
      { name: 'PostgreSQL', category: 'database', benefit: 'ACID compliant persistence' }
    ]
  },
  {
    id: 'p1',
    slug: 'nexus-saas',
    title: 'NexusTenant SaaS OS',
    category: 'Multi-Tenant SaaS',
    summary: 'Enterprise SaaS architecture with logic-isolated multi-tenancy and RBAC.',
    description: 'A massive SaaS application development platform featuring secure multi-tenant architecture and dynamic role-based access control.',
    tags: ['Node.js', 'MongoDB', 'Redis'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
    metrics: [
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
    stack: [{ name: 'MongoDB', category: 'database', benefit: 'High-performance multi-tenant storage' }]
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

//Skills fata starting

export const SKILLS: Skill[] = [
  { name: 'MERN Stack', category: 'backend', level: 98 },
  { name: 'Next.js 15', category: 'frontend', level: 95 },
  { name: 'SaaS Architecture', category: 'backend', level: 90 },
  { name: 'MongoDB Optimization', category: 'backend', level: 88 },
  { name: 'Cloud & DevOps', category: 'devops', level: 85 },
  { name: 'API Development', category: 'backend', level: 92 }
];

//Pricing data starting


export const PRICING_PLANS: PricingPlan[] = [
  {
    title: '🚀 Frontend Experience Package',
    description: 'For brands that need fast, modern, conversion-focused frontend experiences.',
    price: '$100',
    features: [
      'Pixel-perfect UI implementation (Figma to Code)',

      'Responsive Web Design (Mobile-first)',

      'React / Next.js Development',

      'Modern UI with Tailwind CSS',

      'Smooth Animations (Framer Motion)',

      'Performance Optimization',

      'API Integration (Frontend side)',

      'SEO-friendly structure',
    ],
    isHighlighted: false
  },
  {
    title: '⚡ Interactive Web Application',
    description: 'For businesses that need dynamic, scalable frontend applications.',
    price: '$2000',
    features: [
      'Multi-page React / Next.js apps',

      'Dashboard UI',

      'State management (Redux / Context API)',

      'Authentication (Frontend logic)',

      'Third-party API integrations',

      'Charts, data visualization',

      'Advanced animations',

      'Accessibility optimization',
      'Clean, scalable component architecture'],
    isHighlighted: true
  },
  {
    title: '🏆Custom Full-Stack Build',
    description: 'For startups, SaaS platforms, or businesses that need a tailored frontend experience or a complete MERN stack solution.',
    price: '$5000+',
    features: ['Fully custom React / Next.js application',

      'Advanced UI/UX implementation',

      'Complex API integrations',

      'Full MERN stack architecture',

      'Authentication & role-based access',

      'Admin dashboards',

      'Performance & scalability optimization',

      'Deployment & infrastructure setup',

      'Ongoing support & maintenance'
    ],
    isHighlighted: false
  }
];


//Testimonial data starting here

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Alex Rivera', role: 'CEO', company: 'FinTech Cloud', quote: 'Saifuls expertise in SaaS application development saved us months. His multi-tenant architecture is world-class.', rating: 5 },
  { name: 'Sarah Chen', role: 'CTO', company: 'StreamLine', quote: 'The real-time messaging engine he built handles our massive traffic perfectly. A true MongoDB expert.', rating: 5 },
  { name: 'Michael Vogt', role: 'VP Engineering', company: 'GlobalSync', quote: 'Professional MERN stack developer. Our custom web development project was delivered with zero bottlenecks.', rating: 5 },
  { name: 'Jessica Miller', role: 'Founder', company: 'HealthNode', quote: 'Exceptional API development services. Security and performance were handled with extreme precision.', rating: 5 },
  { name: 'David Park', role: 'Director', company: 'EduCore', quote: 'Surgical cloud deployment on AWS. Saiful is a senior full stack engineer who understands business scale.', rating: 5 }
];

export const FAQS: FAQItem[] = [
  { question: 'What is your specialty as a MERN stack developer?', answer: 'I specialize in SaaS application development and building scalable web applications with high-concurrency Node.js backends and optimized MongoDB schemas.' },
  { question: 'How do you ensure SaaS scalability?', answer: 'Via professional multi-tenant architecture, horizontal pod scaling on cloud providers, and advanced Redis caching strategies.' },
  { question: 'Do you offer API development services?', answer: 'Yes, I engineer scalable REST and GraphQL APIs with strict security standards, secure JWT authentication, and comprehensive documentation.' },
  { question: 'How do you optimize MongoDB performance?', answer: 'By applying strict ESR indexing rules, query profiling, and horizontal sharding strategies for large-scale enterprise data.' },
  { question: 'Why use Next.js for web development?', answer: 'Next.js provides superior SSR for SEO, optimized bundle sizes, and the high performance required for modern production web apps.' },
  { question: 'What cloud platforms do you support?', answer: 'I am an expert in Vercel for frontend hosting and AWS for complex containerized microservices and database infrastructure.' },
  { question: 'How long does custom web development take?', answer: 'For a production-ready SaaS MVP, typical timelines range from 6 to 12 weeks depending on the architectural complexity.' },
  { question: 'Do you provide security audits?', answer: 'Yes, I implement security-first engineering, including JWT rotation, CORS hardening, and protection against OWASP Top 10 vulnerabilities.' }
];
