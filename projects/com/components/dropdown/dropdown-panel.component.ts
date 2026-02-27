import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { Signal, InputSignal, OutputEmitterRef, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { dropdownPanelVariants, dropdownEmptyVariants } from './dropdown.variants';
import type { DropdownSize } from './dropdown.variants';
import type { ComDropdownEmptyContext, ComDropdownProcessedOption } from './dropdown.models';
import { mergeClasses } from './dropdown.utils';

/**
 * The overlay panel containing the dropdown options.
 * Supports virtual scrolling for large lists.
 *
 * @example
 * ```html
 * <com-dropdown-panel
 *   [options]="filteredOptions()"
 *   [maxHeight]="'300px'"
 *   [virtualScrollEnabled]="true"
 * >
 *   <ng-content />
 * </com-dropdown-panel>
 * ```
 */
@Component({
  selector: 'com-dropdown-panel',
  exportAs: 'comDropdownPanel',
  template: `
    <div
      #panelElement
      [class]="panelClasses()"
      [attr.role]="'listbox'"
      [attr.aria-multiselectable]="multiselectable() || null"
      [attr.id]="panelId()"
    >
      <!-- Search slot -->
      <ng-content select="[comDropdownSearch]" />

      <!-- Options container -->
      @if (virtualScrollEnabled()) {
        <cdk-virtual-scroll-viewport
          [itemSize]="itemSize()"
          [maxBufferPx]="400"
          [minBufferPx]="200"
          [style.height]="maxHeight()"
          class="overflow-auto"
        >
          <div
            *cdkVirtualFor="let option of options(); trackBy: trackByFn; let i = index"
            [attr.data-index]="i"
          >
            <ng-container
              [ngTemplateOutlet]="optionTemplate()"
              [ngTemplateOutletContext]="{ $implicit: option, index: i }"
            />
          </div>
        </cdk-virtual-scroll-viewport>
      } @else {
        <div
          class="overflow-auto"
          [style.maxHeight]="maxHeight()"
        >
          @for (option of options(); track option.id; let i = $index) {
            <ng-container
              [ngTemplateOutlet]="optionTemplate()"
              [ngTemplateOutletContext]="{ $implicit: option, index: i }"
            />
          }
        </div>
      }

      <!-- Empty state -->
      @if (showEmpty()) {
        @if (emptyTemplate()) {
          <ng-container
            [ngTemplateOutlet]="emptyTemplate()!"
            [ngTemplateOutletContext]="emptyContext()"
          />
        } @else {
          <div [class]="emptyClasses()">
            {{ emptyText() }}
          </div>
        }
      }
    </div>
  `,
  imports: [
    NgTemplateOutlet,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-dropdown-panel-host block',
  },
})
export class ComDropdownPanel<T> {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Reference to the panel element. */
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>('panelElement');

  /** Reference to the virtual scroll viewport (when enabled). */
  readonly viewport: Signal<CdkVirtualScrollViewport | undefined> = viewChild<CdkVirtualScrollViewport>('viewport');

  /** Unique identifier for the panel. */
  readonly panelId: InputSignal<string> = input<string>('');

  /** The processed options to display. */
  readonly options: InputSignal<ComDropdownProcessedOption<T>[]> = input<ComDropdownProcessedOption<T>[]>([]);

  /** Maximum height of the panel. */
  readonly maxHeight: InputSignal<string> = input<string>('256px');

  /** Whether multiple selection is enabled. */
  readonly multiselectable: InputSignal<boolean> = input<boolean>(false);

  /** Size variant for styling. */
  readonly size: InputSignal<DropdownSize> = input<DropdownSize>('default');

  /** Additional CSS classes to apply to the panel. */
  readonly panelClass: InputSignal<string> = input<string>('');

  /** Whether virtual scrolling is enabled. */
  readonly virtualScrollEnabled: InputSignal<boolean> = input<boolean>(false);

  /** Item size for virtual scrolling (in pixels). */
  readonly itemSize: InputSignal<number> = input<number>(40);

  /** The current search query (for empty state context). */
  readonly searchQuery: InputSignal<string> = input<string>('');

  /** Custom empty state text. */
  readonly emptyText: InputSignal<string> = input<string>('No options available');

  /** Template for rendering each option. */
  readonly optionTemplate: InputSignal<TemplateRef<{ $implicit: ComDropdownProcessedOption<T>; index: number }>> =
    input.required<TemplateRef<{ $implicit: ComDropdownProcessedOption<T>; index: number }>>();

  /** Custom template for the empty state. */
  readonly emptyTemplate: InputSignal<TemplateRef<ComDropdownEmptyContext> | null> =
    input<TemplateRef<ComDropdownEmptyContext> | null>(null);

  /** Emitted when the panel is scrolled. */
  readonly scrolled: OutputEmitterRef<void> = output<void>();

  /** Whether to show the empty state. */
  protected readonly showEmpty: Signal<boolean> = computed(() => this.options().length === 0);

  /** Computed CSS classes for the panel. */
  protected readonly panelClasses: Signal<string> = computed(() => {
    const baseClasses = dropdownPanelVariants({ size: this.size() });
    return mergeClasses(baseClasses, this.panelClass());
  });

  /** Computed CSS classes for the empty state. */
  protected readonly emptyClasses: Signal<string> = computed(() => {
    return dropdownEmptyVariants({ size: this.size() });
  });

  /** Template context for the empty state. */
  protected readonly emptyContext: Signal<ComDropdownEmptyContext> = computed(() => ({
    $implicit: this.searchQuery(),
  }));

  /** Track function for options. */
  protected trackByFn(_index: number, option: ComDropdownProcessedOption<T>): string {
    return option.id;
  }

  /** Gets the host element. */
  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /** Scrolls to a specific index. */
  scrollToIndex(index: number): void {
    const vp = this.viewport();
    if (this.virtualScrollEnabled() && vp) {
      vp.scrollToIndex(index);
    } else {
      const panelEl = this.panelRef()?.nativeElement;
      const optionEl = panelEl?.querySelector(`[data-index="${index}"]`) as HTMLElement | null;
      optionEl?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  /** Scrolls an option into view. */
  scrollOptionIntoView(optionElement: HTMLElement): void {
    optionElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}
