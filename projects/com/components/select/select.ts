import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  type ConnectedPosition,
} from '@angular/cdk/overlay';
import { SELECT_PARENT, type SelectParent } from './select.tokens';
import { selectTriggerVariants, selectPanelVariants } from './select.variants';
import {
  defaultCompareFn,
  type CompareFn,
  type RegisteredOption,
  type SelectSize,
  type SelectTriggerState,
  type SelectVariant,
} from './select.types';
import { ComSelectOption } from './select-option';

/**
 * Single-select dropdown component with full keyboard navigation and form integration.
 * Implements ControlValueAccessor for use with reactive forms and ngModel.
 *
 * @example
 * ```html
 * <!-- Reactive Forms -->
 * <form [formGroup]="form">
 *   <com-select formControlName="country" placeholder="Select a country">
 *     <com-select-option [value]="'us'">United States</com-select-option>
 *     <com-select-option [value]="'uk'">United Kingdom</com-select-option>
 *   </com-select>
 * </form>
 *
 * <!-- ngModel -->
 * <com-select [(ngModel)]="selectedCountry">
 *   <com-select-option [value]="'us'">United States</com-select-option>
 *   <com-select-option [value]="'uk'">United Kingdom</com-select-option>
 * </com-select>
 * ```
 */
@Component({
  selector: 'com-select',
  template: `
    <button
      #trigger
      type="button"
      cdkOverlayOrigin
      #overlayOrigin="cdkOverlayOrigin"
      role="combobox"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-controls]="panelId"
      [attr.aria-labelledby]="ariaLabelledby()"
      [attr.aria-describedby]="ariaDescribedby()"
      [attr.aria-disabled]="effectivelyDisabled() || null"
      [disabled]="effectivelyDisabled()"
      [class]="triggerClasses()"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
    >
      <span class="truncate" [class.text-surface-500]="!selectedLabel()" [class.dark:text-surface-400]="!selectedLabel()">
        {{ selectedLabel() || placeholder() }}
      </span>
      <svg
        class="h-4 w-4 shrink-0 text-surface-500 transition-transform duration-200 dark:text-surface-400"
        [class.rotate-180]="isOpen()"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="overlayOrigin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayWidth]="triggerWidth()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div
        #panel
        role="listbox"
        [attr.id]="panelId"
        [attr.aria-activedescendant]="activeDescendantId()"
        [class]="panelClasses()"
        (keydown)="onPanelKeydown($event)"
      >
        <div class="max-h-60 overflow-y-auto py-1">
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComSelect),
      multi: true,
    },
    {
      provide: SELECT_PARENT,
      useExisting: forwardRef(() => ComSelect),
    },
  ],
  host: {
    class: 'com-select-host',
  },
})
export class ComSelect<T = unknown> implements ControlValueAccessor, SelectParent<T> {
  /** Unique ID for the panel */
  private static nextPanelId = 0;
  readonly panelId: string = `com-select-panel-${ComSelect.nextPanelId++}`;

  /** Reference to the trigger button */
  private readonly triggerRef = viewChild<ElementRef<HTMLButtonElement>>('trigger');

  /** Reference to the panel element */
  private readonly panelRef = viewChild<ElementRef<HTMLDivElement>>('panel');

  /** Query all projected option components */
  private readonly optionComponents = contentChildren(ComSelectOption);

  /** Host element reference */
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // ─────────────────────────────────────────────────────────────────────────────
  // Inputs
  // ─────────────────────────────────────────────────────────────────────────────

  /** Placeholder text when no value is selected */
  readonly placeholder: InputSignal<string> = input<string>('Select...');

  /** Whether the select is disabled */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Size variant */
  readonly size: InputSignal<SelectSize> = input<SelectSize>('md');

  /** Visual variant */
  readonly variant: InputSignal<SelectVariant> = input<SelectVariant>('default');

  /** Custom comparison function for value matching */
  readonly compareWith: InputSignal<CompareFn<T>> = input<CompareFn<T>>(defaultCompareFn);

  /** ARIA labelledby attribute */
  readonly ariaLabelledby: InputSignal<string | null> = input<string | null>(null);

  /** ARIA describedby attribute */
  readonly ariaDescribedby: InputSignal<string | null> = input<string | null>(null);

  // ─────────────────────────────────────────────────────────────────────────────
  // Outputs
  // ─────────────────────────────────────────────────────────────────────────────

  /** Emitted when the selected value changes */
  readonly valueChange: OutputEmitterRef<T | null> = output<T | null>();

  /** Emitted when the panel opens */
  readonly opened: OutputEmitterRef<void> = output<void>();

  /** Emitted when the panel closes */
  readonly closed: OutputEmitterRef<void> = output<void>();

  // ─────────────────────────────────────────────────────────────────────────────
  // Internal State
  // ─────────────────────────────────────────────────────────────────────────────

  /** Whether the panel is open */
  readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);

  /** Currently selected value */
  readonly value: WritableSignal<T | null> = signal<T | null>(null);

  /** Active option index for keyboard navigation */
  readonly activeIndex: WritableSignal<number> = signal<number>(-1);

  /** Disabled state from CVA */
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  /** Registered options from child components */
  readonly registeredOptions: WritableSignal<RegisteredOption<T>[]> = signal<RegisteredOption<T>[]>(
    []
  );

  /** Width of the trigger for panel sizing */
  readonly triggerWidth: WritableSignal<number> = signal<number>(0);

  /** CVA callbacks */
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  // ─────────────────────────────────────────────────────────────────────────────
  // Overlay Positions
  // ─────────────────────────────────────────────────────────────────────────────

  /** Connected positions for the overlay (prefer below, fallback above) */
  readonly positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // Computed Values
  // ─────────────────────────────────────────────────────────────────────────────

  /** Computed: effectively disabled (input or CVA) */
  readonly effectivelyDisabled: Signal<boolean> = computed(
    () => this.disabled() || this.cvaDisabled()
  );

  /** Computed: trigger visual state */
  readonly triggerState: Signal<SelectTriggerState> = computed(() => {
    if (this.effectivelyDisabled()) return 'disabled';
    if (this.isOpen()) return 'focused';
    return 'default';
  });

  /** Computed: trigger CSS classes */
  readonly triggerClasses: Signal<string> = computed(() =>
    selectTriggerVariants({
      variant: this.variant(),
      state: this.triggerState(),
      size: this.size(),
    })
  );

  /** Computed: panel CSS classes */
  readonly panelClasses: Signal<string> = computed(() =>
    selectPanelVariants({
      size: this.size(),
    })
  );

  /** Computed: display label for selected value */
  readonly selectedLabel: Signal<string> = computed(() => {
    const currentValue = this.value();
    if (currentValue === null || currentValue === undefined) return '';

    const compareFn = this.compareWith();
    const option = this.registeredOptions().find(opt => compareFn(opt.value, currentValue));
    return option?.label ?? '';
  });

  /** Computed: aria-activedescendant ID */
  readonly activeDescendantId: Signal<string | null> = computed(() => {
    const idx = this.activeIndex();
    if (idx < 0) return null;
    const options = this.registeredOptions();
    return options[idx]?.id ?? null;
  });

  /** Computed: enabled (non-disabled) options for keyboard navigation */
  private readonly enabledOptions: Signal<RegisteredOption<T>[]> = computed(() =>
    this.registeredOptions().filter(opt => !opt.disabled)
  );

  constructor() {
    // Sync active index when panel opens to match selected value
    effect(() => {
      if (this.isOpen()) {
        this.updateTriggerWidth();
        this.syncActiveIndexToValue();
        // Focus the panel after it opens
        setTimeout(() => this.panelRef()?.nativeElement.focus(), 0);
      }
    }, { allowSignalWrites: true });

    // Update registered options when option components change
    effect(() => {
      const components = this.optionComponents();
      const options = components.map(c => ({
        id: c.id,
        value: c.value(),
        label: c.getLabel(),
        disabled: c.disabled(),
      }));
      this.registeredOptions.set(options);
    }, { allowSignalWrites: true });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SelectParent Interface
  // ─────────────────────────────────────────────────────────────────────────────

  registerOption(option: RegisteredOption<T>): void {
    // Options are registered via contentChildren effect
  }

  unregisterOption(id: string): void {
    // Options are unregistered via contentChildren effect
  }

  selectOption(value: T): void {
    if (this.effectivelyDisabled()) return;

    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
    this.close();
  }

  setActiveIndex(index: number): void {
    const options = this.registeredOptions();
    const option = options[index];
    if (index >= 0 && index < options.length && option && !option.disabled) {
      this.activeIndex.set(index);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ControlValueAccessor Interface
  // ─────────────────────────────────────────────────────────────────────────────

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Public Methods
  // ─────────────────────────────────────────────────────────────────────────────

  /** Toggle the panel open/closed */
  toggle(): void {
    if (this.effectivelyDisabled()) return;
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Open the panel */
  open(): void {
    if (this.effectivelyDisabled() || this.isOpen()) return;
    this.isOpen.set(true);
    this.opened.emit();
  }

  /** Close the panel */
  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.activeIndex.set(-1);
    this.onTouched();
    this.closed.emit();
    // Return focus to trigger
    this.triggerRef()?.nativeElement.focus();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Keyboard Handling
  // ─────────────────────────────────────────────────────────────────────────────

  /** Handle keydown on the trigger button */
  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.effectivelyDisabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  /** Handle keydown on the panel */
  onPanelKeydown(event: KeyboardEvent): void {
    const options = this.registeredOptions();
    const enabledOpts = this.enabledOptions();
    const currentIdx = this.activeIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateToNext();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.navigateToPrevious();
        break;

      case 'Home':
        event.preventDefault();
        this.navigateToFirst();
        break;

      case 'End':
        event.preventDefault();
        this.navigateToLast();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentIdx >= 0 && currentIdx < options.length) {
          const option = options[currentIdx];
          if (option && !option.disabled) {
            this.selectOption(option.value);
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.close();
        break;

      case 'Tab':
        // Allow tab to close and move focus
        this.close();
        break;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Private Methods
  // ─────────────────────────────────────────────────────────────────────────────

  /** Update trigger width for panel sizing */
  private updateTriggerWidth(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (trigger) {
      this.triggerWidth.set(trigger.offsetWidth);
    }
  }

  /** Sync active index to currently selected value */
  private syncActiveIndexToValue(): void {
    const currentValue = this.value();
    if (currentValue === null || currentValue === undefined) {
      // No selection, start at first enabled option
      this.navigateToFirst();
      return;
    }

    const compareFn = this.compareWith();
    const options = this.registeredOptions();
    const idx = options.findIndex(opt => compareFn(opt.value, currentValue));
    if (idx >= 0) {
      this.activeIndex.set(idx);
    } else {
      this.navigateToFirst();
    }
  }

  /** Navigate to the next enabled option */
  private navigateToNext(): void {
    const options = this.registeredOptions();
    const currentIdx = this.activeIndex();
    let nextIdx = currentIdx + 1;

    while (nextIdx < options.length) {
      const opt = options[nextIdx];
      if (opt && !opt.disabled) {
        this.activeIndex.set(nextIdx);
        this.scrollOptionIntoView(nextIdx);
        return;
      }
      nextIdx++;
    }
  }

  /** Navigate to the previous enabled option */
  private navigateToPrevious(): void {
    const options = this.registeredOptions();
    const currentIdx = this.activeIndex();
    let prevIdx = currentIdx - 1;

    while (prevIdx >= 0) {
      const opt = options[prevIdx];
      if (opt && !opt.disabled) {
        this.activeIndex.set(prevIdx);
        this.scrollOptionIntoView(prevIdx);
        return;
      }
      prevIdx--;
    }
  }

  /** Navigate to the first enabled option */
  private navigateToFirst(): void {
    const options = this.registeredOptions();
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt && !opt.disabled) {
        this.activeIndex.set(i);
        this.scrollOptionIntoView(i);
        return;
      }
    }
  }

  /** Navigate to the last enabled option */
  private navigateToLast(): void {
    const options = this.registeredOptions();
    for (let i = options.length - 1; i >= 0; i--) {
      const opt = options[i];
      if (opt && !opt.disabled) {
        this.activeIndex.set(i);
        this.scrollOptionIntoView(i);
        return;
      }
    }
  }

  /** Scroll an option into view in the panel */
  private scrollOptionIntoView(index: number): void {
    const options = this.registeredOptions();
    if (index < 0 || index >= options.length) return;

    const option = options[index];
    if (!option) return;

    const optionId = option.id;
    const panel = this.panelRef()?.nativeElement;
    if (!panel) return;

    const optionElement = panel.querySelector(`#${optionId}`);
    if (optionElement) {
      optionElement.scrollIntoView({ block: 'nearest' });
    }
  }
}
