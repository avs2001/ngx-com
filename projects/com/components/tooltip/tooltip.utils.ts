export { mergeClasses } from 'ngx-com/utils';

let tooltipIdCounter = 0;

/**
 * Generate a unique ID for a tooltip instance.
 */
export function generateTooltipId(): string {
  return `tooltip-${++tooltipIdCounter}`;
}
