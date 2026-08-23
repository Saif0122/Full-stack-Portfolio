import crypto from 'crypto';

// In-memory cache store
const cache = new Map();

class AiCacheService {
  /**
   * Generate a stable hash key from input variables
   */
  static generateKey(promptVersion, inputData) {
    const dataString = JSON.stringify(inputData, Object.keys(inputData).sort());
    return crypto.createHash('sha256').update(`${promptVersion}:${dataString}`).digest('hex');
  }

  /**
   * Get cached result
   */
  static get(key) {
    const cached = cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiry) {
      cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  /**
   * Set cached result (Default TTL: 24 hours)
   */
  static set(key, data, ttlSeconds = 86400) {
    const expiry = Date.now() + (ttlSeconds * 1000);
    cache.set(key, { data, expiry });
  }

  /**
   * Invalidate cache by key
   */
  static invalidate(key) {
    cache.delete(key);
  }

  /**
   * Flush all
   */
  static flushAll() {
    cache.clear();
  }
}

export default AiCacheService;
