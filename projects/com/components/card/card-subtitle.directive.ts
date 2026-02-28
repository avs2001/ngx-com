import { Directive } from '@angular/core';

/**
 * Card subtitle directive - secondary text styling.
 *
 * @example
 * ```html
 * <p uiCardSubtitle>Last updated 2 hours ago</p>
 * ```
 */
@Directive({
  selector: '[uiCardSubtitle]',
  exportAs: 'uiCardSubtitle',
  host: {
    class: 'text-sm text-muted-foreground',
  },
})
export class UiCardSubtitle {}
