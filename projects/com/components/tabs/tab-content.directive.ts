import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marker directive for lazy tab content rendering.
 *
 * Content wrapped in `<ng-template comTabContent>` is only instantiated
 * when the tab becomes active for the first time.
 *
 * @example Lazy loaded content
 * ```html
 * <com-tab label="Analytics">
 *   <ng-template comTabContent>
 *     <app-analytics-dashboard />
 *   </ng-template>
 * </com-tab>
 * ```
 *
 * @example Combined with @defer
 * ```html
 * <com-tab label="Reports">
 *   <ng-template comTabContent>
 *     &#64;defer {
 *       <app-report-builder />
 *     } &#64;loading {
 *       <p>Loading reports...</p>
 *     }
 *   </ng-template>
 * </com-tab>
 * ```
 */
@Directive({
  selector: 'ng-template[comTabContent]',
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
