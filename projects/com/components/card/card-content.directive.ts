import { Directive } from '@angular/core';

/**
 * Card content directive - main body area with consistent padding.
 *
 * @example
 * ```html
 * <div comCardContent>
 *   <p>Card body content goes here.</p>
 * </div>
 * ```
 *
 * @tokens None - uses only layout utilities
 */
@Directive({
  selector: '[comCardContent]',
  exportAs: 'comCardContent',
  host: {
    class: 'flex-1 px-5 py-4 text-sm',
  },
})
export class ComCardContent {}
