import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marker directive for lazy tab content rendering.
 *
 * Content wrapped in `<ng-template uiTabContent>` is only instantiated
 * when the tab becomes active for the first time.
 *
 * @example Lazy loaded content
 * ```html
 * <ui-tab label="Analytics">
 *   <ng-template uiTabContent>
 *     <app-analytics-dashboard />
 *   </ng-template>
 * </ui-tab>
 * ```
 *
 * @example Combined with @defer
 * ```html
 * <ui-tab label="Reports">
 *   <ng-template uiTabContent>
 *     &#64;defer {
 *       <app-report-builder />
 *     } &#64;loading {
 *       <p>Loading reports...</p>
 *     }
 *   </ng-template>
 * </ui-tab>
 * ```
 */
@Directive({
  selector: 'ng-template[uiTabContent]',
})
export class TabContentDirective {
  readonly templateRef: TemplateRef<void> = inject(TemplateRef);

  static ngTemplateContextGuard(
    _dir: TabContentDirective,
    ctx: unknown
  ): ctx is void {
    return true;
  }
}
