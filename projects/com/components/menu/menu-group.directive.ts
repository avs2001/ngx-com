import { Directive, forwardRef, input, model } from '@angular/core';
import type { InputSignal, ModelSignal } from '@angular/core';

/**
 * Token for menu group to allow radio items to coordinate.
 */
export abstract class MenuGroupRef {
  abstract readonly groupValue: () => unknown;
  abstract setGroupValue(value: unknown): void;
}

/**
 * Menu group directive for organizing related items.
 * For radio items, ensures mutual exclusivity within the group.
 *
 * @example
 * ```html
 * <div comMenuGroup [(groupValue)]="sortField">
 *   <button comMenuItemRadio value="name">Name</button>
 *   <button comMenuItemRadio value="date">Date</button>
 * </div>
 * ```
 *
 * @tokens None - uses only ARIA attributes
 */
@Directive({
  selector: '[comMenuGroup]',
  exportAs: 'comMenuGroup',
  providers: [{ provide: MenuGroupRef, useExisting: forwardRef(() => MenuGroupDirective) }],
  host: {
    '[attr.role]': '"group"',
    '[attr.aria-label]': 'ariaLabel() || null',
  },
})
export class MenuGroupDirective extends MenuGroupRef {
  /** Optional accessible label for the group. */
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Two-way bindable value for radio groups. */
  readonly groupValue: ModelSignal<unknown> = model<unknown>(undefined);

  setGroupValue(value: unknown): void {
    this.groupValue.set(value);
  }
}
