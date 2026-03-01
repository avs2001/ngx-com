import { Directive } from '@angular/core';
import { suffixVariants } from './form-field.variants';

/**
 * Directive to mark content as the suffix slot in a form field.
 *
 * Suffix content appears after the input (e.g., unit, clear button, visibility toggle).
 *
 * @tokens `--color-muted-foreground`
 *
 * @example Unit suffix
 * ```html
 * <com-form-field>
 *   <label comLabel>Weight</label>
 *   <input comInput type="number" formControlName="weight" />
 *   <span comSuffix>kg</span>
 * </com-form-field>
 * ```
 *
 * @example Clear button suffix
 * ```html
 * <com-form-field>
 *   <label comLabel>Search</label>
 *   <input comInput formControlName="query" />
 *   <button comSuffix type="button" (click)="clearSearch()">
 *     <svg class="size-4">...</svg>
 *   </button>
 * </com-form-field>
 * ```
 *
 * @example Password visibility toggle
 * ```html
 * <com-form-field>
 *   <label comLabel>Password</label>
 *   <input comInput [type]="showPassword ? 'text' : 'password'" formControlName="password" />
 *   <button comSuffix type="button" (click)="showPassword = !showPassword">
 *     <svg class="size-4">...</svg>
 *   </button>
 * </com-form-field>
 * ```
 */
@Directive({
  selector: '[comSuffix]',
  exportAs: 'comSuffix',
  host: {
    '[class]': 'suffixVariants()',
  },
})
export class ComSuffix {
  protected readonly suffixVariants: () => string = suffixVariants;
}
