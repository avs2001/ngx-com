// Re-export from shared utilities
export { mergeClasses } from 'ngx-com/utils';

let menuIdCounter = 0;

/**
 * Generate a unique ID for a menu instance.
 */
export function generateMenuId(): string {
  return `menu-${++menuIdCounter}`;
}
