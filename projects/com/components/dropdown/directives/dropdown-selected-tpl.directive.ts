import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComDropdownSelectedContext } from '../dropdown.models';

/**
 * Directive to mark a template as the custom selected value template.
 *
 * @example
 * ```html
 * <com-dropdown [options]="users()">
 *   <ng-template comDropdownSelected let-user>
 *     @if (user) {
 *       <div class="flex items-center gap-2">
 *         <img [src]="user.avatar" class="h-5 w-5 rounded-full" />
 *         {{ user.name }}
 *       </div>
 *     } @else {
 *       <span class="text-input-placeholder">Select user...</span>
 *     }
 *   </ng-template>
 * </com-dropdown>
 * ```
 */
@Directive({
  selector: 'ng-template[comDropdownSelected]',
})
export class ComDropdownSelectedTpl<T> {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComDropdownSelectedContext<T>> = inject<TemplateRef<ComDropdownSelectedContext<T>>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard<T>(
    _dir: ComDropdownSelectedTpl<T>,
    ctx: unknown
  ): ctx is ComDropdownSelectedContext<T> {
    return true;
  }
}
