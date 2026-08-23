import GraphNode from '../models/graph-node.model.js';
import GraphEdge from '../models/graph-edge.model.js';
import ContentGraphService from './content-graph.service.js';
import Post from '../models/post.model.js';
import Product from '../models/product.model.js';
import Project from '../models/project.model.js';

class InternalLinkingService {
  /**
   * Rebuilds the graph nodes from primary content collections.
   * This is typically run as a background job.
   */
  async syncGraphNodes() {
    console.log('[InternalLinkingService] Starting graph node sync...');
    
    const posts = await Post.find({}).select('title slug');
    const products = await Product.find({}).select('title slug');
    const projects = await Project.find({}).select('title slug');

    const ops = [];

    posts.forEach(p => {
      ops.push({
        updateOne: {
          filter: { nodeType: 'Post', referenceId: p._id },
          update: { $set: { title: p.title, uri: `/blog/${p.slug}`, status: 'active' } },
          upsert: true
        }
      });
    });

    products.forEach(p => {
      ops.push({
        updateOne: {
          filter: { nodeType: 'Product', referenceId: p._id },
          update: { $set: { title: p.title, uri: `/store/${p.slug}`, status: 'active' } },
          upsert: true
        }
      });
    });

    projects.forEach(p => {
      ops.push({
        updateOne: {
          filter: { nodeType: 'Project', referenceId: p._id },
          update: { $set: { title: p.title, uri: `/projects/${p.slug}`, status: 'active' } },
          upsert: true
        }
      });
    });

    if (ops.length > 0) {
      await GraphNode.bulkWrite(ops);
    }
    
    console.log(`[InternalLinkingService] Synced ${ops.length} content nodes.`);
  }

  /**
   * Runs the PageRank style link equity distribution.
   */
  async calculateLinkEquity() {
    console.log('[InternalLinkingService] Calculating link equity...');
    const nodes = await GraphNode.find({});
    
    // Very simplified iteration for prototype: 
    // Equity flows from incoming links.
    for (let node of nodes) {
      const incomingEdges = await GraphEdge.find({ targetNode: node._id });
      node.incomingLinksCount = incomingEdges.length;
      
      const outgoingEdges = await GraphEdge.find({ sourceNode: node._id });
      node.outgoingLinksCount = outgoingEdges.length;
      
      node.isOrphan = incomingEdges.length === 0;
      
      // Basic equity score based on incoming link count (could be iterative in production)
      node.linkEquityScore = incomingEdges.length * 10; 
      
      await node.save();
    }
  }

  /**
   * Generate an automated snapshot
   */
  async triggerDailyAudit() {
    await this.syncGraphNodes();
    await this.calculateLinkEquity();
    await ContentGraphService.createSnapshot();
  }
}

export default new InternalLinkingService();
