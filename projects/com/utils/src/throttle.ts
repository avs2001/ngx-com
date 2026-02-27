/**
 * A throttled function wrapper with cancel capability.
 *
 * @template T - The type of the original function.
 */
export interface ThrottledFn<T extends (...args: never[]) => void> {
  /**
   * Calls the throttled function. Execution is rate-limited to at most
   * once per the specified wait period.
   */
  (...args: Parameters<T>): void;

  /**
   * Cancels any pending throttled call.
   * Useful for cleanup in component destruction.
   */
  cancel(): void;
}

/**
 * Creates a throttled version of the provided function that only invokes
 * at most once per the specified wait period.
 *
 * The function is invoked on the leading edge (immediately on first call)
 * and then at most once per wait period for subsequent calls.
 *
 * @template T - The type of the function to throttle.
 * @param fn - The function to throttle.
 * @param wait - The minimum time between invocations in milliseconds.
 * @returns The throttled function with a cancel method.
 *
 * @example
 * // Basic usage - scroll handler
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 100);
 * window.addEventListener('scroll', throttledScroll);
 *
 * @example
 * // With cleanup
 * export class ScrollComponent {
 *   private throttledHandler = throttle((e: Event) => this.handleScroll(e), 100);
 *
 *   ngOnDestroy(): void {
 *     this.throttledHandler.cancel();
 *   }
 * }
 */
export function throttle<T extends (...args: never[]) => void>(
  fn: T,
  wait: number,
): ThrottledFn<T> {
  let lastCallTime = 0;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: Parameters<T> | null = null;

  const invoke = (args: Parameters<T>): void => {
    lastCallTime = Date.now();
    fn(...args);
  };

  const throttled = (...args: Parameters<T>): void => {
    const now = Date.now();
    const remaining = wait - (now - lastCallTime);

    if (remaining <= 0) {
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
      invoke(args);
    } else {
      pendingArgs = args;
      if (timerId === null) {
        timerId = setTimeout(() => {
          timerId = null;
          if (pendingArgs !== null) {
            invoke(pendingArgs);
            pendingArgs = null;
          }
        }, remaining);
      }
    }
  };

  throttled.cancel = (): void => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    pendingArgs = null;
  };

  return throttled;
}
