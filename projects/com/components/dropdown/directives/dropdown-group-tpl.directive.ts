import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComDropdownGroupContext } from '../dropdown.models';

/**
 * Directive to mark a template as the custom group header template.
 *
 * @example
 * ```html
 * <com-dropdown [options]="users()" [groupBy]="groupByDepartment">
 *   <ng-template comDropdownGroup let-group let-count="count">
 *     <div class="flex items-center justify-between">
 *       <span class="font-semibold">{{ group }}</span>
 *       <span class="text-xs text-muted-foreground">({{ count }})</span>
 *     </div>
 *   </ng-template>
 * </com-dropdown>
 * ```
 */
@Directive({
  selector: 'ng-template[comDropdownGroup]',
})
export class ComDropdownGroupTpl {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComDropdownGroupContext> = inject<TemplateRef<ComDropdownGroupContext>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard(
    _dir: ComDropdownGroupTpl,
    ctx: unknown
  ): ctx is ComDropdownGroupContext {
    return true;
  }
}
