/**
 * Configuration options for the retry function.
 */
export interface RetryOptions {
  /**
   * Maximum number of retry attempts.
   */
  readonly attempts: number;

  /**
   * Delay between retries in milliseconds.
   */
  readonly delay: number;

  /**
   * Multiplier for exponential backoff (optional).
   * Each retry delay is multiplied by this factor.
   * @default 1
   */
  readonly backoff?: number;

  /**
   * Optional predicate to determine if an error should trigger a retry.
   * @param error - The error that occurred.
   * @returns `true` to retry, `false` to fail immediately.
   */
  readonly shouldRetry?: (error: unknown) => boolean;
}

/**
 * Retries an async function with configurable attempts, delay, and backoff.
 *
 * @template T - The return type of the async function.
 * @param fn - The async function to retry.
 * @param options - Retry configuration.
 * @returns The result of the successful call.
 * @throws The last error if all attempts fail.
 *
 * @example
 * // Basic retry with 3 attempts
 * const data = await retry(
 *   () => fetch('/api/data').then(r => r.json()),
 *   { attempts: 3, delay: 1000 }
 * );
 *
 * @example
 * // With exponential backoff
 * const result = await retry(
 *   () => unreliableApiCall(),
 *   { attempts: 5, delay: 100, backoff: 2 } // delays: 100, 200, 400, 800, 1600
 * );
 *
 * @example
 * // With conditional retry
 * const result = await retry(
 *   () => apiCall(),
 *   {
 *     attempts: 3,
 *     delay: 500,
 *     shouldRetry: (err) => err instanceof NetworkError
 *   }
 * );
 */
export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const { attempts, delay, backoff = 1, shouldRetry } = options;

  let lastError: unknown;
  let currentDelay = delay;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (shouldRetry && !shouldRetry(error)) {
        throw error;
      }

      if (attempt < attempts) {
        await new Promise(resolve => setTimeout(resolve, currentDelay));
        currentDelay *= backoff;
      }
    }
  }

  throw lastError;
}
