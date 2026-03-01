import { Injectable } from '@angular/core';
import type { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

/**
 * Strategy for determining when to display errors in a form field.
 *
 * The default behavior shows errors when the control is invalid AND
 * either touched OR the parent form has been submitted.
 *
 * @example Override globally with eager error display
 * ```ts
 * @Injectable()
 * export class EagerErrorStateMatcher extends ErrorStateMatcher {
 *   override isErrorState(control: AbstractControl | null): boolean {
 *     return !!(control?.invalid && control.dirty);
 *   }
 * }
 *
 * // In app config
 * providers: [{ provide: ErrorStateMatcher, useClass: EagerErrorStateMatcher }]
 * ```
 *
 * @example Per-field override
 * ```html
 * <com-form-field>
 *   <input comInput [errorStateMatcher]="eagerMatcher" />
 * </com-form-field>
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ErrorStateMatcher {
  isErrorState(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control?.invalid && (control.touched || form?.submitted));
  }
}
