export class TokenEstimator {
  /**
   * Extremely simple, fast, heuristic-based token estimation as a fallback.
   * Averages ~4 characters per token for English text.
   */
  static estimateTokens(text) {
    if (!text) return 0;
    
    // Stringify if it's an object/json
    const str = typeof text === 'string' ? text : JSON.stringify(text);
    
    // Roughly 4 characters per token
    return Math.ceil(str.length / 4);
  }

  /**
   * Fallback pricing constants (Gemini 1.5 Flash base rates as of Mid-2024)
   * Input: $0.075 / 1M tokens
   * Output: $0.30 / 1M tokens
   */
  static calculateCost(inputTokens, outputTokens) {
    const inputCost = (inputTokens / 1_000_000) * 0.075;
    const outputCost = (outputTokens / 1_000_000) * 0.30;
    
    // Ensure small numbers don't round to 0 if we want to track micro-cents
    return Number((inputCost + outputCost).toFixed(8));
  }
}
