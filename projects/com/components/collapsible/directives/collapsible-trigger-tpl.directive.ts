import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComCollapsibleTriggerContext } from '../collapsible.models';

/**
 * Directive to mark a template as the custom trigger layout template.
 * Replaces the inner content of the trigger while preserving ARIA and keyboard handling.
 *
 * @example
 * ```html
 * <button comCollapsibleTrigger>
 *   <ng-template comCollapsibleTriggerTpl let-open let-toggle="toggle" let-disabled="disabled">
 *     <div class="flex items-center gap-3 w-full">
 *       <span class="h-2 w-2 rounded-full" [class]="open ? 'bg-success' : 'bg-muted'"></span>
 *       <span class="font-medium">Notifications</span>
 *       <svg class="com-collapsible-icon h-4 w-4" [attr.data-state]="open ? 'open' : 'closed'">
 *         <!-- chevron icon -->
 *       </svg>
 *     </div>
 *   </ng-template>
 * </button>
 * ```
 */
@Directive({
  selector: 'ng-template[comCollapsibleTriggerTpl]',
})
export class ComCollapsibleTriggerTpl {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComCollapsibleTriggerContext> =
    inject<TemplateRef<ComCollapsibleTriggerContext>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard(
    _dir: ComCollapsibleTriggerTpl,
    ctx: unknown
  ): ctx is ComCollapsibleTriggerContext {
    return true;
  }
}
