import Product from '../models/product.model.js';
import Post from '../models/post.model.js';
import Project from '../models/project.model.js';
import Category from '../models/category.model.js';

export class ProductSearchOptimizer {
  
  /**
   * Provides autocomplete suggestions for the marketplace search bar.
   * Prioritizes exact matches, then keyword matches, then description matches.
   */
  async getAutocompleteSuggestions(query) {
    if (!query || query.length < 2) return [];

    try {
      const searchRegex = new RegExp(query, 'i');
      
      const suggestions = await Product.find(
        { 
          status: 'published',
          isActive: true,
          $or: [
            { title: searchRegex },
            { 'seo.focusKeyword': searchRegex },
            { tags: searchRegex }
          ]
        },
        'title slug thumbnail price category seo.focusKeyword'
      )
      .populate('category', 'name slug')
      .limit(6)
      .lean();

      return suggestions;
    } catch (error) {
      console.error('Error generating autocomplete suggestions:', error);
      return [];
    }
  }

  /**
   * Internal Linking Engine
   * Suggests related content (Products, Blogs, Projects) for cross-linking.
   */
  async getRelatedContentForInternalLinking(productId) {
    try {
      const product = await Product.findById(productId, 'category tags seo.focusKeyword title');
      if (!product) return null;

      const categoryId = product.category;
      const tags = product.tags || [];
      const focusKeyword = product.seo?.focusKeyword;

      // 1. Related Products
      const relatedProducts = await Product.find({
        _id: { $ne: productId },
        status: 'published',
        $or: [
          { category: categoryId },
          { tags: { $in: tags } }
        ]
      }, 'title slug tags thumbnail').limit(3).lean();

      // 2. Related Blogs
      const queryFilter = { status: 'published' };
      if (tags.length > 0) {
         // Assuming posts have tags or related fields. Using regex on title/excerpt as fallback
         const tagRegex = new RegExp(tags.join('|'), 'i');
         queryFilter.$or = [{ title: tagRegex }, { tags: { $in: tags } }];
      }
      
      const relatedBlogs = await Post.find(queryFilter, 'title slug excerpt').limit(3).lean();

      // 3. Related Projects
      const relatedProjects = await Project.find({
        status: 'published',
        $or: [
          { technologies: { $in: tags } },
          { title: new RegExp(focusKeyword || 'xxxxx', 'i') }
        ]
      }, 'title slug thumbnail').limit(3).lean();

      return {
        products: relatedProducts,
        blogs: relatedBlogs,
        projects: relatedProjects
      };

    } catch (error) {
      console.error('Error generating internal link suggestions:', error);
      return null;
    }
  }

  /**
   * Get trending products based on downloads, ratings, and recent publish dates
   */
  async getTrendingProducts() {
    try {
      return await Product.find({ status: 'published', isActive: true })
        .sort({ downloads: -1, reviewCount: -1, createdAt: -1 })
        .limit(4)
        .select('title slug thumbnail price salePrice category isPopular isNewBadge')
        .populate('category', 'name slug')
        .lean();
    } catch (error) {
      return [];
    }
  }
}
