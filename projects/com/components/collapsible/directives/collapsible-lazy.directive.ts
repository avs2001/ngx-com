import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Structural directive for lazy content rendering.
 * Content is only instantiated on first expand, preserving state on subsequent toggles.
 *
 * @example
 * ```html
 * <com-collapsible-content>
 *   <ng-template comCollapsibleLazy>
 *     <app-heavy-chart [data]="chartData()" />
 *   </ng-template>
 * </com-collapsible-content>
 * ```
 */
@Directive({
  selector: 'ng-template[comCollapsibleLazy]',
})
export class ComCollapsibleLazy {
  /** Reference to the template. */
  readonly templateRef: TemplateRef<void> = inject<TemplateRef<void>>(TemplateRef);
}
