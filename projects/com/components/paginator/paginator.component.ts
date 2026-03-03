import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChildren,
  ViewEncapsulation,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { ComIcon } from 'ngx-com/components/icon';
import { defaultRangeLabel, type PageEvent, type RangeLabelFn } from './paginator.models';
import {
  paginatorContainerVariants,
  paginatorButtonVariants,
  paginatorRangeLabelVariants,
  paginatorSelectVariants,
  paginatorPageButtonVariants,
  paginatorEllipsisVariants,
  type PaginatorSize,
  type PaginatorLayout,
} from './paginator.variants';

/** Represents a page number or ellipsis marker in the page range. */
export type PageRangeItem = number | 'ellipsis';

/**
 * Paginator component — provides navigation for paginated content.
 *
 * Displays navigation controls, optional page size selector, and range label
 * showing current position within the data set. Supports numbered page buttons
 * when `showPageNumbers` is enabled.
 *
 * @tokens `--color-foreground`, `--color-muted-foreground`,
 *         `--color-border`, `--color-muted`,
 *         `--color-disabled`, `--color-disabled-foreground`,
 *         `--color-ring`, `--color-primary`, `--color-primary-foreground`
 *
 * @example Basic usage
 * ```html
 * <com-paginator
 *   [length]="100"
 *   [pageSize]="10"
 *   [pageIndex]="0"
 *   (page)="onPageChange($event)"
 * />
 * ```
 *
 * @example With page size options
 * ```html
 * <com-paginator
 *   [length]="100"
 *   [pageSize]="10"
 *   [pageIndex]="0"
 *   [pageSizeOptions]="[5, 10, 25, 50]"
 *   (page)="onPageChange($event)"
 * />
 * ```
 *
 * @example With first/last buttons
 * ```html
 * <com-paginator
 *   [length]="100"
 *   [pageSize]="10"
 *   [pageIndex]="0"
 *   [showFirstLastButtons]="true"
 *   (page)="onPageChange($event)"
 * />
 * ```
 *
 * @example With numbered page buttons
 * ```html
 * <com-paginator
 *   [length]="97"
 *   [pageSize]="10"
 *   [showPageNumbers]="true"
 *   (page)="onPageChange($event)"
 * />
 * ```
 *
 * @example Spread layout (summary left, controls right)
 * ```html
 * <com-paginator
 *   [length]="97"
 *   [pageSize]="10"
 *   [showPageNumbers]="true"
 *   layout="spread"
 *   (page)="onPageChange($event)"
 * />
 * ```
 *
 * @example Small size
 * ```html
 * <com-paginator
 *   [length]="50"
 *   [pageSize]="10"
 *   size="sm"
 *   (page)="onPageChange($event)"
 * />
 * ```
 *
 * @example Custom range label (i18n)
 * ```html
 * <com-paginator
 *   [length]="100"
 *   [pageSize]="10"
 *   [rangeLabel]="customLabel"
 *   (page)="onPageChange($event)"
 * />
 * ```
 * ```ts
 * customLabel = (page, pageSize, length) => `Seite ${page + 1} von ${Math.ceil(length / pageSize)}`;
 * ```
 */
