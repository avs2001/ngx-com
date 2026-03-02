export { mergeClasses } from 'ngx-com/utils';

let tabIdCounter = 0;

/**
 * Generates a unique ID for tab components.
 */
export function generateTabId(): string {
  return `com-tab-${++tabIdCounter}`;
}
