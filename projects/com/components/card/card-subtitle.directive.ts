import { Directive } from '@angular/core';

/**
 * Card subtitle directive - secondary text styling.
 *
 * @example
 * ```html
 * <p comCardSubtitle>Last updated 2 hours ago</p>
 * ```
 *
 * @tokens `--color-muted-foreground`
 */
@Directive({
  selector: '[comCardSubtitle]',
  exportAs: 'comCardSubtitle',
  host: {
    class: 'text-sm text-muted-foreground',
  },
})
export class ComCardSubtitle {}
