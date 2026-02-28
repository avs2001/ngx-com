import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComCollapsibleIconContext } from '../collapsible.models';

/**
 * Directive to mark a template as the custom icon template.
 * Replaces only the chevron icon inside the default trigger layout.
 *
 * @example
 * ```html
 * <button comCollapsibleTrigger>
 *   Settings
 *   <ng-template comCollapsibleIcon let-open="open">
 *     <span class="text-muted-foreground text-xs">{{ open ? '▲' : '▼' }}</span>
 *   </ng-template>
 * </button>
 * ```
 */
@Directive({
  selector: 'ng-template[comCollapsibleIcon]',
})
export class ComCollapsibleIconTpl {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComCollapsibleIconContext> =
    inject<TemplateRef<ComCollapsibleIconContext>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard(
    _dir: ComCollapsibleIconTpl,
    ctx: unknown
  ): ctx is ComCollapsibleIconContext {
    return true;
  }
}
