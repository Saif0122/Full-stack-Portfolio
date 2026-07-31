/**
 * Fetches data with a strict timeout.
 * Crucial for Vercel + Render architectures. If Render is sleeping and takes 50s to wake up,
 * Vercel will kill the serverless function after 10s and throw a nasty 504 Gateway Timeout.
 * By aborting at 8s, we can catch the error gracefully and serve static fallback data to the user!
 */
export async function fetchWithTimeout(resource: RequestInfo | URL, options: RequestInit & { timeout?: number } = {}) {
  // Default to 8 seconds (Vercel hobby tier times out at 10s)
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
