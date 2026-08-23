import GraphNode from '../models/graph-node.model.js';
import GraphEdge from '../models/graph-edge.model.js';
import GraphSnapshot from '../models/graph-snapshot.model.js';

class ContentGraphService {
  /**
   * Get overall network metrics using MongoDB aggregations
   */
  async getNetworkMetrics() {
    const nodeCount = await GraphNode.countDocuments();
    const edgeCount = await GraphEdge.countDocuments();
    const orphanCount = await GraphNode.countDocuments({ isOrphan: true });
    const brokenLinkCount = await GraphEdge.countDocuments({ isBroken: true });

    // Calculate averages using aggregation pipeline
    const averages = await GraphNode.aggregate([
      { 
        $group: { 
          _id: null, 
          avgDepth: { $avg: "$crawlDepth" }, 
          avgEquity: { $avg: "$linkEquityScore" },
          avgConnectivity: { $avg: { $add: ["$incomingLinksCount", "$outgoingLinksCount"] } }
        } 
      }
    ]);

    const avgDepth = averages.length ? averages[0].avgDepth : 0;
    const avgEquity = averages.length ? averages[0].avgEquity : 0;
    
    // Simplistic readiness calculation
    const readiness = Math.max(0, 100 - (orphanCount * 2) - (brokenLinkCount * 5));

    return {
      nodeCount,
      edgeCount,
      orphanCount,
      brokenLinkCount,
      avgDepth: Math.round(avgDepth * 10) / 10,
      avgEquity: Math.round(avgEquity),
      readinessScore: readiness
    };
  }

  /**
   * Save a historical snapshot of the graph
   */
  async createSnapshot() {
    const metrics = await this.getNetworkMetrics();
    
    const snapshot = await GraphSnapshot.create({
      nodeCount: metrics.nodeCount,
      edgeCount: metrics.edgeCount,
      orphanPageCount: metrics.orphanCount,
      brokenLinkCount: metrics.brokenLinkCount,
      crawlDepthScore: Math.max(0, 100 - (metrics.avgDepth * 10)),
      linkEquityScore: metrics.avgEquity,
      internalLinkingReadiness: metrics.readinessScore
    });

    return snapshot;
  }

  /**
   * Get topic authority aggregations
   * Analyzes which topics/tags/categories have the most incoming cluster connections
   */
  async getTopicAuthority() {
    const authorityNodes = await GraphNode.find({ 
      nodeType: { $in: ['Technology', 'Skill', 'Category'] } 
    }).sort({ incomingLinksCount: -1 }).limit(20);

    return authorityNodes.map(node => ({
      id: node._id,
      title: node.title,
      type: node.nodeType,
      topicAuthorityScore: node.topicAuthorityScore,
      connectedContent: node.incomingLinksCount,
      isPillar: node.isPillarPage
    }));
  }

  /**
   * Get raw node data for Explorer visualization
   */
  async getGraphData(limit = 200) {
    const nodes = await GraphNode.find().limit(limit).select('title uri nodeType incomingLinksCount isOrphan linkEquityScore');
    const nodeIds = nodes.map(n => n._id);
    
    const edges = await GraphEdge.find({
      sourceNode: { $in: nodeIds },
      targetNode: { $in: nodeIds }
    }).select('sourceNode targetNode anchorType relationship');

    return {
      nodes: nodes.map(n => ({
        id: n._id,
        name: n.title,
        uri: n.uri,
        group: n.nodeType,
        val: n.incomingLinksCount || 1, // Node size
        isOrphan: n.isOrphan
      })),
      links: edges.map(e => ({
        source: e.sourceNode,
        target: e.targetNode,
        type: e.anchorType,
        relationship: e.relationship
      }))
    };
  }
}

export default new ContentGraphService();
