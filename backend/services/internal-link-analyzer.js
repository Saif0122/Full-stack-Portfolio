import Post from '../models/post.model.js';

/**
 * Analyzes internal linking structure and identifies orphaned posts 
 * or suggests internal links for a given post based on semantic keywords.
 */
export const analyzeInternalLinks = async () => {
  try {
    const allPosts = await Post.find({ status: 'published' }, '_id title slug seo content');
    
    // Map of slug to count of incoming internal links
    const linkGraph = {};
    allPosts.forEach(p => { linkGraph[p.slug] = 0; });

    allPosts.forEach(post => {
      // Very basic regex to find hrefs containing '/blog/'
      const content = post.content || '';
      const hrefRegex = /href="\/blog\/([^"]+)"/g;
      let match;
      while ((match = hrefRegex.exec(content)) !== null) {
        const targetSlug = match[1];
        if (linkGraph[targetSlug] !== undefined) {
          linkGraph[targetSlug]++;
        }
      }
    });

    const orphanedPosts = allPosts
      .filter(post => linkGraph[post.slug] === 0)
      .map(post => ({
        id: post._id,
        title: post.title,
        slug: post.slug,
        focusKeyword: post.seo?.focusKeyword
      }));

    return {
      success: true,
      orphanedCount: orphanedPosts.length,
      orphanedPosts
    };
  } catch (error) {
    console.error('Error in internal link analysis:', error);
    return { success: false, message: 'Analysis failed' };
  }
};

/**
 * Suggests related articles based on category and tags to be linked inside the editor.
 */
export const suggestInternalLinksForPost = async (currentPostId, categoryId, tags) => {
  try {
    const query = { _id: { $ne: currentPostId }, status: 'published' };
    
    // Suggest posts in the same category or with shared tags
    if (categoryId) {
      query.$or = [{ category: categoryId }];
    }
    if (tags && tags.length > 0) {
      query.$or = query.$or ? [...query.$or, { tags: { $in: tags } }] : [{ tags: { $in: tags } }];
    }

    const suggestions = await Post.find(query)
      .select('title slug seo.focusKeyword')
      .limit(5);

    return suggestions;
  } catch (error) {
    console.error('Error suggesting internal links:', error);
    return [];
  }
};
