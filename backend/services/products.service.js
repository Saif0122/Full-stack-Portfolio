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

      // Seed Products
      await Product.create([
        {
          slug: 'nexus-saas-boilerplate',
          title: 'Nexus SaaS Boilerplate',
          description: 'The ultimate Next.js SaaS boilerplate with authentication, payments, dashboard, and clean architecture built-in. Launch your startup in days, not months.',
          shortDescription: 'Enterprise-grade Next.js SaaS Boilerplate',
          price: 199,
          salePrice: 149,
          category: catBoiler._id,
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
          images: [{ url: '/images/store/nexus-1.jpg' }, { url: '/images/store/nexus-2.jpg' }],
          thumbnail: '/images/store/nexus-thumb.jpg',
          rating: 4.9,
          reviewCount: 128,
          isPopular: true,
          isActive: true
        },
        {
          slug: 'chroma-ui-kit',
          title: 'Chroma UI Kit',
          description: 'A premium, beautifully designed UI kit for modern web applications. Features 100+ accessible components built on top of Radix UI and Tailwind CSS.',
          shortDescription: 'Premium React UI Component Library',
          price: 79,
          category: catUI._id,
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
          images: [{ url: '/images/store/chroma-1.jpg' }],
          thumbnail: '/images/store/chroma-thumb.jpg',
          rating: 4.8,
          reviewCount: 84,
          isNewBadge: true,
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
