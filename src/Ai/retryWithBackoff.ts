/**
 * Sleeps for a given amount of time.
 * @param ms The number of milliseconds to sleep.
 * @returns A promise that resolves after the given time.
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retries an async function with exponential backoff.
 *
 * @template T The return type of the async function.
 * @param {() => Promise<T>} fn The async function to execute.
 * @param {object} [options] Options for retrying.
 * @param {number} [options.retries=5] Maximum number of retries.
 * @param {number} [options.initialDelay=3000] Initial delay in milliseconds.
 * @param {number} [options.factor=2] Exponential factor.
 * @param {(error: any) => boolean} [options.isRetryableError] A function to determine if an error is retryable. Defaults to a function that always returns true.
 * @returns {Promise<T>} The result of the async function.
 * @throws The last error if all retries fail or if the error is not retryable.
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  options?: {
    retries?: number;
    initialDelay?: number;
    factor?: number;
    isRetryableError?: (error: any) => boolean;
  },
): Promise<T> => {
  const {
    retries = 5,
    initialDelay = 3000,
    factor = 2,
    isRetryableError = () => true,
  } = options ?? {};

  let lastError: any;

  for (let i = 0; i < retries + 1; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (!isRetryableError(error)) {
        throw error;
      }
      if (i < retries) {
        const delay = initialDelay * factor ** i;
        await sleep(delay);
      }
    }
  }

  throw lastError;
};
