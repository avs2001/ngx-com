import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core';
import {
  calendarHeaderVariants,
  calendarHeaderButtonVariants,
} from './calendar-header.variants';

/**
 * Navigation header component for the calendar.
 * Provides prev/next buttons and a clickable period label for view switching.
 *
 * @example
 * ```html
 * <com-calendar-header
 *   [periodLabel]="'January 2024'"
 *   [periodAriaLabel]="'January 2024, click to switch view'"
 *   [prevDisabled]="false"
 *   [nextDisabled]="false"
 *   [canSwitchView]="true"
 *   (prevClicked)="onPrev()"
 *   (nextClicked)="onNext()"
 *   (periodClicked)="onPeriodClick()"
 * />
 * ```
 */
@Component({
  selector: 'com-calendar-header',
  template: `
    <div [class]="headerClasses()">
      <button
        type="button"
        [class]="navButtonClasses()"
        [disabled]="prevDisabled()"
        [attr.aria-label]="prevAriaLabel()"
        (click)="prevClicked.emit()"
      >
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        [class]="periodButtonClasses()"
        [attr.aria-label]="periodAriaLabel()"
        [disabled]="!canSwitchView()"
        (click)="onPeriodClick()"
      >
        {{ periodLabel() }}
      </button>

      <button
        type="button"
        [class]="navButtonClasses()"
        [disabled]="nextDisabled()"
        [attr.aria-label]="nextAriaLabel()"
        (click)="nextClicked.emit()"
      >
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d="M9 18l6-6-6-6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-calendar-header-host block',
  },
})
export class ComCalendarHeader {
  /** Display text (e.g., "January 2024", "2024", "2000 – 2023") */
  readonly periodLabel: InputSignal<string> = input.required<string>();

  /** Accessible label for period button */
  readonly periodAriaLabel: InputSignal<string> = input.required<string>();

  /** Accessible label for previous button */
  readonly prevAriaLabel: InputSignal<string> = input<string>('Previous');

  /** Accessible label for next button */
  readonly nextAriaLabel: InputSignal<string> = input<string>('Next');

  /** Disable previous button */
  readonly prevDisabled: InputSignal<boolean> = input<boolean>(false);

  /** Disable next button */
  readonly nextDisabled: InputSignal<boolean> = input<boolean>(false);

  /** Whether clicking period label switches view */
  readonly canSwitchView: InputSignal<boolean> = input<boolean>(true);

  /** Emitted when previous button is clicked */
  readonly prevClicked: OutputEmitterRef<void> = output<void>();

  /** Emitted when next button is clicked */
  readonly nextClicked: OutputEmitterRef<void> = output<void>();

  /** Emitted when period label is clicked (switch view) */
  readonly periodClicked: OutputEmitterRef<void> = output<void>();

  /** Computed header container classes */
  protected readonly headerClasses: Signal<string> = computed(() =>
    calendarHeaderVariants()
  );

  /** Computed navigation button classes */
  protected readonly navButtonClasses: Signal<string> = computed(() =>
    calendarHeaderButtonVariants({ type: 'navigation' })
  );

  /** Computed period button classes */
  protected readonly periodButtonClasses: Signal<string> = computed(() =>
    calendarHeaderButtonVariants({ type: 'period' })
  );

  /**
   * Handles period button click.
   * Only emits if view switching is allowed.
   */
  protected onPeriodClick(): void {
    if (this.canSwitchView()) {
      this.periodClicked.emit();
    }
  }
}
