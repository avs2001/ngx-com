export { mergeClasses } from 'ngx-com/utils';

let collapsibleIdCounter = 0;

/**
 * Generates a unique ID for collapsible components.
 * @returns A unique string ID
 */
export function generateCollapsibleId(): string {
  return `com-collapsible-${++collapsibleIdCounter}`;
}
