import { Directive, inject, InjectionToken, TemplateRef } from '@angular/core';

// ============================================================================
// Context Types
// ============================================================================

/** Context for custom option template */
export interface ComSelectOptionContext<T> {
  /** The option value */
  $implicit: T;
  /** The option label */
  label: string;
  /** Whether the option is selected */
  selected: boolean;
  /** Whether the option is active (keyboard focused) */
  active: boolean;
}

/** Context for custom value display template */
export interface ComSelectValueContext<T> {
  /** The selected value (null if none) */
  $implicit: T | null;
  /** The placeholder text */
  placeholder: string;
}

/** Context for custom panel header template */
export interface ComSelectPanelHeaderContext {
  // Empty context
}

/** Context for custom panel footer template */
export interface ComSelectPanelFooterContext {
  // Empty context
}

/** Context for custom no-results template */
export interface ComSelectNoResultsContext {
  /** The current search query */
  query: string;
}

/** Context for custom loading template */
export interface ComSelectLoadingContext {
  // Empty context
}

// ============================================================================
// Template Directives
// ============================================================================

/**
 * Directive for custom option rendering.
 * Place inside com-select to customize how each option is displayed.
 *
 * @example
 * ```html
 * <com-select>
 *   <ng-template comSelectOptionTpl let-option let-selected="selected">
 *     <span [class.font-bold]="selected">{{ option.name }}</span>
 *   </ng-template>
 *   <com-select-option *ngFor="let item of items" [value]="item" [label]="item.name" />
 * </com-select>
 * ```
 */
@Directive({
  selector: 'ng-template[comSelectOptionTpl]',
})
export class ComSelectOptionTpl<T> {
  readonly templateRef: TemplateRef<ComSelectOptionContext<T>> = inject(TemplateRef);
}

/**
 * Directive for custom trigger value display.
 * Place inside com-select to customize how the selected value is shown in the trigger.
 *
 * @example
 * ```html
 * <com-select>
 *   <ng-template comSelectValueTpl let-value let-placeholder="placeholder">
 *     @if (value) {
 *       <img [src]="value.avatar" class="w-5 h-5 rounded-full" />
 *       <span>{{ value.name }}</span>
 *     } @else {
 *       <span class="text-surface-400">{{ placeholder }}</span>
 *     }
 *   </ng-template>
 *   ...
 * </com-select>
 * ```
 */
@Directive({
  selector: 'ng-template[comSelectValueTpl]',
})
export class ComSelectValueTpl<T> {
  readonly templateRef: TemplateRef<ComSelectValueContext<T>> = inject(TemplateRef);
}

/**
 * Directive for custom panel header content.
 * Place inside com-select to add content above the listbox in the dialog.
 *
 * @example
 * ```html
 * <com-select>
 *   <ng-template comSelectPanelHeaderTpl>
 *     <div class="px-3 py-2 text-sm text-surface-500 border-b border-surface-200">
 *       Select a country
 *     </div>
 *   </ng-template>
 *   ...
 * </com-select>
 * ```
 */
@Directive({
  selector: 'ng-template[comSelectPanelHeaderTpl]',
})
export class ComSelectPanelHeaderTpl {
  readonly templateRef: TemplateRef<ComSelectPanelHeaderContext> = inject(TemplateRef);
}

/**
 * Directive for custom panel footer content.
 * Place inside com-select to add content below the listbox in the dialog.
 *
 * @example
 * ```html
 * <com-select>
 *   <ng-template comSelectPanelFooterTpl>
 *     <div class="px-3 py-2 text-sm text-surface-500 border-t border-surface-200">
 *       <button type="button">Add new item</button>
 *     </div>
 *   </ng-template>
 *   ...
 * </com-select>
 * ```
 */
@Directive({
  selector: 'ng-template[comSelectPanelFooterTpl]',
})
export class ComSelectPanelFooterTpl {
  readonly templateRef: TemplateRef<ComSelectPanelFooterContext> = inject(TemplateRef);
}

/**
 * Directive for custom no-results message.
 * Place inside com-select to customize the empty state when search has no matches.
 *
 * @example
 * ```html
 * <com-select [searchable]="true">
 *   <ng-template comSelectNoResultsTpl let-query="query">
 *     <div class="flex flex-col items-center py-8 text-surface-400">
 *       <svg class="w-8 h-8 mb-2">...</svg>
 *       <span>No matches for "{{ query }}"</span>
 *     </div>
 *   </ng-template>
 *   ...
 * </com-select>
 * ```
 */
@Directive({
  selector: 'ng-template[comSelectNoResultsTpl]',
})
export class ComSelectNoResultsTpl {
  readonly templateRef: TemplateRef<ComSelectNoResultsContext> = inject(TemplateRef);
}

/**
 * Directive for custom loading indicator.
 * Place inside com-select to customize the loading state display.
 *
 * @example
 * ```html
 * <com-select [loading]="isLoading()">
 *   <ng-template comSelectLoadingTpl>
 *     <div class="flex items-center justify-center py-8">
 *       <my-spinner />
 *       <span class="ml-2">Fetching results...</span>
 *     </div>
 *   </ng-template>
 *   ...
 * </com-select>
 * ```
 */
@Directive({
  selector: 'ng-template[comSelectLoadingTpl]',
})
export class ComSelectLoadingTpl {
  readonly templateRef: TemplateRef<ComSelectLoadingContext> = inject(TemplateRef);
}

// ============================================================================
// Injection Tokens
// ============================================================================

/**
 * Service that provides the option template to com-select-option components.
 * Created and provided by com-select.
 */
export class ComSelectOptionTplProvider<T> {
  optionTpl: ComSelectOptionTpl<T> | null = null;
}

/**
 * Injection token for providing the option template to com-select-option.
 * Used internally by com-select to pass the custom option template to its options.
 */
export const COM_SELECT_OPTION_TPL_TOKEN: InjectionToken<ComSelectOptionTplProvider<unknown>> = new InjectionToken<ComSelectOptionTplProvider<unknown>>(
  'COM_SELECT_OPTION_TPL_TOKEN'
);
