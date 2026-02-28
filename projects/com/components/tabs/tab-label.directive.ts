import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marker directive for custom tab label templates.
 *
 * Provides a custom label template for rich tab headers (icons, badges, counters).
 * Applied to an `<ng-template>` inside `<ui-tab>`.
 *
 * @example
 * ```html
 * <ui-tab>
 *   <ng-template uiTabLabel>
 *     <svg class="w-4 h-4">...</svg>
 *     <span>Settings</span>
 *     <span class="bg-warn text-warn-foreground text-xs rounded-pill px-1.5">3</span>
 *   </ng-template>
 *   <p>Tab content here.</p>
 * </ui-tab>
 * ```
 */
@Directive({
  selector: 'ng-template[uiTabLabel]',
})
export class TabLabelDirective {
  readonly templateRef: TemplateRef<void> = inject(TemplateRef);

  static ngTemplateContextGuard(
    _dir: TabLabelDirective,
    ctx: unknown
  ): ctx is void {
    return true;
  }
}
