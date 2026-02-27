import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  output,
  Renderer2,
  signal,
  viewChild,
  type ElementRef,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Combobox, ComboboxInput, ComboboxDialog, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { triggerVariants, dialogVariants } from './select.variants';
import { ComSelectOption } from './select-option';
import type { ComSelectSize, CompareFn, DisplayFn, SearchPredicateFn } from './select.types';
import { DEFAULT_SEARCH_DEBOUNCE } from './select.types';

/** Default search predicate - case-insensitive label match */
const defaultSearchPredicate = <T>(_option: T, query: string, label: string): boolean =>
  label.toLowerCase().includes(query.toLowerCase());

/**
 * Single-select component using Angular Aria dialog popup pattern.
 * Implements ControlValueAccessor for forms integration.
 *
 * @example
 * ```html
 * <com-select formControlName="country" placeholder="Select country">
 *   <com-select-option *ngFor="let c of countries" [value]="c" [label]="c.name">
 *     {{ c.name }}
 *   </com-select-option>
 * </com-select>
 * ```
 *
 * @example Searchable select
 * ```html
 * <com-select [searchable]="true" placeholder="Search countries...">
 *   <com-select-option *ngFor="let c of countries" [value]="c" [label]="c.name">
 *     {{ c.name }}
 *   </com-select-option>
 * </com-select>
 * ```
 */
