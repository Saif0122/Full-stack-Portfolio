import Seo from '../models/seo.model.js';
import Product from '../models/product.model.js';
import Post from '../models/post.model.js';
import Project from '../models/project.model.js';

export const getAggregatedKeywords = async (req, res) => {
  try {
    const keywordsMap = new Map();

    const addKeyword = (keyword, source, intent = 'informational') => {
      if (!keyword) return;
      const key = keyword.toLowerCase().trim();
      if (!keywordsMap.has(key)) {
        keywordsMap.set(key, {
          keyword: key,
          sources: [],
          intent,
          difficulty: Math.floor(Math.random() * 100), // Informational mock
          usageCount: 0
        });
      }
      const entry = keywordsMap.get(key);
      entry.usageCount += 1;
      entry.sources.push(source);
    };

    // 1. Static Pages (Seo model)
    const seoRecords = await Seo.find({}).lean();
    seoRecords.forEach(record => {
      if (record.focusKeyword) {
        addKeyword(record.focusKeyword, { type: 'Static Page', path: record.path, title: record.metaTitle }, record.searchIntent);
      }
      record.secondaryKeywords?.forEach(kw => {
        addKeyword(kw, { type: 'Static Page (Secondary)', path: record.path, title: record.metaTitle }, record.searchIntent);
      });
    });

    // 2. Products
    const products = await Product.find({ 'seo.focusKeyword': { $exists: true, $ne: '' } }).lean();
    products.forEach(product => {
      addKeyword(product.seo?.focusKeyword, { type: 'Product', path: `/store/${product.slug}`, title: product.title }, 'transactional');
    });

    // 3. Blogs
    const blogs = await Post.find({ 'seo.focusKeyword': { $exists: true, $ne: '' } }).lean();
    blogs.forEach(blog => {
      addKeyword(blog.seo?.focusKeyword, { type: 'Blog', path: `/blog/${blog.slug}`, title: blog.title }, 'informational');
    });
    
    // 4. Projects
    const projects = await Project.find({ 'seo.focusKeyword': { $exists: true, $ne: '' } }).lean();
    projects.forEach(project => {
      addKeyword(project.seo?.focusKeyword, { type: 'Project', path: `/projects/${project.slug}`, title: project.title }, 'commercial');
    });

    const results = Array.from(keywordsMap.values()).map(entry => {
      // Flag cannibalization if usageCount > 1 and they are different primary paths
      const uniquePaths = new Set(entry.sources.map(s => s.path));
      entry.hasCannibalization = uniquePaths.size > 1;
      return entry;
    });

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching aggregated keywords:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
