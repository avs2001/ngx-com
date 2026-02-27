import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComDropdownTagContext } from '../dropdown.models';

/**
 * Directive to mark a template as the custom tag template (multi-select mode).
 *
 * @example
 * ```html
 * <com-dropdown [options]="users()" [multiple]="true">
 *   <ng-template comDropdownTag let-user let-remove="remove">
 *     <div class="flex items-center gap-1 rounded bg-primary-100 px-2 py-0.5">
 *       <img [src]="user.avatar" class="h-4 w-4 rounded-full" />
 *       <span>{{ user.name }}</span>
 *       <button type="button" (click)="remove()" class="ml-1">
 *         <svg class="h-3 w-3"><!-- x icon --></svg>
 *       </button>
 *     </div>
 *   </ng-template>
 * </com-dropdown>
 * ```
 */
@Directive({
  selector: 'ng-template[comDropdownTag]',
})
export class ComDropdownTagTpl<T> {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComDropdownTagContext<T>> = inject<TemplateRef<ComDropdownTagContext<T>>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard<T>(
    _dir: ComDropdownTagTpl<T>,
    ctx: unknown
  ): ctx is ComDropdownTagContext<T> {
    return true;
  }
}
