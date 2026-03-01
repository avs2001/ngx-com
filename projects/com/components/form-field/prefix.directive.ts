import { Directive } from '@angular/core';
import { prefixVariants } from './form-field.variants';

/**
 * Directive to mark content as the prefix slot in a form field.
 *
 * Prefix content appears before the input (e.g., currency symbol, icon).
 *
 * @tokens `--color-muted-foreground`
 *
 * @example Currency prefix
 * ```html
 * <com-form-field>
 *   <label comLabel>Amount</label>
 *   <span comPrefix>$</span>
 *   <input comInput type="number" formControlName="amount" />
 * </com-form-field>
 * ```
 *
 * @example Icon prefix
 * ```html
 * <com-form-field>
 *   <label comLabel>Search</label>
 *   <svg comPrefix class="size-4">...</svg>
 *   <input comInput formControlName="query" />
 * </com-form-field>
 * ```
 */
@Directive({
  selector: '[comPrefix]',
  exportAs: 'comPrefix',
  host: {
    '[class]': 'prefixVariants()',
  },
})
export class ComPrefix {
  protected readonly prefixVariants: () => string = prefixVariants;
}
