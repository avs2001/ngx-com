import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import type {
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { TabComponent } from './tab.component';
import {
  tabItemVariants,
  tabHeaderVariants,
  tabScrollButtonVariants,
  tabCloseButtonVariants,
} from './tabs.variants';
import type { TabVariant, TabSize, TabColor, TabAlignment } from './tabs.variants';
import { mergeClasses } from './tabs.utils';
import { NgTemplateOutlet } from '@angular/common';

/** Internal tab item interface for focus management. */
interface TabItem {
  focus: () => void;
  disabled: boolean;
}

/**
 * Internal scrollable tab header component.
 *
 * Handles overflow detection, scroll buttons, keyboard navigation,
 * and the active indicator (for underline variant).
 *
 * @internal Not exported in public API.
 */
@Component({
  selector: 'com-tab-header',
  template: `
    <!-- Scroll button left -->
    @if (showScrollLeft()) {
      <button
        type="button"
        [class]="scrollLeftClasses()"
        (click)="scrollLeft()"
        aria-hidden="true"
        tabindex="-1"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    }

    <!-- Tab list -->
    <div
      #scrollContainer
      class="flex overflow-x-auto scrollbar-none"
      [class]="headerClasses()"
      role="tablist"
      [attr.aria-orientation]="'horizontal'"
      (scroll)="onScroll()"
      (keydown)="onKeydown($event)"
    >
      @for (tab of tabs(); track $index; let i = $index) {
        <button
          #tabButton
          type="button"
          role="tab"
          [id]="getTabId(i)"
          [class]="getTabClasses(i)"
          [attr.aria-selected]="selectedIndex() === i"
          [attr.aria-controls]="getPanelId(i)"
          [attr.aria-disabled]="tab.disabled() || null"
          [attr.data-state]="selectedIndex() === i ? 'active' : 'inactive'"
          [disabled]="tab.disabled()"
          [tabindex]="selectedIndex() === i ? 0 : -1"
          (click)="selectTab(i)"
          (focus)="onTabFocus(i)"
        >
          @if (tab.labelTemplate()) {
            <ng-container [ngTemplateOutlet]="tab.labelTemplate()!" />
          } @else {
            {{ tab.label() }}
          }

          @if (tab.closable()) {
            <span
              role="button"
              [class]="closeButtonClasses()"
              (click)="closeTab($event, i)"
              [attr.aria-label]="'Close ' + tab.label()"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-full w-full"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          }
        </button>
      }

      <!-- Active indicator (underline variant only) -->
      @if (variant() === 'underline') {
        <div
          class="absolute bottom-0 h-0.5 bg-current transition-all duration-200 ease-out"
          [class]="indicatorColorClass()"
          [style.left.px]="indicatorLeft()"
          [style.width.px]="indicatorWidth()"
        ></div>
      }
    </div>

    <!-- Scroll button right -->
    @if (showScrollRight()) {
      <button
        type="button"
        [class]="scrollRightClasses()"
        (click)="scrollRight()"
        aria-hidden="true"
        tabindex="-1"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }
    .scrollbar-none {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabHeaderComponent {
  private readonly destroyRef = inject(DestroyRef);

  // ─── Inputs ───

  readonly tabs: InputSignal<readonly TabComponent[]> = input.required<readonly TabComponent[]>();
  readonly selectedIndex: InputSignal<number> = input.required<number>();
  readonly variant: InputSignal<TabVariant> = input<TabVariant>('underline');
  readonly size: InputSignal<TabSize> = input<TabSize>('md');
  readonly color: InputSignal<TabColor> = input<TabColor>('primary');
  readonly alignment: InputSignal<TabAlignment> = input<TabAlignment>('start');
  readonly baseId: InputSignal<string> = input.required<string>();

  // ─── Outputs ───

  readonly tabSelected: OutputEmitterRef<number> = output<number>();
  readonly tabFocused: OutputEmitterRef<number> = output<number>();
  readonly tabClosed: OutputEmitterRef<number> = output<number>();

  // ─── View Children ───

  readonly scrollContainer: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('scrollContainer');
  readonly tabButtons: Signal<readonly ElementRef<HTMLButtonElement>[]> =
    viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  // ─── State ───

  private readonly scrollLeftValue: WritableSignal<number> = signal(0);
  private readonly containerWidth: WritableSignal<number> = signal(0);
  private readonly scrollWidth: WritableSignal<number> = signal(0);
  protected readonly indicatorLeft: WritableSignal<number> = signal(0);
  protected readonly indicatorWidth: WritableSignal<number> = signal(0);

  private keyManager: FocusKeyManager<TabItem> | null = null;
  private resizeObserver: ResizeObserver | null = null;

  // ─── Computed ───

  readonly hasOverflow: Signal<boolean> = computed(
    () => this.scrollWidth() > this.containerWidth()
  );

  readonly showScrollLeft: Signal<boolean> = computed(
    () => this.hasOverflow() && this.scrollLeftValue() > 0
  );

  readonly showScrollRight: Signal<boolean> = computed(() => {
    const remaining = this.scrollWidth() - this.containerWidth() - this.scrollLeftValue();
    return this.hasOverflow() && remaining > 1;
  });

  readonly headerClasses: Signal<string> = computed(() =>
    mergeClasses(
      tabHeaderVariants({
        alignment: this.alignment(),
        variant: this.variant(),
      }),
      'relative'
    )
  );

  readonly scrollLeftClasses: Signal<string> = computed(() =>
    tabScrollButtonVariants({
      direction: 'left',
      variant: this.variant(),
    })
  );

  readonly scrollRightClasses: Signal<string> = computed(() =>
    tabScrollButtonVariants({
      direction: 'right',
      variant: this.variant(),
    })
  );

  readonly closeButtonClasses: Signal<string> = computed(() =>
    tabCloseButtonVariants({ size: this.size() })
  );

  readonly indicatorColorClass: Signal<string> = computed(() => {
    const colorMap: Record<TabColor, string> = {
      primary: 'text-primary',
      accent: 'text-accent',
      muted: 'text-foreground',
    };
    return colorMap[this.color()];
  });

  constructor() {
    // Setup resize observer after render
    afterNextRender(() => {
      this.setupResizeObserver();
      this.updateScrollState();
      this.updateIndicator();
      this.setupKeyManager();
    });

    // Update indicator when selected index changes
    effect(() => {
      this.selectedIndex();
      this.updateIndicator();
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.keyManager?.destroy();
    });
  }

  // ─── Public Methods ───

  getTabId(index: number): string {
    return `${this.baseId()}-tab-${index}`;
  }

  getPanelId(index: number): string {
    return `${this.baseId()}-panel-${index}`;
  }

  getTabClasses(index: number): string {
    return tabItemVariants({
      variant: this.variant(),
      size: this.size(),
      color: this.color(),
      active: this.selectedIndex() === index,
    });
  }

  selectTab(index: number): void {
    const tab = this.tabs()[index];
    if (tab && !tab.disabled()) {
      this.tabSelected.emit(index);
      this.scrollTabIntoView(index);
    }
  }

  scrollLeft(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  scrollRight(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  // ─── Event Handlers ───

  protected onScroll(): void {
    this.updateScrollState();
  }

  protected onTabFocus(index: number): void {
    this.tabFocused.emit(index);
    this.scrollTabIntoView(index);
  }

  protected closeTab(event: Event, index: number): void {
    event.stopPropagation();
    this.tabClosed.emit(index);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.keyManager) return;

    switch (event.key) {
      case 'ArrowLeft':
        this.keyManager.setPreviousItemActive();
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.keyManager.setNextItemActive();
        event.preventDefault();
        break;
      case 'Home':
        this.keyManager.setFirstItemActive();
        event.preventDefault();
        break;
      case 'End':
        this.keyManager.setLastItemActive();
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        const activeIndex = this.keyManager.activeItemIndex;
        if (activeIndex !== null && activeIndex >= 0) {
          this.selectTab(activeIndex);
        }
        event.preventDefault();
        break;
    }
  }

  // ─── Private Methods ───

  private setupResizeObserver(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.updateScrollState();
      this.updateIndicator();
    });
    this.resizeObserver.observe(container);
  }

  private updateScrollState(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    this.scrollLeftValue.set(container.scrollLeft);
    this.containerWidth.set(container.clientWidth);
    this.scrollWidth.set(container.scrollWidth);
  }

  private updateIndicator(): void {
    const buttons = this.tabButtons();
    const index = this.selectedIndex();

    if (buttons.length === 0 || index < 0 || index >= buttons.length) {
      this.indicatorLeft.set(0);
      this.indicatorWidth.set(0);
      return;
    }

    const button = buttons[index]?.nativeElement;
    if (button) {
      this.indicatorLeft.set(button.offsetLeft);
      this.indicatorWidth.set(button.offsetWidth);
    }
  }

  private scrollTabIntoView(index: number): void {
    const container = this.scrollContainer()?.nativeElement;
    const buttons = this.tabButtons();

    if (!container || index < 0 || index >= buttons.length) return;

    const button = buttons[index]?.nativeElement;
    if (!button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    if (buttonRect.left < containerRect.left) {
      container.scrollTo({
        left: container.scrollLeft - (containerRect.left - buttonRect.left) - 16,
        behavior: 'smooth',
      });
    } else if (buttonRect.right > containerRect.right) {
      container.scrollTo({
        left: container.scrollLeft + (buttonRect.right - containerRect.right) + 16,
        behavior: 'smooth',
      });
    }
  }

  private setupKeyManager(): void {
    const items = this.createKeyManagerItems();
    this.keyManager = new FocusKeyManager(items)
      .withHorizontalOrientation('ltr')
      .withWrap()
      .skipPredicate(item => item.disabled);

    this.keyManager.setActiveItem(this.selectedIndex());
  }

  private createKeyManagerItems(): TabItem[] {
    const buttons = this.tabButtons();
    const tabs = this.tabs();

    return buttons.map((buttonRef, index) => ({
      focus: () => buttonRef.nativeElement.focus(),
      disabled: tabs[index]?.disabled() ?? false,
    }));
  }
}
