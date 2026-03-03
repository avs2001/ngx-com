import { computed, Directive, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { hintVariants } from './form-field.variants';
import { mergeClasses } from 'ngx-com/utils';

/** Alignment of hint text in the subscript area. */
export type HintAlign = 'start' | 'end';

/** Auto-incrementing ID counter. */
let nextId = 0;

/**
 * Directive for hint text displayed below the form field.
 *
 * The hint provides supplementary information to help users fill out the field.
 * It is automatically added to the control's `aria-describedby`.
 *
 * @tokens `--color-muted-foreground`
 *
 * @example Basic hint
 * ```html
 * <com-form-field>
 *   <label comLabel>Password</label>
 *   <input comInput formControlName="password" />
 *   <span comHint>At least 8 characters</span>
 * </com-form-field>
 * ```
 *
 * @example Right-aligned hint (e.g., character count)
 * ```html
 * <com-form-field>
 *   <label comLabel>Bio</label>
 *   <textarea comInput formControlName="bio"></textarea>
 *   <span comHint>Keep it brief</span>
 *   <span comHint align="end">{{ bioLength }}/150</span>
 * </com-form-field>
 * ```
 */
@Directive({
  selector: '[comHint]',
  exportAs: 'comHint',
  host: {
    '[id]': 'id',
    '[class]': 'hostClasses()',
  },
})
export class ComHint {
  readonly id: string = `com-hint-${nextId++}`;
  readonly align: InputSignal<HintAlign> = input<HintAlign>('start');

  protected readonly hostClasses: Signal<string> = computed(() =>
    mergeClasses(hintVariants(), this.align() === 'end' && 'ml-auto')
  );
}
