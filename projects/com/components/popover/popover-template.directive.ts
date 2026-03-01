import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marker directive for lazy popover content templates.
 * Applied to `<ng-template>` to indicate content that should be
 * lazily instantiated when the popover opens.
 *
 * This directive is primarily semantic — it marks the template as popover content
 * and provides access to the TemplateRef for potential content queries.
 *
 * @example
 * ```html
 * <button [uiPopoverTrigger]="helpContent">Help</button>
 * <ng-template uiPopoverTemplate #helpContent>
 *   <p>This is help content.</p>
 * </ng-template>
 * ```
 *
 * Note: You can also pass a template reference directly without this directive:
 * ```html
 * <button [uiPopoverTrigger]="helpContent">Help</button>
 * <ng-template #helpContent>
 *   <p>This also works.</p>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[uiPopoverTemplate]',
  exportAs: 'uiPopoverTemplate',
})
export class PopoverTemplateDirective {
  /** Reference to the template for rendering. */
  readonly templateRef: TemplateRef<unknown> = inject(TemplateRef);
}
