import Post from '../models/post.model.js';
import SeoAnalyzerLog from '../models/seo-analyzer-log.model.js';

export const getSeoDashboardMetrics = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const publishedPosts = await Post.countDocuments({ status: 'published' });

    // Aggregating SEO scores
    const postsWithSeo = await Post.find({ status: 'published' }, 'seo.seoScore slug title publishedAt');
    
    let totalScore = 0;
    let missingMetadataCount = 0;
    let missingAltCount = 0;
    
    const lowestScoreArticles = [];

    postsWithSeo.forEach(post => {
      const score = post.seo?.seoScore || 0;
      totalScore += score;
      
      if (score < 50) {
        lowestScoreArticles.push({
          id: post._id,
          title: post.title,
          slug: post.slug,
          score: score
        });
      }
      
      // Basic checks for missing meta
      if (!post.seo?.metaTitle || !post.seo?.metaDescription) {
        missingMetadataCount++;
      }
    });

    const averageScore = publishedPosts > 0 ? (totalScore / publishedPosts).toFixed(2) : 0;
    
    // Sort to get top 5 worst
    lowestScoreArticles.sort((a, b) => a.score - b.score).splice(5);

    res.status(200).json({
      success: true,
      data: {
        overallScore: averageScore,
        totalPosts,
        publishedPosts,
        missingMetadataCount,
        lowestScoreArticles,
        // Mock data for AI suggestions / missing alt text until full analyzer is linked
        missingAltCount: 0,
        duplicateSlugs: 0
      }
    });
  } catch (error) {
    console.error('Error fetching SEO dashboard metrics:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
