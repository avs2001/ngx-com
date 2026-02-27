import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComDropdownOptionContext } from '../dropdown.models';

/**
 * Directive to mark a template as the custom option template.
 *
 * @example
 * ```html
 * <com-dropdown [options]="users()">
 *   <ng-template comDropdownOption let-user let-selected="selected">
 *     <div class="flex items-center gap-2">
 *       <span>{{ user.name }}</span>
 *       @if (selected) {
 *         <svg class="h-4 w-4"><!-- check --></svg>
 *       }
 *     </div>
 *   </ng-template>
 * </com-dropdown>
 * ```
 */
@Directive({
  selector: 'ng-template[comDropdownOption]',
})
export class ComDropdownOptionTpl<T> {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComDropdownOptionContext<T>> = inject<TemplateRef<ComDropdownOptionContext<T>>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard<T>(
    _dir: ComDropdownOptionTpl<T>,
    ctx: unknown
  ): ctx is ComDropdownOptionContext<T> {
    return true;
  }
}
