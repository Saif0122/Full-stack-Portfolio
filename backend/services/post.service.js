import { PostRepository } from '../repositories/post.repository.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Category from '../models/category.model.js';
import Tag from '../models/tag.model.js';

const postRepo = new PostRepository();

export class PostService {
  constructor() {
    this.seedPostsIfEmpty();
  }

  async seedPostsIfEmpty() {
    try {
      const count = await Post.countDocuments();
      if (count > 0) return;

      console.log('Seeding initial Enterprise Blog data...');
      
      // Seed Author
      let author = await User.findOne({ email: 'saiful@example.com' });
      if (!author) {
        author = await User.create({
          name: 'Saiful Islam',
          email: 'saiful@example.com',
          password: 'Password123!',
          jobTitle: 'Principal Software Architect',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        });
      }

      // Seed Categories
      const catDB = await Category.findOneAndUpdate({ name: 'Database' }, { name: 'Database', slug: 'database' }, { upsert: true, new: true });
      const catArch = await Category.findOneAndUpdate({ name: 'Architecture' }, { name: 'Architecture', slug: 'architecture' }, { upsert: true, new: true });

      // Seed Tags
      const tagMongo = await Tag.findOneAndUpdate({ name: 'MongoDB' }, { name: 'MongoDB', slug: 'mongodb' }, { upsert: true, new: true });
      const tagScaling = await Tag.findOneAndUpdate({ name: 'Scaling' }, { name: 'Scaling', slug: 'scaling' }, { upsert: true, new: true });
      const tagSaaS = await Tag.findOneAndUpdate({ name: 'SaaS' }, { name: 'SaaS', slug: 'saas' }, { upsert: true, new: true });
      const tagNode = await Tag.findOneAndUpdate({ name: 'Node.js' }, { name: 'Node.js', slug: 'node-js' }, { upsert: true, new: true });
      const tagArch = await Tag.findOneAndUpdate({ name: 'Architecture' }, { name: 'Architecture', slug: 'architecture-tag' }, { upsert: true, new: true });
      const tagMern = await Tag.findOneAndUpdate({ name: 'MERN' }, { name: 'MERN', slug: 'mern' }, { upsert: true, new: true });
      const tagSys = await Tag.findOneAndUpdate({ name: 'System Design' }, { name: 'System Design', slug: 'system-design' }, { upsert: true, new: true });

      // Seed Posts
      await Post.create([
        {
          slug: 'scaling-mongodb-1m-users',
          title: 'Scaling MongoDB for 1M+ Users: Expert Guide',
          excerpt: 'Advanced MongoDB performance optimization strategies including indexing, sharding, and query tuning for high-traffic SaaS apps.',
          content: `<h2>Mastering the ESR Rule</h2><p>In high-velocity MERN systems, the database often becomes the primary bottleneck.</p>`,
          markdownContent: `## Mastering the ESR Rule\nIn high-velocity MERN systems, the database often becomes the primary bottleneck. To scale MongoDB to handle 1M+ active users, we must move beyond basic CRUD and implement the **Equality, Sort, Range (ESR)** rule for index design.\n\n### Compound Index Optimization\nA compound index \`{ status: 1, created_at: -1, price: 1 }\` is optimized when the equality field comes first, followed by the sort order, and finally the range filter. This prevents large-scale collection scans and minimizes the "Scanned / Returned" ratio.\n\n### Sharding and Partitioning\nHorizontal scaling via sharding requires a robust **Shard Key** strategy. Hashing the \`tenant_id\` or \`user_id\` ensures an even distribution of data across chunks, preventing "Hot Shards" in write-heavy applications.`,
          coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1600',
          author: author._id,
          category: catDB._id,
          tags: [tagMongo._id, tagScaling._id, tagSaaS._id],
          status: 'published',
          clusterId: 'db-deep',
          readTime: '12 min read',
          mermaidDiagram: `graph TD\n  A[Client App] --> B[Nginx Load Balancer]\n  B --> C[Node.js API Instances]\n  C --> D[MongoDB Mongos]\n  D --> E[Shard 1 - Atlas]\n  D --> F[Shard 2 - Atlas]\n  D --> G[Shard 3 - Atlas]`,
          githubRepo: { owner: 'saifulislam', repo: 'mongodb-scaling-toolkit', stars: 420, cta: 'Explore Indexing Tools' },
          technicalSegments: {
            architecturalDecisions: 'Switched from vertical scaling to a 3-shard cluster on MongoDB Atlas with hashed shard keys.',
            tradeOffs: 'Higher architectural complexity vs absolute horizontal write scalability.',
            bottlenecks: 'Inefficient range queries on unindexed fields causing high p99 latency.',
            scalingStrategy: 'Sharding by TenantID to isolate high-traffic clients and ensure data locality.',
            securityConsiderations: 'Implementing Field-Level Encryption (FLE) for PII data and IP whitelisting.',
            performanceOptimization: 'Using Mongoose Lean queries and strict ESR indexing patterns.',
            monitoring: 'Real-time alerting via Atlas Metrics and custom Datadog dashboards.'
          },
          seo: { metaTitle: 'Scaling MongoDB for 1M+ Users | Senior Engineering Guide', metaDescription: 'Expert strategies for MongoDB scaling: ESR indexing, sharding, and performance tuning for MERN apps.', focusKeyword: 'Scaling MongoDB', keywordDifficulty: 'High', internalLinks: ['/blog/multi-tenant-saas-node'], externalLinks: ['https://www.mongodb.com/docs/manual/core/index-compound/'] }
        },
        {
          slug: 'multi-tenant-saas-node',
          title: 'Multi-Tenant SaaS Architecture with Node.js',
          excerpt: 'Professional isolation strategies and tenant-aware middleware for building production-ready scalable SaaS platforms.',
          content: `<h2>The Challenge of Multi-Tenancy</h2>`,
          markdownContent: `## The Challenge of Multi-Tenancy\nMulti-tenancy is the backbone of modern SaaS. Whether you choose **Logical Isolation** (shared database) or **Physical Isolation** (separate databases), the goal remains the same: ensure no data leakage between customers.\n\n### The Tenant Context Middleware\nIn Node.js, we utilize \`AsyncLocalStorage\` or custom middleware to inject the \`tenantId\` into every database request. This creates a "Tenant Sandbox" where the application logic automatically filters results based on the authenticated context.\n\n### Dynamic RBAC Implementation\nScaling permissions requires a robust Role-Based Access Control (RBAC) engine. By storing permissions in a Redis cache, we can verify authorization in sub-5ms without taxing the primary database.`,
          coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600',
          author: author._id,
          category: catArch._id,
          tags: [tagArch._id, tagSaaS._id, tagNode._id],
          status: 'published',
          clusterId: 'mern-arch',
          readTime: '15 min read',
          mermaidDiagram: `sequenceDiagram\n  User->>API: Request with JWT\n  API->>Middleware: Extract TenantID\n  Middleware->>Context: Set Global Context\n  Context->>DB: Query { tenantId: "ctx.id" }\n  DB-->>User: Isolated Data`,
          githubRepo: { owner: 'saifulislam', repo: 'nexus-saas-core', stars: 850, cta: 'View SaaS Boilerplate' },
          technicalSegments: {
            architecturalDecisions: 'Adopted a "Single-DB, Logical Isolation" model with strict Mongoose middleware hooks.',
            tradeOffs: 'Cost efficiency vs potential risk of noisy neighbor issues.',
            bottlenecks: 'Middleware overhead during high-concurrency authentication cycles.',
            scalingStrategy: 'Using horizontal pod autoscaling (HPA) in Kubernetes for API workers.',
            securityConsiderations: 'Implementing row-level security and strict JWT validation with JTI blacklisting.',
            performanceOptimization: 'Materialized views in Redis to speed up per-tenant dashboards.',
            monitoring: 'Tenant-specific usage quotas and anomaly detection.'
          },
          seo: { metaTitle: 'Multi-Tenant SaaS Node.js Architecture | 2026 Guide', metaDescription: 'Build enterprise-grade multi-tenant apps with Node.js. Isolation, RBAC, and security deep dive.', focusKeyword: 'Multi-Tenant SaaS' }
        },
        {
          slug: 'mern-architecture-saas-scaling-2026',
          title: 'Scalable MERN Architecture: The 2026 Guide',
          excerpt: 'The definitive engineering guide to architecting modular, high-concurrency MERN systems and scalable web applications.',
          content: `<h2>Architecting for the Future</h2>`,
          markdownContent: `## Architecting for the Future\nHigh-performance MERN architecture is no longer about just connecting four technologies. It is about **Distributed Systems Design**. In this first part, we focus on the foundation: Hexagonal Architecture (Ports and Adapters) in Node.js.\n\n### Why Hexagonal?\nBy decoupling your business logic from external drivers like MongoDB or Express, you make your system highly testable and resilient to technology swaps. Your "Core Domain" becomes a pure JavaScript engine that doesn't care about the HTTP layer.`,
          coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
          author: author._id,
          category: catArch._id,
          tags: [tagMern._id, tagScaling._id, tagSys._id],
          status: 'published',
          clusterId: 'mern-arch',
          isPillar: true,
          readTime: '45 min read',
          technicalSegments: {
            architecturalDecisions: 'Implementing Hexagonal Architecture to isolate core business rules from infrastructure.',
            tradeOffs: 'Higher initial boilerplate vs significant long-term maintainability.',
            bottlenecks: 'Potential overhead of multiple abstraction layers.',
            scalingStrategy: 'Decoupled services allowed for independent vertical scaling of data-intensive modules.',
            securityConsiderations: 'Clean separation allows for easier auditing of sensitive domain logic.',
            performanceOptimization: 'Dependency injection for optimized mock testing and faster dev cycles.',
            monitoring: 'OpenTelemetry integration at the domain boundary.'
          },
          seo: { metaTitle: 'Designing Scalable MERN Architecture | Part 1: Foundation' }
        }
      ]);
      console.log('Blog seeding complete!');
    } catch (e) {
      console.error('Failed to seed blog posts', e);
    }
  }