@Component({
  selector: 'com-paginator',
  exportAs: 'comPaginator',
  template: `
    <nav
      role="navigation"
      [attr.aria-label]="ariaLabel()"
      [class]="containerClasses()"
    >
      @if (showPageNumbers()) {
        <!-- Spread Layout: Summary on left -->
        @if (layout() === 'spread') {
          <span [class]="rangeLabelClasses()">
            {{ rangeLabelText() }}
          </span>
        }

        <!-- Navigation Controls -->
        <div
          class="flex items-center gap-1"
          role="group"
          aria-label="Page navigation"
          (keydown)="onPageButtonsKeydown($event)"
        >
          <!-- Previous Page -->
          <button
            type="button"
            [class]="buttonClasses()"
            [disabled]="disabled() || !hasPreviousPage()"
            aria-label="Previous page"
            (click)="previousPage()"
          >
            <com-icon name="chevron-left" [size]="iconSize()" />
          </button>

          <!-- Page Numbers -->
          @for (item of pageRange(); track trackPageItem($index, item)) {
            @if (item === 'ellipsis') {
              <span
                [class]="ellipsisClasses()"
                aria-hidden="true"
              >…</span>
            } @else {
              <button
                #pageBtn
                type="button"
                [class]="item === pageIndex() ? activePageButtonClasses() : inactivePageButtonClasses()"
                [disabled]="disabled()"
                [attr.aria-label]="'Page ' + (item + 1)"
                [attr.aria-current]="item === pageIndex() ? 'page' : null"
                [tabindex]="item === pageIndex() ? 0 : -1"
                (click)="goToPage(item)"
              >{{ item + 1 }}</button>
            }
          }

          <!-- Next Page -->
          <button
            type="button"
            [class]="buttonClasses()"
            [disabled]="disabled() || !hasNextPage()"
            aria-label="Next page"
            (click)="nextPage()"
          >
            <com-icon name="chevron-right" [size]="iconSize()" />
          </button>
        </div>

        <!-- Compact Layout: Summary on right -->
        @if (layout() === 'compact') {
          <span [class]="rangeLabelClasses()">
            {{ rangeLabelText() }}
          </span>
        }
      } @else {
        <!-- Original Layout (no page numbers) -->

        <!-- Page Size Selector -->
        @if (!hidePageSize() && pageSizeOptions().length > 0) {
          <div class="flex items-center gap-2">
            <label
              [id]="pageSizeLabelId()"
              class="text-muted-foreground"
              [class.text-xs]="size() === 'sm'"
              [class.text-sm]="size() === 'md'"
            >
              Items per page:
            </label>
            <div class="relative">
              <select
                [attr.aria-labelledby]="pageSizeLabelId()"
                [class]="selectClasses()"
                [disabled]="disabled()"
                [value]="pageSize()"
                (change)="onPageSizeChange($event)"
              >
                @for (option of pageSizeOptions(); track option) {
                  <option [value]="option">{{ option }}</option>
                }
              </select>
              <com-icon
                name="chevron-down"
                size="xs"
                class="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>
        }

        <!-- Range Label -->
        <span [class]="rangeLabelClasses()">
          {{ rangeLabelText() }}
        </span>

        <!-- Navigation Buttons -->
        <div class="flex items-center gap-1">
          <!-- First Page -->
          @if (showFirstLastButtons()) {
            <button
              type="button"
              [class]="buttonClasses()"
              [disabled]="disabled() || !hasPreviousPage()"
              aria-label="First page"
              (click)="firstPage()"
            >
              <com-icon name="chevrons-left" [size]="iconSize()" />
            </button>
          }

          <!-- Previous Page -->
          <button
            type="button"
            [class]="buttonClasses()"
            [disabled]="disabled() || !hasPreviousPage()"
            aria-label="Previous page"
            (click)="previousPage()"
          >
            <com-icon name="chevron-left" [size]="iconSize()" />
          </button>

          <!-- Next Page -->
          <button
            type="button"
            [class]="buttonClasses()"
            [disabled]="disabled() || !hasNextPage()"
            aria-label="Next page"
            (click)="nextPage()"
          >
            <com-icon name="chevron-right" [size]="iconSize()" />
          </button>

          <!-- Last Page -->
          @if (showFirstLastButtons()) {
            <button
              type="button"
              [class]="buttonClasses()"
              [disabled]="disabled() || !hasNextPage()"
              aria-label="Last page"
              (click)="lastPage()"
            >
              <com-icon name="chevrons-right" [size]="iconSize()" />
            </button>
          }
        </div>
      }
    </nav>
  `,
  styles: `
    com-paginator {
      display: block;
    }
  `,
  imports: [ComIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'com-paginator',
  },
})
export class ComPaginator {
  // ─── View Queries ───

  /** Page number buttons for keyboard navigation. */
  private readonly pageButtons = viewChildren<ElementRef<HTMLButtonElement>>('pageBtn');

  // ─── Inputs ───

  /** Total number of items being paged. */
  readonly length: InputSignal<number> = input<number>(0);

