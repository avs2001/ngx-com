import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  type InputSignal,
  type OnDestroy,
  type OnInit,
  type Signal,
} from '@angular/core';
import { SELECT_PARENT, type SelectParent } from './select.tokens';
import { selectOptionVariants } from './select.variants';
import type { SelectOptionState, SelectSize } from './select.types';

/** Counter for generating unique option IDs */
let nextId = 0;

/**
 * Individual option within a ComSelect component.
 * Registers itself with the parent select and handles selection state.
 *
 * @example
 * ```html
 * <com-select formControlName="country">
 *   <com-select-option [value]="'us'">United States</com-select-option>
 *   <com-select-option [value]="'uk'">United Kingdom</com-select-option>
 *   <com-select-option [value]="'ca'" [disabled]="true">Canada (Coming Soon)</com-select-option>
 * </com-select>
 * ```
 */
@Component({
  selector: 'com-select-option',
  template: `
    <ng-content />
    @if (isSelected()) {
      <svg
        class="ml-auto h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'option',
    '[attr.id]': 'id',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'effectivelyDisabled() || null',
    '[attr.data-active]': 'isActive() || null',
    '[attr.data-selected]': 'isSelected() || null',
    '[attr.data-disabled]': 'effectivelyDisabled() || null',
    '[class]': 'optionClasses()',
    '(click)': 'onSelect()',
    '(mouseenter)': 'onMouseEnter()',
  },
})
export class ComSelectOption<T = unknown> implements OnInit, OnDestroy {
  /** Unique identifier for this option */
  readonly id: string = `com-select-option-${nextId++}`;

  /** Reference to the host element */
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /** Parent select component via injection token */
  private readonly parent = inject(SELECT_PARENT, { optional: true }) as SelectParent<T> | null;

  /** The value associated with this option */
  readonly value: InputSignal<T> = input.required<T>();

  /** Whether this option is disabled */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Computed: whether this option is effectively disabled (own or parent) */
  readonly effectivelyDisabled: Signal<boolean> = computed(() => {
    if (this.disabled()) return true;
    return this.parent?.disabled() ?? false;
  });

  /** Computed: whether this option is currently selected */
  readonly isSelected: Signal<boolean> = computed(() => {
    if (!this.parent) return false;
    const selectedValue = this.parent.value();
    if (selectedValue === null || selectedValue === undefined) return false;
    return this.parent.compareWith()(this.value(), selectedValue);
  });

  /** Computed: whether this option is currently active (keyboard navigation) */
  readonly isActive: Signal<boolean> = computed(() => {
    if (!this.parent) return false;
    const activeIdx = this.parent.activeIndex();
    return activeIdx === this.getIndex();
  });

  /** Computed: the current size from parent */
  readonly size: Signal<SelectSize> = computed(() => this.parent?.size() ?? 'md');

  /** Computed: the visual state for styling */
  readonly optionState: Signal<SelectOptionState> = computed(() => {
    if (this.effectivelyDisabled()) return 'disabled';
    if (this.isSelected()) return 'selected';
    if (this.isActive()) return 'active';
    return 'default';
  });

  /** Computed: CSS classes for this option */
  readonly optionClasses: Signal<string> = computed(() =>
    selectOptionVariants({
      state: this.optionState(),
      size: this.size(),
    })
  );

  ngOnInit(): void {
    if (!this.parent) {
      console.warn('ComSelectOption must be used within a ComSelect component');
      return;
    }

    this.parent.registerOption({
      id: this.id,
      value: this.value(),
      label: this.getLabel(),
      disabled: this.disabled(),
    });
  }

  ngOnDestroy(): void {
    this.parent?.unregisterOption(this.id);
  }

  /** Handle click on this option */
  onSelect(): void {
    if (this.effectivelyDisabled() || !this.parent) return;
    this.parent.selectOption(this.value());
  }

  /** Handle mouse enter for active state */
  onMouseEnter(): void {
    if (this.effectivelyDisabled() || !this.parent) return;
    const index = this.getIndex();
    if (index >= 0) {
      this.parent.setActiveIndex(index);
    }
  }

  /** Get the text content of this option for display */
  getLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  /** Get the index of this option in the parent's registered options */
  private getIndex(): number {
    // The parent will need to track this - return -1 if not found
    // This is resolved by the parent component tracking option order
    return -1;
  }
}