  async getAllPosts(filter = {}) {
    // Populate with actual object references
    const posts = await postRepo.findAll({ ...filter, status: 'published' });
    return posts.map(this._mapPostToFrontend);
  }

  async getPostById(id) {
    const post = await postRepo.findById(id);
    return post ? this._mapPostToFrontend(post) : null;
  }

  async getPostBySlug(slug) {
    const post = await postRepo.findBySlug(slug);
    return post ? this._mapPostToFrontend(post) : null;
  }

  async createPost(data) {
    return await postRepo.create(data);
  }

  async updatePost(id, data) {
    return await postRepo.update(id, data);
  }

  async deletePost(id) {
    return await postRepo.delete(id);
  }

  // Mapper to convert populated MongoDB docs into exact frontend UI format
  _mapPostToFrontend(post) {
    const p = post.toObject();
    return {
      id: p._id.toString(),
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      markdownContent: p.markdownContent,
      coverImage: p.coverImage,
      date: new Date(p.publishedAt || p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: p.readTime || '10 min read',
      isPillar: p.isPillar,
      clusterId: p.clusterId,
      mermaidDiagram: p.mermaidDiagram,
      githubRepo: p.githubRepo,
      technicalSegments: p.technicalSegments,
      seo: p.seo,
      // Map populated fields to strings
      category: p.category ? p.category.name : 'Engineering',
      tags: p.tags ? p.tags.map(t => t.name) : [],
      author: p.author ? {
        name: p.author.name,
        role: p.author.jobTitle || 'Engineer',
        avatarUrl: p.author.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
      } : null
    };
  }
}
