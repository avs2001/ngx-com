/**
 * Event emitted when the paginator changes page index or page size.
 */
export interface PageEvent {
  /** The current zero-based page index. */
  pageIndex: number;
  /** The previous zero-based page index. */
  previousPageIndex: number;
  /** The current page size. */
  pageSize: number;
  /** The total number of items being paged. */
  length: number;
}

/**
 * Function signature for custom range label formatting.
 * Used for i18n and custom label display.
 *
 * @param page Current page index (zero-based)
 * @param pageSize Number of items per page
 * @param length Total number of items
 * @returns Formatted string to display (e.g., "1 – 10 of 100")
 */
export type RangeLabelFn = (page: number, pageSize: number, length: number) => string;

/**
 * Default range label function.
 * Produces output like "1 – 10 of 100" or "0 of 0" when empty.
 */
export function defaultRangeLabel(page: number, pageSize: number, length: number): string {
  if (length === 0 || pageSize === 0) {
    return `0 of ${length}`;
  }

  const startIndex = page * pageSize;
  // Ensure end index doesn't exceed length
  const endIndex = Math.min(startIndex + pageSize, length);

  return `${startIndex + 1} – ${endIndex} of ${length}`;
}
