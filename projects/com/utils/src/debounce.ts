/**
 * A debounced function wrapper with cancel and flush capabilities.
 *
 * @template T - The type of the original function.
 */
export interface DebouncedFn<T extends (...args: never[]) => void> {
  /**
   * Calls the debounced function. The actual execution is delayed until
   * the specified wait time has passed without another call.
   */
  (...args: Parameters<T>): void;

  /**
   * Cancels any pending debounced call.
   * Useful for cleanup in component destruction or effect cleanup.
   */
  cancel(): void;

  /**
   * Immediately executes the pending debounced call if one exists.
   * Does nothing if no call is pending.
   */
  flush(): void;

  /**
   * Returns whether there is a pending debounced call.
   */
  pending(): boolean;
}

/**
 * Configuration options for the debounce function.
 */
export interface DebounceOptions {
  /**
   * The number of milliseconds to delay execution.
   * @default 300
   */
  readonly wait?: number;

  /**
   * If `true`, the function is invoked on the leading edge of the timeout
   * instead of the trailing edge.
   * @default false
   */
  readonly leading?: boolean;
}

/**
 * Creates a debounced version of the provided function that delays invoking
 * until after the specified wait time has elapsed since the last call.
 *
 * The debounced function includes `cancel()` to abort pending calls,
 * `flush()` to immediately execute pending calls, and `pending()` to check status.
 *
 * @template T - The type of the function to debounce.
 * @param fn - The function to debounce.
 * @param optionsOrWait - Wait time in ms or options object.
 * @returns The debounced function with control methods.
 *
 * @example
 * // Basic usage with default 300ms delay
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query);
 * });
 * debouncedSearch('hello'); // Logs after 300ms if no subsequent calls
 *
 * @example
 * // With custom wait time
 * const debouncedSave = debounce(
 *   (data: { id: number; value: string }) => saveToServer(data),
 *   500
 * );
 *
 * @example
 * // With options object and leading edge execution
 * const debouncedClick = debounce(
 *   () => handleClick(),
 *   { wait: 200, leading: true }
 * );
 *
 * @example
 * // Cleanup in Angular component
 * export class SearchComponent {
 *   private debouncedSearch = debounce((q: string) => this.search(q), 300);
 *
 *   ngOnDestroy(): void {
 *     this.debouncedSearch.cancel();
 *   }
 * }
 */
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  optionsOrWait: number | DebounceOptions = 300,
): DebouncedFn<T> {
  const options: DebounceOptions =
    typeof optionsOrWait === 'number' ? { wait: optionsOrWait } : optionsOrWait;

  const wait = options.wait ?? 300;
  const leading = options.leading ?? false;

  let timerId: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: Parameters<T> | null = null;
  let leadingInvoked = false;

  const invoke = (): void => {
    if (pendingArgs !== null) {
      fn(...pendingArgs);
      pendingArgs = null;
    }
    leadingInvoked = false;
  };

  const debounced = (...args: Parameters<T>): void => {
    pendingArgs = args;

    if (leading && !leadingInvoked) {
      leadingInvoked = true;
      invoke();
    }

    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = null;
      if (!leading || pendingArgs !== null) {
        invoke();
      }
    }, wait);
  };

  debounced.cancel = (): void => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    pendingArgs = null;
    leadingInvoked = false;
  };

  debounced.flush = (): void => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
      invoke();
    }
  };

  debounced.pending = (): boolean => timerId !== null;

  return debounced;
}
