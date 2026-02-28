import { Directive, TemplateRef, inject } from '@angular/core';
import type { ComCollapsibleContentContext } from '../collapsible.models';

/**
 * Directive to mark a template as the custom content chrome template.
 * Wraps the content with custom chrome (headers, footers, padding).
 * The grid animation still applies on the host.
 *
 * @example
 * ```html
 * <com-collapsible-content>
 *   <ng-template comCollapsibleContentTpl let-open="open">
 *     <div class="border-t border-border">
 *       <div class="p-4 space-y-3">
 *         <!-- Content here -->
 *       </div>
 *       <div class="flex justify-end gap-2 px-4 py-3 border-t border-border-subtle bg-muted">
 *         <button>Reset</button>
 *         <button>Apply</button>
 *       </div>
 *     </div>
 *   </ng-template>
 * </com-collapsible-content>
 * ```
 */
@Directive({
  selector: 'ng-template[comCollapsibleContentTpl]',
})
export class ComCollapsibleContentTpl {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<ComCollapsibleContentContext> =
    inject<TemplateRef<ComCollapsibleContentContext>>(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard(
    _dir: ComCollapsibleContentTpl,
    ctx: unknown
  ): ctx is ComCollapsibleContentContext {
    return true;
  }
}
