import { Directive } from '@angular/core';

/**
 * Card content directive - main body area with consistent padding.
 *
 * @example
 * ```html
 * <div uiCardContent>
 *   <p>Card body content goes here.</p>
 * </div>
 * ```
 */
@Directive({
  selector: '[uiCardContent]',
  exportAs: 'uiCardContent',
  host: {
    class: 'flex-1 px-5 py-4 text-sm',
  },
})
export class UiCardContent {}
