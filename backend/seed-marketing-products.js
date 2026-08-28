import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Category from './models/category.model.js';
import Product from './models/product.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const products = [
  {
    slug: 'nexus-saas-boilerplate',
    title: 'Nexus SaaS Boilerplate',
    description: 'The ultimate Next.js SaaS boilerplate with authentication, payments, dashboard, and clean architecture built-in. Launch your startup in days, not months. Nexus provides everything you need to build and scale your next big idea, from Stripe subscriptions to Clerk authentication and Prisma ORM integrations.',
    shortDescription: 'Enterprise-grade Next.js SaaS Boilerplate',
    price: 199,
    salePrice: 149,
    categoryName: 'SaaS Boilerplates',
    categorySlug: 'boilerplates',
    features: [
      'Next.js 14 App Router',
      'Stripe Subscriptions & Webhooks',
      'Clerk Authentication Integration',
      'Prisma ORM & PostgreSQL setup',
      'Tailwind CSS & Shadcn UI Components',
      'Admin Dashboard & Analytics',
      'User Role Management',
      'Dark Mode Support out of the box'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Prisma', 'Stripe', 'Clerk'],
    version: '2.1.0',
    images: [{ url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' }],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 128,
    isPopular: true,
    isActive: true
  },
  {
    slug: 'chroma-ui-kit',
    title: 'Chroma UI Kit',
    description: 'A premium, beautifully designed UI kit for modern web applications. Features 100+ accessible components built on top of Radix UI and Tailwind CSS. Stop wasting time building standard components from scratch. Chroma provides beautifully animated, fully accessible elements that will make your application look professionally designed.',
    shortDescription: 'Premium React UI Component Library',
    price: 79,
    salePrice: null,
    categoryName: 'UI Kits & Components',
    categorySlug: 'ui-kits',
    features: [
      '100+ Hand-crafted Components',
      'Figma Source Files Included',
      'Fully Accessible (WCAG 2.1 AA)',
      'Dark Mode Optimized',
      'Fluid Framer Motion Animations',
      'Copy & Paste Ready Code',
      'Zero Dependencies (aside from Radix)'
    ],
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'TypeScript'],
    version: '1.4.0',
    images: [{ url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80' }],
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 84,
    isNewBadge: true,
    isActive: true
  },
  {
    slug: 'ai-prompt-engineer-pro',
    title: 'AI Prompt Engineer Pro',
    description: 'A comprehensive Notion database and video course teaching you how to master LLMs. Discover the exact frameworks used by AI engineers to consistently generate high-quality outputs from Claude, GPT-4, and Gemini. Includes over 500+ tested prompt templates for marketing, coding, and productivity.',
    shortDescription: 'Master LLMs with 500+ Tested Prompts & Course',
    price: 49,
    salePrice: 29,
    categoryName: 'Tools & Resources',
    categorySlug: 'tools',
    features: [
      '500+ Copy-paste Prompt Templates',
      '3 Hours of Video Masterclasses',
      'Notion Database Integration',
      'Chain-of-Thought Frameworks',
      'Few-shot Prompting Guides',
      'Lifetime Updates & New Prompts'
    ],
    technologies: ['Notion', 'OpenAI', 'Anthropic', 'Midjourney'],
    version: '1.0.0',
    images: [{ url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80' }],
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 312,
    isPopular: true,
    isActive: true
  },
  {
    slug: 'velocity-ecommerce-theme',
    title: 'Velocity E-Commerce Theme',
    description: 'The fastest, most conversion-optimized Shopify theme on the market. Velocity loads in under 1 second, features a flawless mobile checkout experience, and integrates beautifully with Shopify 2.0 sections. Perfect for modern D2C brands looking to scale their revenue.',
    shortDescription: 'High-Converting Headless Shopify Theme',
    price: 249,
    salePrice: 199,
    categoryName: 'Next.js Templates',
    categorySlug: 'templates',
    features: [
      'Sub-second Page Loads',
      'Conversion Optimized Checkout',
      'Shopify 2.0 Section Everywhere',
      'Built-in Mega Menus',
      'Color Swatches & Variant Pickers',
      'Predictive Search',
      '6 Months Premium Support'
    ],
    technologies: ['Shopify Liquid', 'Alpine.js', 'Tailwind CSS', 'GraphQL'],
    version: '3.0.2',
    images: [{ url: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=1200&q=80' }],
    thumbnail: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 45,
    isNewBadge: false,
    isActive: true
  }
];

const seedMarketingProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log('Connecting to database:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Seed Categories
    console.log('Seeding categories...');
    const categoryCache = {};
    for (const p of products) {
      if (!categoryCache[p.categorySlug]) {
        const cat = await Category.findOneAndUpdate(
          { slug: p.categorySlug },
          { name: p.categoryName, slug: p.categorySlug },
          { upsert: true, new: true }
        );
        categoryCache[p.categorySlug] = cat._id;
      }
    }
    console.log('✅ Categories seeded');

    console.log('Seeding premium marketing products...');
    for (const productData of products) {
      const { categoryName, categorySlug, ...data } = productData;
      data.category = categoryCache[categorySlug];
      
      await Product.findOneAndUpdate(
        { slug: data.slug },
        data,
        { upsert: true, new: true }
      );
      console.log(`- Created/Updated: ${data.title}`);
    }

    console.log('✅ Premium marketing products successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedMarketingProducts();
