import { Product } from '@/types/store';

export const STORE_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'templates', label: 'Next.js Templates' },
  { id: 'boilerplates', label: 'SaaS Boilerplates' },
  { id: 'ui-kits', label: 'UI Kits & Components' },
  { id: 'plugins', label: 'Plugins & Tools' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    slug: 'nexus-saas-boilerplate',
    title: 'Nexus SaaS Boilerplate',
    description: 'The ultimate Next.js SaaS boilerplate with authentication, payments, dashboard, and clean architecture built-in. Launch your startup in days, not months.',
    shortDescription: 'Enterprise-grade Next.js SaaS Boilerplate',
    price: 199,
    salePrice: 149,
    category: 'boilerplates',
    features: [
      'Next.js 14 App Router',
      'Stripe Subscriptions',
      'Clerk Authentication',
      'Prisma ORM & PostgreSQL',
      'Tailwind CSS & Shadcn UI',
      'Admin Dashboard',
      'User Management',
      'Dark Mode Support'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Prisma', 'Stripe'],
    version: '2.1.0',
    lastUpdated: new Date().toISOString(),
    images: ['/images/store/nexus-1.jpg', '/images/store/nexus-2.jpg'],
    thumbnail: '/images/store/nexus-thumb.jpg',
    rating: 4.9,
    reviewCount: 128,
    isPopular: true,
  },
  {
    id: 'prod_2',
    slug: 'chroma-ui-kit',
    title: 'Chroma UI Kit',
    description: 'A premium, beautifully designed UI kit for modern web applications. Features 100+ accessible components built on top of Radix UI and Tailwind CSS.',
    shortDescription: 'Premium React UI Component Library',
    price: 79,
    category: 'ui-kits',
    features: [
      '100+ Components',
      'Figma Files Included',
      'Fully Accessible (WCAG)',
      'Dark Mode Optimized',
      'Framer Motion Animations',
      'Copy & Paste Ready'
    ],
    technologies: ['React', 'Tailwind', 'Framer Motion', 'Radix UI'],
    version: '1.4.0',
    lastUpdated: new Date().toISOString(),
    images: ['/images/store/chroma-1.jpg'],
    thumbnail: '/images/store/chroma-thumb.jpg',
    rating: 4.8,
    reviewCount: 84,
    isNew: true,
  }
];
