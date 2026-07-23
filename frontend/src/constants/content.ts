import { Skill, Service, PricingPlan, Testimonial, FAQItem } from '../types';
export { PROJECTS } from './projects';
export { BLOG_POSTS, CLUSTERS } from './blog';

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

// Blog posts migrated to constants/blog.ts


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
