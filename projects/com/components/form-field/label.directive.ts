import { Directive, signal } from '@angular/core';
import type { Signal } from '@angular/core';

/** Auto-incrementing ID counter. */
let nextId = 0;

/**
 * Directive to mark the label element inside a form field.
 *
 * The form field automatically associates this label with the inner control
 * and positions it appropriately based on appearance and float state.
 *
 * @example
 * ```html
 * <com-form-field>
 *   <label comLabel>Email address</label>
 *   <input comInput formControlName="email" />
 * </com-form-field>
 * ```
 */
@Directive({
  selector: '[comLabel]',
  exportAs: 'comLabel',
  host: {
    '[attr.for]': 'forId()',
    '[id]': 'labelId',
  },
})
export class ComLabel {
  readonly labelId: string = `com-label-${nextId++}`;

  private readonly _forId = signal<string | null>(null);
  readonly forId: Signal<string | null> = this._forId.asReadonly();

  /** Sets the `for` attribute to link to the control. Called by form field. */
  setForId(id: string): void {
    this._forId.set(id);
  }
}
