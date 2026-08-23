import { asyncHandler } from '../middleware/async.js';

import ContentGraphService from '../services/content-graph.service.js';
import InternalLinkingService from '../services/internal-linking.service.js';
import AiSeoService from '../services/ai-seo.service.js';
import GraphNode from '../models/graph-node.model.js';
import InternalLinkSuggestion from '../models/internal-link-suggestion.model.js';

/**
 * @desc    Get dashboard network metrics
 * @route   GET /api/v1/seo/linking/metrics
 * @access  Private/Admin
 */
export const getNetworkMetrics = asyncHandler(async (req, res, next) => {
  const metrics = await ContentGraphService.getNetworkMetrics();
  res.status(200).json({ success: true, data: metrics });
});

/**
 * @desc    Get topic authority
 * @route   GET /api/v1/seo/linking/topic-authority
 * @access  Private/Admin
 */
export const getTopicAuthority = asyncHandler(async (req, res, next) => {
  const data = await ContentGraphService.getTopicAuthority();
  res.status(200).json({ success: true, data });
});

/**
 * @desc    Get full graph data for explorer
 * @route   GET /api/v1/seo/linking/graph
 * @access  Private/Admin
 */
export const getGraphExplorerData = asyncHandler(async (req, res, next) => {
  const data = await ContentGraphService.getGraphData();
  res.status(200).json({ success: true, data });
});

/**
 * @desc    Trigger sync of the graph
 * @route   POST /api/v1/seo/linking/sync
 * @access  Private/Admin
 */
export const triggerGraphSync = asyncHandler(async (req, res, next) => {
  // Run asynchronously so we don't block
  InternalLinkingService.triggerDailyAudit().catch(err => {
    console.error('Background graph sync failed:', err);
  });
  
  res.status(202).json({ success: true, message: 'Graph sync started in background' });
});

/**
 * @desc    Generate AI Internal Link Suggestions
 * @route   POST /api/v1/seo/linking/ai/suggest-links
 * @access  Private/Admin
 */
export const generateLinkSuggestions = asyncHandler(async (req, res, next) => {
  const { content, nodeType } = req.body;
  
  // Get possible targets
  const targets = await GraphNode.find({ status: 'active' }).limit(50).select('title uri nodeType');
  
  const suggestions = await AiSeoService.generateInternalLinkSuggestions(content, targets, req.user.id);
  
  // Save to DB
  if (suggestions?.suggestions && Array.isArray(suggestions.suggestions)) {
    for (const s of suggestions.suggestions) {
      const targetNode = await GraphNode.findOne({ uri: s.targetUri });
      if (targetNode) {
        await InternalLinkSuggestion.create({
          sourceNode: req.body.sourceNodeId || targetNode._id, // fallback if testing
          targetNode: targetNode._id,
          suggestedAnchorText: s.suggestedAnchorText,
          suggestedPlacement: s.suggestedPlacement,
          contextualRationale: s.contextualRationale,
          confidenceScore: s.confidenceScore,
          status: 'pending'
        });
      }
    }
  }

  res.status(200).json({ success: true, data: suggestions });
});
