import { Directive, TemplateRef, inject } from '@angular/core';
import type { SegmentOption } from './segmented-control.component';

/**
 * Template context provided to custom segment templates.
 *
 * @example
 * ```html
 * <ng-template comSegmentDef let-option let-active="active">
 *   <com-icon [name]="option.value" />
 *   <span>{{ option.label }}</span>
 * </ng-template>
 * ```
 */
export interface SegmentTemplateContext<T = unknown> {
  /** The option object (default for `let-option`). */
  $implicit: SegmentOption<T>;
  /** Whether this segment is currently selected. */
  active: boolean;
  /** Whether this segment is disabled. */
  disabled: boolean;
  /** Position in the options list (0-indexed). */
  index: number;
}

/**
 * Directive to mark a custom template for segment content.
 *
 * The template receives a `SegmentTemplateContext` with the option data,
 * active state, disabled state, and index. Use this to customize the
 * inner content of each segment while the component manages the button,
 * styling, and ARIA attributes.
 *
 * @example Icon + text
 * ```html
 * <com-segmented-control [options]="viewOptions" [(value)]="currentView">
 *   <ng-template comSegmentDef let-option let-active="active">
 *     <com-icon [name]="option.value" size="sm" />
 *     <span>{{ option.label }}</span>
 *   </ng-template>
 * </com-segmented-control>
 * ```
 *
 * @example Icon only (label used for accessibility)
 * ```html
 * <com-segmented-control [options]="alignmentOptions" [(value)]="alignment">
 *   <ng-template comSegmentDef let-option>
 *     <com-icon [name]="'align-' + option.value" size="sm" />
 *   </ng-template>
 * </com-segmented-control>
 * ```
 */
@Directive({
  selector: 'ng-template[comSegmentDef]',
})
export class ComSegmentDef<T = unknown> {
  readonly templateRef: TemplateRef<SegmentTemplateContext<T>> = inject(TemplateRef);
}
