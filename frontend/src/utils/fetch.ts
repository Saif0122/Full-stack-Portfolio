/**
 * Fetches data with a strict timeout.
 * Crucial for Vercel + Render architectures. If Render is sleeping and takes 50s to wake up,
 * Vercel will kill the serverless function after 10s and throw a nasty 504 Gateway Timeout.
 * By aborting at 8s, we can catch the error gracefully and serve static fallback data to the user!
 */
export async function fetchWithTimeout(resource: RequestInfo | URL, options: RequestInit & { timeout?: number } = {}) {
  // Use a very short timeout during Vercel build time so the build doesn't hang if the backend is asleep
  const isBuildTime = process.env.CI || process.env.VERCEL || process.env.npm_lifecycle_event === 'build';
  const defaultTimeout = isBuildTime ? 2000 : 8000;
  const { timeout = defaultTimeout } = options;
  
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
