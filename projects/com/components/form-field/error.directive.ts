import { computed, Directive, input, signal } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { errorVariants } from './form-field.variants';

/** Auto-incrementing ID counter. */
let nextId = 0;

/**
 * Directive for error messages displayed below the form field.
 *
 * Errors replace hints when the control is in an error state.
 * Uses `role="alert"` and `aria-live="polite"` for screen reader announcement.
 *
 * The optional `match` input allows showing errors only for specific validation errors.
 *
 * @tokens `--color-warn`
 *
 * @example Basic error
 * ```html
 * <com-form-field>
 *   <label comLabel>Email</label>
 *   <input comInput formControlName="email" />
 *   <span comError>Please enter a valid email</span>
 * </com-form-field>
 * ```
 *
 * @example Matching specific errors
 * ```html
 * <com-form-field>
 *   <label comLabel>Email</label>
 *   <input comInput formControlName="email" />
 *   <span comError match="required">Email is required.</span>
 *   <span comError match="email">Must be a valid email address.</span>
 * </com-form-field>
 * ```
 */
@Directive({
  selector: '[comError]',
  exportAs: 'comError',
  host: {
    '[id]': 'id',
    '[class]': 'errorVariants()',
    '[class.hidden]': '!shouldShow()',
    'role': 'alert',
    'aria-live': 'polite',
  },
})
export class ComError {
  readonly id: string = `com-error-${nextId++}`;

  /** Reference to the form control, set by the parent form field. */
  private readonly _control: WritableSignal<AbstractControl | null> = signal(null);

  /**
   * Show this error only when a specific validation error key is present.
   * If empty, the error is always shown when the control is in error state.
   */
  readonly match: InputSignal<string> = input<string>('');

  protected readonly errorVariants: () => string = errorVariants;

  /**
   * Whether this error should be displayed based on the match condition.
   * Used by the form field to filter which errors to show.
   */
  readonly shouldShow: Signal<boolean> = computed(() => {
    const matchKey = this.match();
    if (!matchKey) return true;

    const errors = this._control()?.errors;
    return errors ? matchKey in errors : false;
  });

  /**
   * Sets the form control reference.
   * Called by the parent form field component.
   */
  setControl(control: AbstractControl | null): void {
    this._control.set(control);
  }
}
