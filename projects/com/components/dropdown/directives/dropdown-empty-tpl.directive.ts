import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComDropdownEmptyContext } from '../dropdown.models';

/**
 * Directive to mark a template as the custom empty state template.
 *
 * @example
 * ```html
 * <com-dropdown [options]="users()" [searchable]="true">
 *   <ng-template comDropdownEmpty let-query>
 *     <div class="flex flex-col items-center gap-2 py-6">
 *       <svg class="h-8 w-8 text-surface-400"><!-- search icon --></svg>
 *       <span>No results for "{{ query }}"</span>
 *     </div>
 *   </ng-template>
 * </com-dropdown>
 * ```
 */
@Directive({
  selector: 'ng-template[comDropdownEmpty]',
})
export class ComDropdownEmptyTpl {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComDropdownEmptyContext> = inject<TemplateRef<ComDropdownEmptyContext>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard(
    _dir: ComDropdownEmptyTpl,
    ctx: unknown
  ): ctx is ComDropdownEmptyContext {
    return true;
  }
}
