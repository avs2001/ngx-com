export { mergeClasses } from 'ngx-com/utils';

let confirmIdCounter = 0;

/**
 * Generate a unique ID for a confirmation dialog title.
 */
export function generateConfirmTitleId(): string {
  return `confirm-title-${++confirmIdCounter}`;
}

/**
 * Generate a unique ID for a confirmation dialog description.
 */
export function generateConfirmDescriptionId(): string {
  return `confirm-desc-${++confirmIdCounter}`;
}