  /** Number of items to display per page. */
  readonly pageSize: InputSignal<number> = input<number>(10);

  /** Current zero-based page index. */
  readonly pageIndex: InputSignal<number> = input<number>(0);

  /** Available page size options. Hides selector if empty. */
  readonly pageSizeOptions: InputSignal<number[]> = input<number[]>([]);

  /** Whether to show first/last navigation buttons. */
  readonly showFirstLastButtons: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Whether to show numbered page buttons. */
  readonly showPageNumbers: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Whether all controls are disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Whether to hide the page size selector. */
  readonly hidePageSize: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Size variant. */
  readonly size: InputSignal<PaginatorSize> = input<PaginatorSize>('md');

  /** Layout variant. Only applies when showPageNumbers is true. */
  readonly layout: InputSignal<PaginatorLayout> = input<PaginatorLayout>('compact');

  /** Number of pages to show on each side of the current page. */
  readonly siblingCount: InputSignal<number> = input<number>(1);

  /** Number of pages to always show at the start and end. */
  readonly boundaryCount: InputSignal<number> = input<number>(1);

  /** Accessible label for the nav element. */
  readonly ariaLabel: InputSignal<string> = input<string>('Pagination', { alias: 'aria-label' });

  /** Custom function for range label formatting. */
  readonly rangeLabel: InputSignal<RangeLabelFn> = input<RangeLabelFn>(defaultRangeLabel);

  // ─── Outputs ───

  /** Emits when page index or page size changes. */
  readonly page: OutputEmitterRef<PageEvent> = output<PageEvent>();

  // ─── Computed ───

  /** Total number of pages. */
  protected readonly numberOfPages: Signal<number> = computed(() => {
    const size = this.pageSize();
    const len = this.length();
    if (size === 0 || len === 0) {
      return 0;
    }
    return Math.ceil(len / size);
  });

  /** Whether there is a previous page. */
  protected readonly hasPreviousPage: Signal<boolean> = computed(() => {
    return this.pageIndex() > 0 && this.pageSize() > 0;
  });

  /** Whether there is a next page. */
  protected readonly hasNextPage: Signal<boolean> = computed(() => {
    const total = this.numberOfPages();
    return total > 0 && this.pageIndex() < total - 1;
  });

  /** The formatted range label text. */
  protected readonly rangeLabelText: Signal<string> = computed(() => {
    const fn = this.rangeLabel();
    return fn(this.pageIndex(), this.pageSize(), this.length());
  });

  /** Icon size based on component size. */
  protected readonly iconSize: Signal<'xs' | 'sm'> = computed(() => {
    return this.size() === 'sm' ? 'xs' : 'sm';
  });

  /** Unique ID for page size label. */
  protected readonly pageSizeLabelId: Signal<string> = computed(() => {
    return `com-paginator-page-size-label-${uniqueId++}`;
  });

  /** Classes for the container. */
  protected readonly containerClasses: Signal<string> = computed(() =>
    paginatorContainerVariants({
      size: this.size(),
      layout: this.showPageNumbers() ? this.layout() : 'compact',
    })
  );

  /** Classes for navigation buttons. */
  protected readonly buttonClasses: Signal<string> = computed(() =>
    paginatorButtonVariants({ size: this.size() })
  );

  /** Classes for the range label. */
  protected readonly rangeLabelClasses: Signal<string> = computed(() =>
    paginatorRangeLabelVariants({ size: this.size() })
  );

  /** Classes for the page size select. */
  protected readonly selectClasses: Signal<string> = computed(() =>
    paginatorSelectVariants({ size: this.size() })
  );

  /** Classes for the ellipsis indicator. */
  protected readonly ellipsisClasses: Signal<string> = computed(() =>
    paginatorEllipsisVariants({ size: this.size() })
  );

  /** Cached classes for active page button. */
  protected readonly activePageButtonClasses: Signal<string> = computed(() =>
    paginatorPageButtonVariants({ size: this.size(), active: true })
  );

  /** Cached classes for inactive page button. */
  protected readonly inactivePageButtonClasses: Signal<string> = computed(() =>
    paginatorPageButtonVariants({ size: this.size(), active: false })
  );

