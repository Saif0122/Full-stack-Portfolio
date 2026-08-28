import { ProductRepository } from '../repositories/product.repository.js';
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

const productRepo = new ProductRepository();

export class ProductService {
  constructor() {
    this.seedProductsIfEmpty();
  }

  async seedProductsIfEmpty() {
    try {
      const count = await Product.countDocuments();
      if (count > 0) return;

      console.log('Seeding initial Enterprise Developer Store data...');
      
      // Seed Categories matching constants
      const catBoiler = await Category.findOneAndUpdate({ name: 'SaaS Boilerplates' }, { name: 'SaaS Boilerplates', slug: 'boilerplates' }, { upsert: true, new: true });
      const catUI = await Category.findOneAndUpdate({ name: 'UI Kits & Components' }, { name: 'UI Kits & Components', slug: 'ui-kits' }, { upsert: true, new: true });
      const catTools = await Category.findOneAndUpdate({ name: 'Tools & Resources' }, { name: 'Tools & Resources', slug: 'tools' }, { upsert: true, new: true });
      const catTemplates = await Category.findOneAndUpdate({ name: 'Next.js Templates' }, { name: 'Next.js Templates', slug: 'templates' }, { upsert: true, new: true });

      // Seed Products
      await Product.create([
        {
          slug: 'nexus-saas-boilerplate',
          title: 'Nexus SaaS Boilerplate',
          description: 'The ultimate Next.js SaaS boilerplate with authentication, payments, dashboard, and clean architecture built-in. Launch your startup in days, not months. Nexus provides everything you need to build and scale your next big idea, from Stripe subscriptions to Clerk authentication and Prisma ORM integrations.',
          shortDescription: 'Enterprise-grade Next.js SaaS Boilerplate',
          price: 199,
          salePrice: 149,
          category: catBoiler._id,
          features: [
            'Next.js 14 App Router',
            'Stripe Subscriptions & Webhooks',
            'Clerk Authentication',
            'Prisma ORM & PostgreSQL',
            'Tailwind CSS & Shadcn UI',
            'Admin Dashboard',
            'User Management',
            'Dark Mode Support'
          ],
          technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Prisma', 'Stripe'],
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
          category: catUI._id,
          features: [
            '100+ Hand-crafted Components',
            'Figma Source Files Included',
            'Fully Accessible (WCAG 2.1 AA)',
            'Dark Mode Optimized',
            'Fluid Framer Motion Animations',
            'Copy & Paste Ready'
          ],
          technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Radix UI'],
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
          category: catTools._id,
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
          category: catTemplates._id,
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
          isActive: true
        }
      ]);
      console.log('Store seeding complete!');
    } catch (e) {
      console.error('Failed to seed store products', e);
    }
  }

  async getStoreProducts(query = {}) {
    const { search, category, sort, page = 1, limit = 12 } = query;
    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      const cat = await Category.findOne({ slug: category });
      if (cat) filter.category = cat._id;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'popular') sortOption = { downloads: -1, reviewCount: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .populate('category')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    const total = await Product.countDocuments(filter);

    return {
      products: products.map(p => this._mapProductToFrontend(p)),
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    };
  }

  async getFeaturedProducts() {
    const products = await Product.find({ isActive: true, isFeatured: true })
      .populate('category')
      .limit(6)
      .lean();
    return products.map(p => this._mapProductToFrontend(p));
  }

  async getProductDetails(slug) {
    const product = await Product.findOne({ slug }).populate('category').lean();
    return product ? this._mapProductToFrontend(product) : null;
  }

  async addProduct(data) {
    return await productRepo.create(data);
  }

  // Mapper to convert populated MongoDB docs into exact frontend UI format
  _mapProductToFrontend(product) {
    const p = product.toObject ? product.toObject() : product;
    return {
      id: p._id.toString(),
      slug: p.slug,
      title: p.title,
      description: p.description,
      shortDescription: p.shortDescription,
      productType: p.productType,
      price: p.price,
      salePrice: p.salePrice,
      category: p.category ? p.category.slug : 'plugins',
      features: p.features || [],
      technologies: p.technologies || [],
      version: p.version,
      lastUpdated: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
      images: p.images || [],
      thumbnail: p.thumbnail,
      rating: p.rating,
      reviewCount: p.reviewCount,
      isPopular: p.isPopular,
      isNew: p.isNewBadge
    };
  }
}
