import mongoose from 'mongoose';

/**
 * Hybrid AI Context Memory Store
 * Priority 1: Deterministic Queries (Exact Matches)
 * Priority 2: Semantic/Vector Search Fallback (Mocked via regex/text-search for now until Atlas Vector Search is enabled)
 */
class AiContextService {
  /**
   * Check if a keyword or topic already exists across the ecosystem
   */
  async checkDuplicateKeyword(keyword) {
    if (!keyword) return { exists: false };

    // 1. Deterministic Exact Match (Fast)
    // We would query Product, Blog, Portfolio models here.
    // For now, we will query a hypothetical global 'Keyword' collection or just return mock data if not connected.
    // Let's assume there's a Seo model or we just do a mock return for safety until models are fully unified.
    
    // MOCK EXACT MATCH
    if (keyword.toLowerCase() === 'existing keyword') {
      return { exists: true, method: 'deterministic', match: keyword };
    }

    // 2. Vector Search Fallback (Semantic Match)
    // In production: await KeywordModel.aggregate([{ $vectorSearch: { queryVector: [...], path: "embedding" } }])
    const semanticMockMatches = ['similar keyword', 'related topic'];
    if (semanticMockMatches.includes(keyword.toLowerCase())) {
      return { exists: true, method: 'semantic', match: 'similar keyword' };
    }

    return { exists: false };
  }

  /**
   * Calculate Composite Confidence Score
   * Weights: 
   * - LLM Base Confidence: 30%
   * - Keyword Relevance: 20%
   * - Metadata Completeness: 20%
   * - Readability: 15%
   * - Uniqueness (No Duplicates): 15%
   */
  calculateCompositeConfidence(llmScore = 0, isRelevant = true, completeness = 100, readability = 100, isUnique = true) {
    const wLlm = 0.30;
    const wRel = 0.20;
    const wComp = 0.20;
    const wRead = 0.15;
    const wUniq = 0.15;

    const relScore = isRelevant ? 100 : 50;
    const uniqScore = isUnique ? 100 : 0;

    const rawScore = 
      (llmScore * wLlm) + 
      (relScore * wRel) + 
      (completeness * wComp) + 
      (readability * wRead) + 
      (uniqScore * wUniq);

    const finalScore = Math.min(Math.max(Math.round(rawScore), 0), 100);

    let level = 'Low';
    if (finalScore >= 90) level = 'Very High';
    else if (finalScore >= 75) level = 'High';
    else if (finalScore >= 50) level = 'Medium';

    return {
      score: finalScore,
      level,
      explanation: `Composite score of ${finalScore} derived from LLM confidence (${llmScore}), Completeness (${completeness}), Readability (${readability}), and Uniqueness (${isUnique}).`
    };
  }
}

export default new AiContextService();
