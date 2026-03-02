import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import type {
  InputSignal,
  InputSignalWithTransform,
  ModelSignal,
  Signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { mergeClasses } from './segmented-control.utils';
import { ComSegmentDef, type SegmentTemplateContext } from './segment-def.directive';
import {
  segmentedControlContainerVariants,
  segmentedControlSegmentVariants,
  SEGMENT_DISABLED_CLASSES,
} from './segmented-control.variants';
import type {
  SegmentedControlSize,
  SegmentedControlColor,
  SegmentedControlVariant,
} from './segmented-control.variants';

/**
 * Represents a single option in the segmented control.
 */
export interface SegmentOption<T = unknown> {
  /** The value associated with this option. */
  value: T;
  /** Display label (also used as aria-label fallback for custom templates). */
  label: string;
  /** Whether this option is disabled. */
  disabled?: boolean | undefined;
}

/** Unique ID counter for generating segment IDs. */
let segmentIdCounter = 0;

/**
 * Segmented control component — a horizontal group of mutually exclusive options
 * where one is always selected. Think of it as a styled radio group in pill form.
 *
 * Supports two rendering modes:
 * - **Simple mode**: Plain text labels from the `label` property
 * - **Custom template mode**: Full control via `ng-template[comSegmentDef]`
 *
 * @tokens `--color-primary`, `--color-primary-foreground`,
 *         `--color-accent`, `--color-accent-foreground`,
 *         `--color-muted`, `--color-muted-foreground`, `--color-muted-hover`,
 *         `--color-background`, `--color-foreground`,
 *         `--color-disabled`, `--color-disabled-foreground`,
 *         `--color-border`, `--color-ring`
 *
 * @example Basic two-option toggle
 * ```html
 * <com-segmented-control
 *   [options]="[
 *     { value: 'admin', label: 'Admin' },
 *     { value: 'user', label: 'User' }
 *   ]"
 *   [(value)]="selectedRole"
 * />
 * ```
 *
 * @example Multiple options with variants
 * ```html
 * <com-segmented-control
 *   [options]="viewOptions"
 *   [(value)]="currentView"
 *   color="primary"
 *   size="sm"
 * />
 * ```
 *
 * @example Custom template with icons
 * ```html
 * <com-segmented-control [options]="viewOptions" [(value)]="currentView" color="primary">
 *   <ng-template comSegmentDef let-option let-active="active">
 *     <com-icon [name]="option.value === 'grid' ? 'grid' : 'list'" size="sm" />
 *     <span>{{ option.label }}</span>
 *   </ng-template>
 * </com-segmented-control>
 * ```
 *
 * @example Custom template with badges
 * ```html
 * <com-segmented-control [options]="statusOptions" [(value)]="statusFilter" color="accent">
 *   <ng-template comSegmentDef let-option let-active="active">
 *     <span>{{ option.label }}</span>
 *     <span
 *       class="ml-1.5 rounded-pill px-1.5 text-xs"
 *       [class]="active ? 'bg-accent-foreground/20 text-accent-foreground' : 'bg-muted text-muted-foreground'"
 *     >
 *       {{ option.value === 'open' ? openCount : closedCount }}
 *     </span>
 *   </ng-template>
 * </com-segmented-control>
 * ```
 *
 * @example Icon only (label used for accessibility)
 * ```html
 * <com-segmented-control
 *   [options]="[
 *     { value: 'left', label: 'Align left' },
 *     { value: 'center', label: 'Align center' },
 *     { value: 'right', label: 'Align right' }
 *   ]"
 *   [(value)]="alignment"
 *   size="sm"
 * >
 *   <ng-template comSegmentDef let-option>
 *     <com-icon [name]="'align-' + option.value" size="sm" />
 *   </ng-template>
 * </com-segmented-control>
 * ```
 *
 * @example Full width + outline variant
 * ```html
 * <com-segmented-control
 *   [options]="plans"
 *   [(value)]="selectedPlan"
 *   variant="outline"
 *   color="primary"
 *   [fullWidth]="true"
 * />
 * ```
 *
 * @example Disabled options
 * ```html
 * <com-segmented-control
 *   [options]="[
 *     { value: 'free', label: 'Free' },
 *     { value: 'pro', label: 'Pro' },
 *     { value: 'enterprise', label: 'Enterprise', disabled: true }
 *   ]"
 *   [(value)]="plan"
 *   color="primary"
 *   size="lg"
 * />
 * ```
 */
@Component({
  selector: 'com-segmented-control',
  exportAs: 'comSegmentedControl',
  template: `
    <div
      role="radiogroup"
      [attr.aria-label]="ariaLabel()"
      [class]="containerClasses()"
    >
      @for (option of options(); track option.value; let i = $index) {
        <button
          type="button"
          role="radio"
          [attr.aria-checked]="isActive(option)"
          [attr.aria-label]="customTemplate() ? option.label : null"
          [attr.aria-disabled]="option.disabled || null"
          [disabled]="option.disabled"
          [tabindex]="tabIndexFor(i)"
          [class]="segmentClasses(option)"
          (click)="select(option)"
          (keydown)="onKeydown($event, i)"
        >
          @if (customTemplate(); as tpl) {
            <ng-container
              [ngTemplateOutlet]="tpl.templateRef"
              [ngTemplateOutletContext]="getTemplateContext(option, i)"
            />
          } @else {
            {{ option.label }}
          }
        </button>
      }
    </div>
  `,
  styles: `
    com-segmented-control {
      display: inline-block;
    }
    com-segmented-control[fullWidth] {
      display: block;
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'com-segmented-control',
    '[attr.fullWidth]': 'fullWidth() || null',
  },
})
export class ComSegmentedControl<T = unknown> {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  /** Unique ID for this segmented control instance. */
  private readonly uniqueId: string = `com-segmented-control-${++segmentIdCounter}`;

  // ─── Inputs ───

  /** The list of options to display. */
  readonly options: InputSignal<SegmentOption<T>[]> = input.required<SegmentOption<T>[]>();

  /** Currently selected value. Two-way bindable with `[(value)]`. */
  readonly value: ModelSignal<T | undefined> = model<T | undefined>(undefined);

  /** Controls segment height, padding, and font size. */
  readonly size: InputSignal<SegmentedControlSize> = input<SegmentedControlSize>('md');

  /** Color scheme for the active segment. */
  readonly color: InputSignal<SegmentedControlColor> = input<SegmentedControlColor>('primary');

  /** Visual variant: filled (solid background) or outline (ring border). */
  readonly variant: InputSignal<SegmentedControlVariant> = input<SegmentedControlVariant>('filled');

  /** When true, segments stretch equally to fill available width. */
  readonly fullWidth: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Accessible label for the radiogroup container. */
  readonly ariaLabel: InputSignal<string | null> = input<string | null>(null, {
    alias: 'aria-label',
  });

  /** Custom CSS classes to merge with container classes. */
  readonly userClass: InputSignal<string> = input('', { alias: 'class' });

  // ─── Content Child ───

  /** Optional custom template for segment content. */
  readonly customTemplate: Signal<ComSegmentDef<T> | undefined> = contentChild<ComSegmentDef<T>>(ComSegmentDef);

  // ─── Computed ───

  /** Classes for the container/track element. */
  protected readonly containerClasses: Signal<string> = computed(() =>
    mergeClasses(
      segmentedControlContainerVariants({
        size: this.size(),
        fullWidth: this.fullWidth(),
      }),
      this.userClass()
    )
  );

  // ─── Public Methods ───

  /**
   * Checks if the given option is currently selected.
   */
  isActive(option: SegmentOption<T>): boolean {
    return this.value() === option.value;
  }

  /**
   * Selects the given option (if not disabled).
   */
  select(option: SegmentOption<T>): void {
    if (option.disabled) {
      return;
    }
    this.value.set(option.value);
  }

  /**
   * Returns the tabindex for a segment at the given index.
   * Implements roving tabindex: only the selected (or first focusable) segment has tabindex="0".
   */
  tabIndexFor(index: number): number {
    const opts = this.options();
    const currentValue = this.value();

    // If current value matches this option, it gets tabindex="0"
    if (opts[index]?.value === currentValue) {
      return 0;
    }

    // If no value is selected, first non-disabled option gets tabindex="0"
    if (currentValue === undefined) {
      const firstFocusableIndex = opts.findIndex((o) => !o.disabled);
      return index === firstFocusableIndex ? 0 : -1;
    }

    return -1;
  }

  /**
   * Returns computed classes for a segment button.
   */
  segmentClasses(option: SegmentOption<T>): string {
    const active = this.isActive(option);
    const baseClasses = segmentedControlSegmentVariants({
      size: this.size(),
      color: this.color(),
      variant: this.variant(),
      active,
      fullWidth: this.fullWidth(),
    });

    if (option.disabled) {
      return mergeClasses(baseClasses, SEGMENT_DISABLED_CLASSES);
    }

    return baseClasses;
  }

  /**
   * Builds the template context for custom templates.
   */
  getTemplateContext(option: SegmentOption<T>, index: number): SegmentTemplateContext<T> {
    return {
      $implicit: option,
      active: this.isActive(option),
      disabled: !!option.disabled,
      index,
    };
  }

  /**
   * Handles keyboard navigation for the segmented control.
   * Implements ARIA radiogroup keyboard patterns.
   */
  onKeydown(event: KeyboardEvent, currentIndex: number): void {
    const opts = this.options();
    let targetIndex: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        targetIndex = this.findNextFocusableIndex(currentIndex, 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        targetIndex = this.findNextFocusableIndex(currentIndex, -1);
        break;
      case 'Home':
        targetIndex = this.findFirstFocusableIndex();
        break;
      case 'End':
        targetIndex = this.findLastFocusableIndex();
        break;
      default:
        return;
    }

    if (targetIndex !== null && targetIndex !== currentIndex) {
      event.preventDefault();
      const targetOption = opts[targetIndex];
      if (targetOption) {
        this.select(targetOption);
        this.focusSegmentAt(targetIndex);
      }
    }
  }

  // ─── Private Methods ───

  /**
   * Finds the next focusable (non-disabled) option index in the given direction.
   * Wraps around to the beginning/end of the list.
   */
  private findNextFocusableIndex(currentIndex: number, direction: 1 | -1): number | null {
    const opts = this.options();
    const length = opts.length;

    if (length === 0) {
      return null;
    }

    let index = currentIndex;
    for (let i = 0; i < length; i++) {
      index = (index + direction + length) % length;
      if (!opts[index]?.disabled) {
        return index;
      }
    }

    return null;
  }

  /**
   * Finds the first focusable (non-disabled) option index.
   */
  private findFirstFocusableIndex(): number | null {
    const opts = this.options();
    const index = opts.findIndex((o) => !o.disabled);
    return index >= 0 ? index : null;
  }

  /**
   * Finds the last focusable (non-disabled) option index.
   */
  private findLastFocusableIndex(): number | null {
    const opts = this.options();
    for (let i = opts.length - 1; i >= 0; i--) {
      if (!opts[i]?.disabled) {
        return i;
      }
    }
    return null;
  }

  /**
   * Focuses the segment button at the given index.
   */
  private focusSegmentAt(index: number): void {
    const hostEl = this.elementRef.nativeElement;
    const buttons = hostEl.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
    const button = buttons[index];
    if (button) {
      button.focus();
    }
  }
}
