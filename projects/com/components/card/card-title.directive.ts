import { Directive } from '@angular/core';

/**
 * Card title directive - styled heading text.
 *
 * Apply to any heading element. Consumer picks the semantic level (h2, h3, etc.).
 *
 * @example
 * ```html
 * <h3 comCardTitle>Project Alpha</h3>
 * ```
 *
 * @tokens `--color-foreground`
 */
@Directive({
  selector: '[comCardTitle]',
  exportAs: 'comCardTitle',
  host: {
    class: 'font-heading text-lg font-semibold tracking-tight text-foreground',
  },
})
export class ComCardTitle {}
