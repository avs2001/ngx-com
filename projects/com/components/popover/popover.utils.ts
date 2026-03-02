export { mergeClasses } from 'ngx-com/utils';

let popoverIdCounter = 0;

/**
 * Generate a unique ID for a popover instance.
 */
export function generatePopoverId(): string {
  return `popover-${++popoverIdCounter}`;
}
