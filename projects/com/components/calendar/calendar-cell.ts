import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { Signal, InputSignal, OutputEmitterRef, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  calendarCellVariants,
  calendarCellWrapperVariants,
} from './calendar-cell.variants';
import type { CalendarCellVariants } from './calendar-cell.variants';
import type { CalendarCell, CalendarCellState, CalendarView } from './calendar.types';

/** Event emitted when a navigation key is pressed */
export interface CalendarCellKeyNavEvent<D> {
  direction: string;
  cell: CalendarCell<D>;
}

/**
 * A single cell in the calendar grid.
 * This is a shared, stateless component used across all calendar views.
 *
 * @example
 * ```html
 * <com-calendar-cell
 *   [cell]="dayCell"
 *   [view]="'month'"
 *   (selected)="onSelect($event)"
 * />
 * ```
 */
@Component({
  selector: 'com-calendar-cell',
  template: `
    <div [class]="wrapperClasses()">
      <button
        #cellButton
        type="button"
        [class]="cellClasses()"
        [attr.aria-label]="cell().ariaLabel"
        [attr.aria-selected]="cell().isSelected || null"
        [attr.aria-disabled]="!cell().enabled || null"
        [attr.aria-current]="cell().isToday ? 'date' : null"
        [attr.tabindex]="tabindex()"
        [disabled]="!cell().enabled"
        (click)="onCellClick()"
        (keydown)="onKeydown($event)"
        (mouseenter)="onMouseEnter()"
        (focus)="onFocus()"
      >
        @if (cellTemplate()) {
          <ng-container
            [ngTemplateOutlet]="cellTemplate()!"
            [ngTemplateOutletContext]="{ $implicit: cell() }"
          />
        } @else {
          {{ cell().displayValue }}
        }
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'gridcell',
  },
})
export class ComCalendarCell<D> {
  /** Reference to the button element for focus management */
  private readonly buttonRef = viewChild<ElementRef<HTMLButtonElement>>('cellButton');

  /** The cell data to render */
  readonly cell: InputSignal<CalendarCell<D>> = input.required<CalendarCell<D>>();

  /** The current calendar view */
  readonly view: InputSignal<CalendarView> = input<CalendarView>('month');

  /** Whether this cell is outside the current month (for month view) */
  readonly outside: InputSignal<boolean> = input<boolean>(false);

  /** Tab index for keyboard navigation (-1 for not focusable, 0 for focusable) */
  readonly tabindex: InputSignal<number> = input<number>(-1);

  /** Custom template for cell content */
  readonly cellTemplate: InputSignal<TemplateRef<{ $implicit: CalendarCell<D> }> | null> = input<TemplateRef<{
    $implicit: CalendarCell<D>;
  }> | null>(null);

  /** Emitted when the cell is selected */
  readonly selected: OutputEmitterRef<CalendarCell<D>> = output<CalendarCell<D>>();

  /** Emitted when the cell is focused */
  readonly focused: OutputEmitterRef<CalendarCell<D>> = output<CalendarCell<D>>();

  /** Emitted when the mouse enters the cell (for range preview) */
  readonly previewed: OutputEmitterRef<CalendarCell<D>> = output<CalendarCell<D>>();

  /** Emitted when a navigation key is pressed */
  readonly keyNav: OutputEmitterRef<CalendarCellKeyNavEvent<D>> = output<CalendarCellKeyNavEvent<D>>();

  /** Computed cell state for styling */
  protected readonly cellState: Signal<CalendarCellState> = computed<CalendarCellState>(() => {
    const c = this.cell();

    if (!c.enabled) return 'disabled';
    if (c.isRangeStart) return 'range-start';
    if (c.isRangeEnd) return 'range-end';
    if (c.isRangeMiddle) return 'range-middle';
    if (c.isPreviewStart) return 'preview-start';
    if (c.isPreviewEnd) return 'preview-end';
    if (c.isPreviewMiddle) return 'preview-middle';
    if (c.isSelected) return 'selected';
    if (c.isToday) return 'today';
    return 'default';
  });

  /** Computed wrapper range state */
  protected readonly wrapperRange: Signal<'none' | 'start' | 'middle' | 'end' | 'single'> = computed(() => {
    const c = this.cell();
    if (c.isRangeStart && c.isRangeEnd) return 'single';
    if (c.isRangeStart) return 'start';
    if (c.isRangeEnd) return 'end';
    if (c.isRangeMiddle) return 'middle';
    return 'none';
  });

  /** Computed CSS classes for the cell button */
  protected readonly cellClasses: Signal<string> = computed(() => {
    const c = this.cell();
    const variants: CalendarCellVariants = {
      view: this.view(),
      state: this.cellState(),
      outside: this.outside(),
    };
    const baseClasses = calendarCellVariants(variants);
    return c.cssClasses ? `${baseClasses} ${c.cssClasses}` : baseClasses;
  });

  /** Computed CSS classes for the wrapper div */
  protected readonly wrapperClasses: Signal<string> = computed(() => {
    return calendarCellWrapperVariants({ range: this.wrapperRange() });
  });

  protected onCellClick(): void {
    const c = this.cell();
    if (c.enabled) {
      this.selected.emit(c);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const c = this.cell();
    const navKeys: Record<string, string> = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down',
      Home: 'home',
      End: 'end',
      PageUp: 'pageUp',
      PageDown: 'pageDown',
    };

    const direction = navKeys[event.key];
    if (direction) {
      event.preventDefault();
      this.keyNav.emit({ direction, cell: c });
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (c.enabled) {
        this.selected.emit(c);
      }
    }
  }

  protected onMouseEnter(): void {
    this.previewed.emit(this.cell());
  }

  protected onFocus(): void {
    this.focused.emit(this.cell());
  }

  /** Focuses the button element within this cell */
  focusButton(): void {
    this.buttonRef()?.nativeElement.focus();
  }
}