  /**
   * Computed page range for numbered pagination.
   * Returns array like [0, 'ellipsis', 3, 4, 5, 'ellipsis', 9] (zero-indexed).
   */
  protected readonly pageRange: Signal<PageRangeItem[]> = computed(() => {
    const totalPages = this.numberOfPages();
    const current = this.pageIndex();
    const siblings = this.siblingCount();
    const boundaries = this.boundaryCount();

    if (totalPages === 0) return [];

    // If all pages fit without ellipses, show them all
    const totalSlots = 2 * boundaries + 2 * siblings + 3;
    if (totalPages <= totalSlots) {
      return this.range(0, totalPages - 1);
    }

    // Collect all page indices that should be visible (Set auto-deduplicates)
    const pages = new Set<number>();

    // Boundary pages (always visible)
    for (let i = 0; i < boundaries; i++) pages.add(i);
    for (let i = totalPages - boundaries; i < totalPages; i++) pages.add(i);

    // Sibling pages around current (including current)
    const siblingStart = Math.max(0, current - siblings);
    const siblingEnd = Math.min(totalPages - 1, current + siblings);
    for (let i = siblingStart; i <= siblingEnd; i++) pages.add(i);

    // Convert to sorted array and insert ellipses at gaps
    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result: PageRangeItem[] = [];

    for (let i = 0; i < sorted.length; i++) {
      const page = sorted[i]!;
      const prevPage = sorted[i - 1];
      if (prevPage !== undefined && page - prevPage > 1) {
        result.push('ellipsis');
      }
      result.push(page);
    }

    return result;
  });

  // ─── Navigation Methods ───

  /** Navigate to the first page. */
  firstPage(): void {
    if (this.hasPreviousPage()) {
      this.emitPageEvent(0);
    }
  }

  /** Navigate to the previous page. */
  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.emitPageEvent(this.pageIndex() - 1);
    }
  }

  /** Navigate to the next page. */
  nextPage(): void {
    if (this.hasNextPage()) {
      this.emitPageEvent(this.pageIndex() + 1);
    }
  }

  /** Navigate to the last page. */
  lastPage(): void {
    if (this.hasNextPage()) {
      this.emitPageEvent(this.numberOfPages() - 1);
    }
  }

  /** Navigate to a specific page by index (zero-based). */
  goToPage(pageIndex: number): void {
    if (pageIndex >= 0 && pageIndex < this.numberOfPages() && pageIndex !== this.pageIndex()) {
      this.emitPageEvent(pageIndex);
    }
  }

  /** Handle page size selection change. */
  protected onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newPageSize = Number(select.value);
    const previousPageSize = this.pageSize();
    const currentPageIndex = this.pageIndex();

    // Calculate new page index to keep the first item on the current page visible
    const startIndex = currentPageIndex * previousPageSize;
    const newPageIndex = Math.floor(startIndex / newPageSize);

    this.page.emit({
      pageIndex: newPageIndex,
      previousPageIndex: currentPageIndex,
      pageSize: newPageSize,
      length: this.length(),
    });
  }

  /** Handle keyboard navigation within page buttons (roving tabindex). */
  protected onPageButtonsKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLButtonElement;

    // Get enabled buttons from viewChildren query
    const buttons = this.pageButtons()
      .map((ref) => ref.nativeElement)
      .filter((btn) => !btn.disabled);

    const currentIndex = buttons.indexOf(target);
    if (currentIndex === -1) return;

    let newIndex: number;
    switch (event.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = buttons.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    buttons[newIndex]?.focus();
  }

  /** Track function for page items. */
  protected trackPageItem(index: number, item: PageRangeItem): string {
    return item === 'ellipsis' ? `ellipsis-${index}` : `page-${item}`;
  }

  // ─── Private Methods ───

  private emitPageEvent(newPageIndex: number): void {
    this.page.emit({
      pageIndex: newPageIndex,
      previousPageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
      length: this.length(),
    });
  }

  /** Generate a range of numbers from start to end (inclusive). */
  private range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}

/** Counter for generating unique IDs. */
let uniqueId = 0;
