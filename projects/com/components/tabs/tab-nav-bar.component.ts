import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  inject,
  input,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { TabLinkDirective } from './tab-link.directive';
import { tabHeaderVariants, tabScrollButtonVariants } from './tabs.variants';
import type { TabVariant, TabSize, TabColor, TabAlignment } from './tabs.variants';
import { mergeClasses, generateTabId } from './tabs.utils';

/** Internal item interface for focus management. */
interface NavTabItem {
  focus: () => void;
  disabled: boolean;
}

/**
 * Tab navigation bar component for route-driven tabs.
 *
 * Renders a styled, scrollable row of links that map to routes.
 * Content is handled by `<router-outlet>`.
 *
 * @tokens `--color-primary`, `--color-accent`, `--color-muted`, `--color-muted-foreground`,
 *         `--color-border`, `--color-ring`, `--color-disabled`, `--color-disabled-foreground`
 *
 * @example Basic usage
 * ```html
 * <nav com-tab-nav-bar>
 *   <a comTabLink routerLink="overview" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">
 *     Overview
 *   </a>
 *   <a comTabLink routerLink="settings" routerLinkActive #rla2="routerLinkActive" [active]="rla2.isActive">
 *     Settings
 *   </a>
 * </nav>
 * <router-outlet />
 * ```
 *
 * @example With variants
 * ```html
 * <nav com-tab-nav-bar variant="pill" color="accent" size="sm">
 *   <a comTabLink routerLink="grid">Grid</a>
 *   <a comTabLink routerLink="list">List</a>
 * </nav>
 * ```
 */
@Component({
  selector: 'com-tab-nav-bar, nav[com-tab-nav-bar]',
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

    <!-- Tab link container -->
    <div
      #scrollContainer
      class="flex overflow-x-auto scrollbar-none"
      [class]="headerClasses()"
      role="tablist"
      [attr.aria-orientation]="'horizontal'"
      (scroll)="onScroll()"
      (keydown)="onKeydown($event)"
    >
      <ng-content />

      <!-- Active indicator (underline variant only) -->
      @if (variant() === 'underline' && activeLink()) {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-tab-nav-bar',
  },
})
export class TabNavBarComponent {
  private readonly destroyRef = inject(DestroyRef);

  /** Unique ID for this nav bar instance. */
  readonly baseId: string = generateTabId();

  // ─── Inputs ───

  /** Visual treatment of tab links. */
  readonly variant: InputSignal<TabVariant> = input<TabVariant>('underline');

  /** Controls tab link padding and font size. */
  readonly size: InputSignal<TabSize> = input<TabSize>('md');

  /** Active tab color. */
  readonly color: InputSignal<TabColor> = input<TabColor>('primary');

  /** Tab alignment within the bar. */
  readonly alignment: InputSignal<TabAlignment> = input<TabAlignment>('start');

  // ─── Content Children ───

  /** All TabLinkDirective children. */
  readonly tabLinks: Signal<readonly TabLinkDirective[]> = contentChildren(TabLinkDirective);

  // ─── View Children ───

  readonly scrollContainer: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('scrollContainer');

  // ─── State ───

  private readonly scrollLeftValue: WritableSignal<number> = signal(0);
  private readonly containerWidth: WritableSignal<number> = signal(0);
  private readonly scrollWidth: WritableSignal<number> = signal(0);
  protected readonly indicatorLeft: WritableSignal<number> = signal(0);
  protected readonly indicatorWidth: WritableSignal<number> = signal(0);

  private keyManager: FocusKeyManager<NavTabItem> | null = null;
  private resizeObserver: ResizeObserver | null = null;

  // ─── Computed ───

  /** The currently active link. */
  readonly activeLink: Signal<TabLinkDirective | undefined> = computed(() =>
    this.tabLinks().find(link => link.isActive())
  );

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
      this.setupKeyManager();
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.keyManager?.destroy();
    });
  }

  // ─── Public Methods ───

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
    }
  }

  // ─── Private Methods ───

  private setupResizeObserver(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (!container) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.updateScrollState();
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

  private setupKeyManager(): void {
    const items = this.createKeyManagerItems();
    this.keyManager = new FocusKeyManager(items)
      .withHorizontalOrientation('ltr')
      .withWrap()
      .skipPredicate(item => item.disabled);
  }

  private createKeyManagerItems(): NavTabItem[] {
    return this.tabLinks().map(link => ({
      focus: () => link.focus(),
      disabled: link.disabled(),
    }));
  }
}
