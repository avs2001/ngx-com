import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  type InputSignal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { Option } from '@angular/aria/listbox';
import { optionVariants } from './select.variants';

/**
 * Option component for com-select.
 * Wraps the Angular Aria Option directive with styling.
 *
 * @example
 * ```html
 * <com-select-option [value]="item" [label]="item.name">
 *   {{ item.name }}
 * </com-select-option>
 * ```
 */
@Component({
  selector: 'com-select-option',
  template: `<ng-content />`,
  imports: [Option],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    '[class]': 'optionClasses()',
    '[class.hidden]': 'isHidden()',
  },
})
export class ComSelectOption<T> {
  /** The value of this option */
  readonly value: InputSignal<T> = input.required<T>();

  /** Display label for this option (used for ARIA) */
  readonly label: InputSignal<string> = input<string>('');

  /** Whether this option is disabled */
  readonly disabled: InputSignal<boolean> = input(false);

  /** Reference to the underlying Angular Aria Option */
  private readonly option = inject(Option<T>);

  /** Whether this option is hidden (filtered out by search) */
  private readonly _hidden: WritableSignal<boolean> = signal(false);

  /** Whether this option is hidden (for search filtering) */
  readonly isHidden: Signal<boolean> = this._hidden.asReadonly();

  /** Whether this option is currently active (keyboard focused) */
  readonly isActive: Signal<boolean> = computed(() => this.option.active() ?? false);

  /** Whether this option is currently selected */
  readonly isSelected: Signal<boolean> = computed(() => this.option.selected() ?? false);

  /** Computed option classes based on state */
  readonly optionClasses: Signal<string> = computed(() => {
    if (this.disabled()) {
      return optionVariants({ state: 'disabled' });
    }
    if (this.isSelected()) {
      return optionVariants({ state: 'selected' });
    }
    if (this.isActive()) {
      return optionVariants({ state: 'active' });
    }
    return optionVariants({ state: 'default' });
  });

  /** Set the hidden state (used by parent for search filtering) */
  setHidden(hidden: boolean): void {
    this._hidden.set(hidden);
  }
}
