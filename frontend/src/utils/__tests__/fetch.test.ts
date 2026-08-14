import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchWithTimeout } from '../fetch';

describe('fetchWithTimeout utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should complete fetch successfully before timeout', async () => {
    const mockResponse = new Response('ok', { status: 200 });
    (global.fetch as any).mockResolvedValueOnce(mockResponse);

    const promise = fetchWithTimeout('https://api.example.com/data', { timeout: 5000 });
    
    // Advance timers a little bit, but not past timeout
    vi.advanceTimersByTime(1000);
    
    const response = await promise;
    expect(response.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should abort fetch if timeout is reached', async () => {
    // Mock fetch to simulate a long request that does not resolve immediately
    (global.fetch as any).mockImplementationOnce((url: string, options: any) => {
      return new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    });

    const promise = fetchWithTimeout('https://api.example.com/data', { timeout: 1000 });
    
    // Fast-forward time to trigger timeout
    vi.advanceTimersByTime(1500);

    await expect(promise).rejects.toThrow('Aborted');
  });

  it('should use default timeout of 8000ms if not provided', async () => {
    (global.fetch as any).mockImplementationOnce((url: string, options: any) => {
      return new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
    });

    const promise = fetchWithTimeout('https://api.example.com/data');
    
    vi.advanceTimersByTime(7000); // Not aborted yet
    vi.advanceTimersByTime(1500); // 8500ms elapsed, should abort

    await expect(promise).rejects.toThrow('Aborted');
  });
});