@Component({
  selector: 'com-select',
  template: `
    <div
      ngCombobox
      readonly
      #outerCombobox="ngCombobox"
      [class]="triggerClasses()"
      (click)="onTriggerClick()"
    >
      <!-- Trigger content -->
      <span class="flex-1 truncate" [class.text-surface-400]="!hasValue()">
        {{ displayValue() }}
      </span>

      <!-- Hidden input for ARIA -->
      <input
        ngComboboxInput
        class="sr-only"
        [attr.aria-label]="placeholder()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        readonly
      />

      <!-- Clear button -->
      @if (clearable() && hasValue() && !disabled()) {
        <button
          type="button"
          class="flex items-center justify-center w-5 h-5 rounded-full text-surface-400 hover:text-surface-600 hover:bg-surface-200 transition-colors"
          aria-label="Clear selection"
          (click)="onClear($event)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      }

      <!-- Arrow icon -->
      <span
        class="flex items-center justify-center text-surface-400 transition-transform"
        [class.rotate-180]="isOpen()"
        aria-hidden="true"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>

      <!-- Dialog popup container -->
      <ng-template ngComboboxPopupContainer>
        <dialog
          ngComboboxDialog
          #dialogRef
          [class]="dialogClasses()"
          [class.hidden]="!isOpen()"
        >
          <!-- Inner combobox for options -->
          <div
            ngCombobox
            filterMode="manual"
            alwaysExpanded
            #innerCombobox="ngCombobox"
          >
            <!-- Search input (visible when searchable) -->
            @if (searchable()) {
              <div class="flex items-center gap-2 px-3 py-2 border-b border-surface-200 bg-surface-50">
                <svg class="w-4 h-4 text-surface-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ngComboboxInput
                  #searchInputRef
                  type="text"
                  class="flex-1 bg-transparent text-surface-900 placeholder-surface-400 outline-none text-sm"
                  [placeholder]="searchPlaceholder()"
                  [value]="searchQuery()"
                  (input)="onSearchInput($event)"
                />
                @if (searchQuery()) {
                  <button
                    type="button"
                    class="flex items-center justify-center w-4 h-4 rounded-full text-surface-400 hover:text-surface-600 transition-colors"
                    aria-label="Clear search"
                    (click)="clearSearch()"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                }
              </div>
            } @else {
              <!-- Hidden input for inner combobox ARIA when not searchable -->
              <input ngComboboxInput class="sr-only" readonly />
            }

            <!-- Loading state -->
            @if (loading()) {
              <div class="flex items-center justify-center py-8 text-surface-400">
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="ml-2 text-sm">Loading...</span>
              </div>
            } @else if (showNoResults()) {
              <!-- No results state -->
              <div class="flex items-center justify-center py-8 text-surface-400">
                <span class="text-sm">No results found</span>
              </div>
            } @else {
              <!-- Listbox with options -->
              <div
                ngListbox
                #listboxRef
                class="overflow-y-auto"
                [style.max-height]="maxListboxHeight()"
              >
                <ng-content select="com-select-option" />
              </div>
            }
          </div>
        </dialog>
      </ng-template>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    dialog {
      position: absolute;
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
    }
    dialog::backdrop {
      background: transparent;
    }
    .hidden {
      display: none !important;
    }
  `,
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxDialog,
    ComboboxPopupContainer,
    Listbox,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComSelect),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-select',
  },
})
export class ComSelect<T> implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);

  // View queries
  private readonly outerCombobox = viewChild<Combobox<T>>('outerCombobox');
  private readonly listbox = viewChild<Listbox<T>>('listboxRef');
  private readonly dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');
  private readonly searchInputElement = viewChild<ElementRef<HTMLInputElement>>('searchInputRef');
  private readonly options = contentChildren(ComSelectOption<T>);

  // Inputs
  /** Current selected value */
  readonly value: InputSignal<T | null> = input<T | null>(null);

  /** Placeholder text when no value is selected */
  readonly placeholder: InputSignal<string> = input('');

  /** Whether the select is disabled */
  readonly disabled: InputSignal<boolean> = input(false);

  /** Whether the select is required */
  readonly required: InputSignal<boolean> = input(false);

  /** Custom comparison function for values */
  readonly compareWith: InputSignal<CompareFn<T>> = input<CompareFn<T>>((a, b) => a === b);

  /** Custom display function for the selected value */
  readonly displayWith: InputSignal<DisplayFn<T> | null> = input<DisplayFn<T> | null>(null);

  /** Whether to show the clear button */
  readonly clearable: InputSignal<boolean> = input(false);

  /** Size variant */
  readonly size: InputSignal<ComSelectSize> = input<ComSelectSize>('md');

  /** Additional CSS class for the dialog panel */
  readonly panelClass: InputSignal<string> = input('');

  /** Whether to show a search input in the dialog */
  readonly searchable: InputSignal<boolean> = input(false);

  /** Placeholder text for the search input */
  readonly searchPlaceholder: InputSignal<string> = input('Search...');

  /** Custom search predicate for local filtering */
  readonly searchPredicate: InputSignal<SearchPredicateFn<T>> = input<SearchPredicateFn<T>>(
    defaultSearchPredicate
  );

  /** Whether the select is in loading state */
  readonly loading: InputSignal<boolean> = input(false);

  /** Debounce time for search output in milliseconds */
  readonly searchDebounce: InputSignal<number> = input(DEFAULT_SEARCH_DEBOUNCE);

  // Outputs
  /** Emits when the value changes */
  readonly valueChange: OutputEmitterRef<T | null> = output<T | null>();

  /** Emits when the dialog opens */
  readonly opened: OutputEmitterRef<void> = output<void>();

  /** Emits when the dialog closes */
  readonly closed: OutputEmitterRef<void> = output<void>();

  /** Emits when the value is cleared */
  readonly cleared: OutputEmitterRef<void> = output<void>();

  /** Emits the search query (debounced) for server-side search */
  readonly searchChange: OutputEmitterRef<string> = output<string>();

  // Internal state
  private readonly internalValue: WritableSignal<T | null> = signal(null);
  private readonly isFocused: WritableSignal<boolean> = signal(false);
  private readonly _searchQuery: WritableSignal<string> = signal('');
  private searchDebounceTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Current search query */
  readonly searchQuery: Signal<string> = this._searchQuery.asReadonly();

  /** Whether the dialog is currently open */
  readonly isOpen: Signal<boolean> = computed(() => {
    const combobox = this.outerCombobox();
    return combobox?.expanded() ?? false;
  });

  /** Whether there is a selected value */
  readonly hasValue: Signal<boolean> = computed(() => this.internalValue() !== null);

  /** Count of visible options (not hidden by search) */
  readonly visibleOptionsCount: Signal<number> = computed(() => {
    const opts = this.options();
    return opts.filter(opt => !opt.isHidden()).length;
  });

  /** Whether to show the no-results state */
  readonly showNoResults: Signal<boolean> = computed(() => {
    // Only show no results when searchable, has query, and no visible options
    if (!this.searchable()) return false;
    if (this.loading()) return false;
    const query = this._searchQuery();
    if (!query) return false;
    return this.visibleOptionsCount() === 0;
  });

  /** Display value for the trigger */
  readonly displayValue: Signal<string> = computed(() => {
    const value = this.internalValue();
    if (value === null) {
      return this.placeholder();
    }
    const displayFn = this.displayWith();
    if (displayFn) {
      return displayFn(value);
    }
    return String(value);
  });

  /** Computed trigger classes */
  readonly triggerClasses: Signal<string> = computed(() => {
    let state: 'default' | 'focused' | 'open' | 'disabled' | 'invalid' = 'default';

    if (this.disabled()) {
      state = 'disabled';
    } else if (this.isOpen()) {
      state = 'open';
    } else if (this.isFocused()) {
      state = 'focused';
    }

    return triggerVariants({ state, size: this.size() });
  });

  /** Computed dialog classes */
  readonly dialogClasses: Signal<string> = computed(() => {
    const base = dialogVariants({ size: this.size() });
    const extra = this.panelClass();
    return extra ? `${base} ${extra}` : base;
  });

  /** Max height for listbox based on size */
  readonly maxListboxHeight: Signal<string> = computed(() => {
    switch (this.size()) {
      case 'sm':
        return '14rem'; // 224px
      case 'lg':
        return '24rem'; // 384px
      default:
        return '18rem'; // 288px
    }
  });

  // CVA callbacks
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync external value input with internal state
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== undefined) {
        this.internalValue.set(externalValue);
      }
    });

    // Watch listbox selection changes
    effect(() => {
      const lb = this.listbox();
      if (lb) {
        const values = lb.values();
        if (values.length > 0) {
          const newValue = values[0] as T | null;
          if (newValue !== undefined && !this.valuesEqual(newValue, this.internalValue())) {
            this.internalValue.set(newValue);
            this.onChange(newValue);
            this.valueChange.emit(newValue);
            // Close dialog after selection
            this.outerCombobox()?.close();
          }
        }
      }
    });

    // Watch for open/close state changes
    effect(() => {
      const open = this.isOpen();
      if (open) {
        this.opened.emit();
        this.positionDialog();
        // Focus search input when opening if searchable
        if (this.searchable()) {
          requestAnimationFrame(() => {
            this.searchInputElement()?.nativeElement?.focus();
          });
        }
      } else {
        this.closed.emit();
        this.onTouched();
        // Reset search query when closing
        this.resetSearch();
      }
    });

    // Apply local search filtering when query changes
    effect(() => {
      const query = this._searchQuery();
      const opts = this.options();
      const predicate = this.searchPredicate();

      if (!this.searchable() || !query) {
        // Show all options when not searching
        opts.forEach(opt => opt.setHidden(false));
        return;
      }

      // Filter options based on predicate
      opts.forEach(opt => {
        const matches = predicate(opt.value(), query, opt.label());
        opt.setHidden(!matches);
      });
    });
  }

  /** Handle trigger click */
  onTriggerClick(): void {
    if (this.disabled()) return;
    const combobox = this.outerCombobox();
    if (combobox) {
      if (combobox.expanded()) {
        combobox.close();
      } else {
        combobox.open();
      }
    }
  }

  /** Handle clear button click */
  onClear(event: Event): void {
    event.stopPropagation();
    this.internalValue.set(null);
    this.onChange(null);
    this.valueChange.emit(null);
    this.cleared.emit();
  }

  /** Handle search input */
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    this._searchQuery.set(query);

    // Debounce the searchChange output
    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout);
    }
    this.searchDebounceTimeout = setTimeout(() => {
      this.searchChange.emit(query);
    }, this.searchDebounce());
  }

  /** Clear the search query */
  clearSearch(): void {
    this._searchQuery.set('');
    this.searchChange.emit('');
    // Re-focus search input
    this.searchInputElement()?.nativeElement?.focus();
  }

  /** Reset search query (called on dialog close) */
  private resetSearch(): void {
    if (this._searchQuery() !== '') {
      this._searchQuery.set('');
      // Clear any pending debounce
      if (this.searchDebounceTimeout) {
        clearTimeout(this.searchDebounceTimeout);
        this.searchDebounceTimeout = null;
      }
    }
  }

  /** Position the dialog below the trigger */
  private positionDialog(): void {
    const dialog = this.dialogElement();
    if (!dialog) return;

    // Use requestAnimationFrame to ensure dialog is visible
    requestAnimationFrame(() => {
      const dialogEl = dialog.nativeElement;
      const triggerRect = (dialogEl.parentElement as HTMLElement)?.getBoundingClientRect();

      if (triggerRect) {
        this.renderer.setStyle(dialogEl, 'top', `${triggerRect.height + 4}px`);
        this.renderer.setStyle(dialogEl, 'left', '0');
        this.renderer.setStyle(dialogEl, 'width', `${triggerRect.width}px`);
      }
    });
  }

  /** Compare two values for equality */
  private valuesEqual(a: T | null, b: T | null): boolean {
    if (a === null || b === null) {
      return a === b;
    }
    return this.compareWith()(a, b);
  }

  // ControlValueAccessor implementation
  writeValue(value: T | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Disabled state is handled via input signal
    // Forms will update the disabled input directly
  }
}
