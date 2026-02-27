import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
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
import { NgTemplateOutlet } from '@angular/common';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Combobox, ComboboxInput, ComboboxDialog, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { triggerVariants, dialogVariants } from './select.variants';
import { ComSelectOption } from './select-option';
import type { ComSelectSize, CompareFn, DisplayFn, SearchPredicateFn } from './select.types';
import { DEFAULT_SEARCH_DEBOUNCE } from './select.types';
import {
  ComSelectOptionTpl,
  ComSelectValueTpl,
  ComSelectPanelHeaderTpl,
  ComSelectPanelFooterTpl,
  ComSelectNoResultsTpl,
  ComSelectLoadingTpl,
  ComSelectOptionTplProvider,
  COM_SELECT_OPTION_TPL_TOKEN,
  type ComSelectValueContext,
  type ComSelectNoResultsContext,
} from './select.tokens';

/** Default search predicate - case-insensitive label match */
const defaultSearchPredicate = <T>(_option: T, query: string, label: string): boolean =>
  label.toLowerCase().includes(query.toLowerCase());

/**
 * Single-select component using Angular Aria dialog popup pattern.
 * Implements ControlValueAccessor for reactive and template-driven forms.
 *
 * ## Features
 * - Keyboard navigation and ARIA attributes (via Angular Aria)
 * - Form validation states (ng-invalid, ng-touched, ng-dirty, ng-pristine)
 * - Local and server-side search
 * - Customizable templates for options, value display, loading, and more
 * - Responsive dialog positioning with viewport edge handling
 * - Three size variants (sm, md, lg)
 * - Theme support (light, dark, forest)
 *
 * ## Basic Usage (Reactive Forms)
 * @example
 * ```html
 * <com-select formControlName="country" placeholder="Select country">
 *   @for (country of countries; track country.id) {
 *     <com-select-option [value]="country" [label]="country.name">
 *       {{ country.name }}
 *     </com-select-option>
 *   }
 * </com-select>
 * ```
 *
 * ## Searchable with Local Predicate
 * @example
 * ```html
 * <com-select
 *   formControlName="country"
 *   [searchable]="true"
 *   [searchPredicate]="filterCountry"
 *   placeholder="Search countries..."
 * >
 *   @for (country of countries; track country.id) {
 *     <com-select-option [value]="country" [label]="country.name">
 *       {{ country.name }}
 *     </com-select-option>
 *   }
 * </com-select>
 * ```
 * ```ts
 * filterCountry = (country: Country, query: string, label: string) =>
 *   label.toLowerCase().includes(query.toLowerCase()) ||
 *   country.code.toLowerCase().includes(query.toLowerCase());
 * ```
 *
 * ## Server-Side Search with Loading
 * @example
 * ```html
 * <com-select
 *   formControlName="user"
 *   [searchable]="true"
 *   [loading]="isLoading()"
 *   (searchChange)="onSearch($event)"
 *   placeholder="Search users..."
 * >
 *   @for (user of searchResults(); track user.id) {
 *     <com-select-option [value]="user" [label]="user.name">
 *       {{ user.name }}
 *     </com-select-option>
 *   }
 * </com-select>
 * ```
 * ```ts
 * isLoading = signal(false);
 * searchResults = signal<User[]>([]);
 *
 * onSearch(query: string) {
 *   this.isLoading.set(true);
 *   this.userService.search(query).subscribe(results => {
 *     this.searchResults.set(results);
 *     this.isLoading.set(false);
 *   });
 * }
 * ```
 *
 * ## Custom Option Template
 * @example
 * ```html
 * <com-select formControlName="user" placeholder="Select user">
 *   <ng-template comSelectOptionTpl let-user let-selected="selected">
 *     <img [src]="user.avatar" class="w-6 h-6 rounded-full" />
 *     <span [class.font-semibold]="selected">{{ user.name }}</span>
 *     <span class="text-surface-400 text-sm ml-auto">{{ user.role }}</span>
 *   </ng-template>
 *   @for (user of users; track user.id) {
 *     <com-select-option [value]="user" [label]="user.name" />
 *   }
 * </com-select>
 * ```
 *
 * ## Custom Value Template
 * @example
 * ```html
 * <com-select formControlName="user" placeholder="Select user">
 *   <ng-template comSelectValueTpl let-user let-placeholder="placeholder">
 *     @if (user) {
 *       <img [src]="user.avatar" class="w-5 h-5 rounded-full" />
 *       <span>{{ user.name }}</span>
 *     } @else {
 *       <span class="text-surface-400">{{ placeholder }}</span>
 *     }
 *   </ng-template>
 *   <!-- options... -->
 * </com-select>
 * ```
 *
 * ## Panel Header and Footer
 * @example
 * ```html
 * <com-select formControlName="category" placeholder="Select category">
 *   <ng-template comSelectPanelHeaderTpl>
 *     <div class="px-3 py-2 text-sm font-medium border-b border-surface-200">
 *       Categories
 *     </div>
 *   </ng-template>
 *   <ng-template comSelectPanelFooterTpl>
 *     <div class="px-3 py-2 border-t border-surface-200">
 *       <button type="button" class="text-primary-500 text-sm">
 *         + Add category
 *       </button>
 *     </div>
 *   </ng-template>
 *   <!-- options... -->
 * </com-select>
 * ```
 *
 * ## Size Variants
 * @example
 * ```html
 * <com-select size="sm" placeholder="Small" />
 * <com-select size="md" placeholder="Medium (default)" />
 * <com-select size="lg" placeholder="Large" />
 * ```
 *
 * ## With Object Comparison
 * @example
 * ```html
 * <com-select
 *   formControlName="country"
 *   [compareWith]="compareById"
 *   [displayWith]="displayCountry"
 * >
 *   <!-- options... -->
 * </com-select>
 * ```
 * ```ts
 * compareById = (a: Country, b: Country) => a?.id === b?.id;
 * displayCountry = (country: Country) => country?.name ?? '';
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
      @if (valueTpl()) {
        <span class="flex-1 truncate">
          <ng-container *ngTemplateOutlet="valueTpl()!.templateRef; context: valueContext()" />
        </span>
      } @else {
        <span class="flex-1 truncate" [class.text-surface-400]="!hasValue()">
          {{ displayValue() }}
        </span>
      }

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
          [class.hidden]="!dialogVisible()"
          [class.animate-scale-in]="isOpen()"
          [class.dialog-closing]="isClosing()"
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

            <!-- Panel header -->
            @if (panelHeaderTpl()) {
              <ng-container *ngTemplateOutlet="panelHeaderTpl()!.templateRef" />
            }

            <!-- Loading state -->
            @if (loading()) {
              @if (loadingTpl()) {
                <ng-container *ngTemplateOutlet="loadingTpl()!.templateRef" />
              } @else {
                <div class="flex items-center justify-center py-8 text-surface-400">
                  <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="ml-2 text-sm">Loading...</span>
                </div>
              }
            } @else if (showNoResults()) {
              <!-- No results state -->
              @if (noResultsTpl()) {
                <ng-container *ngTemplateOutlet="noResultsTpl()!.templateRef; context: noResultsContext()" />
              } @else {
                <div class="flex items-center justify-center py-8 text-surface-400">
                  <span class="text-sm">No results found</span>
                </div>
              }
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

            <!-- Panel footer -->
            @if (panelFooterTpl()) {
              <ng-container *ngTemplateOutlet="panelFooterTpl()!.templateRef" />
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
    .dialog-closing {
      animation: fade-out 0.15s ease-out forwards;
    }
    @keyframes fade-out {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }
  `,
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxDialog,
    ComboboxPopupContainer,
    Listbox,
    NgTemplateOutlet,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComSelect),
      multi: true,
    },
    {
      provide: COM_SELECT_OPTION_TPL_TOKEN,
      useFactory: () => new ComSelectOptionTplProvider<unknown>(),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'com-select',
    '[class.ng-invalid]': 'isInvalid()',
    '[class.ng-valid]': 'isValid()',
    '[class.ng-touched]': 'isTouched()',
    '[class.ng-untouched]': 'isUntouched()',
    '[class.ng-dirty]': 'isDirty()',
    '[class.ng-pristine]': 'isPristine()',
  },
})
export class ComSelect<T> implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);
  private readonly optionTplProvider = inject<ComSelectOptionTplProvider<T>>(COM_SELECT_OPTION_TPL_TOKEN);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  // View queries
  private readonly outerCombobox = viewChild<Combobox<T>>('outerCombobox');
  private readonly listbox = viewChild<Listbox<T>>('listboxRef');
  private readonly dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');
  private readonly searchInputElement = viewChild<ElementRef<HTMLInputElement>>('searchInputRef');
  private readonly options = contentChildren(ComSelectOption<T>);

  // Template directives
  /** Custom option template */
  readonly optionTpl: Signal<ComSelectOptionTpl<T> | undefined> = contentChild(ComSelectOptionTpl<T>);
  /** Custom value display template */
  readonly valueTpl: Signal<ComSelectValueTpl<T> | undefined> = contentChild(ComSelectValueTpl<T>);
  /** Custom panel header template */
  readonly panelHeaderTpl: Signal<ComSelectPanelHeaderTpl | undefined> = contentChild(ComSelectPanelHeaderTpl);
  /** Custom panel footer template */
  readonly panelFooterTpl: Signal<ComSelectPanelFooterTpl | undefined> = contentChild(ComSelectPanelFooterTpl);
  /** Custom no-results template */
  readonly noResultsTpl: Signal<ComSelectNoResultsTpl | undefined> = contentChild(ComSelectNoResultsTpl);
  /** Custom loading template */
  readonly loadingTpl: Signal<ComSelectLoadingTpl | undefined> = contentChild(ComSelectLoadingTpl);

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
  private closeAnimationTimeout: ReturnType<typeof setTimeout> | null = null;
  /** Counter to trigger re-evaluation of control state computed signals */
  private readonly controlStateVersion: WritableSignal<number> = signal(0);
  /** Whether the dialog close animation is playing */
  readonly isClosing: WritableSignal<boolean> = signal(false);
  /** Previous open state for detecting close transitions */
  private wasOpen = false;

  /** Current search query */
  readonly searchQuery: Signal<string> = this._searchQuery.asReadonly();

  /** Whether the dialog is currently open */
  readonly isOpen: Signal<boolean> = computed(() => {
    const combobox = this.outerCombobox();
    return combobox?.expanded() ?? false;
  });

  /** Whether the dialog should be visible (open or closing) */
  readonly dialogVisible: Signal<boolean> = computed(() => this.isOpen() || this.isClosing());

  /** Whether there is a selected value */
  readonly hasValue: Signal<boolean> = computed(() => this.internalValue() !== null);

  /** Count of visible options (not hidden by search) */
  readonly visibleOptionsCount: Signal<number> = computed(() => {
    const opts = this.options();
    return opts.filter(opt => !opt.isHidden()).length;
  });

  /** Total count of options (regardless of visibility) */
  readonly totalOptionsCount: Signal<number> = computed(() => this.options().length);

  /** Whether to show the no-results state */
  readonly showNoResults: Signal<boolean> = computed(() => {
    if (this.loading()) return false;

    const visibleCount = this.visibleOptionsCount();
    const totalCount = this.totalOptionsCount();

    // Show no results when:
    // 1. There are no options at all (empty list)
    // 2. Search is active and no options match
    if (totalCount === 0) return true;
    if (this.searchable() && this._searchQuery() && visibleCount === 0) return true;

    return false;
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
    } else if (this.showInvalidState()) {
      state = 'invalid';
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

  /** Context for custom value template */
  readonly valueContext: Signal<ComSelectValueContext<T>> = computed(() => ({
    $implicit: this.internalValue(),
    placeholder: this.placeholder(),
  }));

  /** Context for custom no-results template */
  readonly noResultsContext: Signal<ComSelectNoResultsContext> = computed(() => ({
    query: this._searchQuery(),
  }));

  // Form control state signals (depend on controlStateVersion to ensure reactivity)
  /** Whether the form control is invalid */
  readonly isInvalid: Signal<boolean> = computed(() => {
    this.controlStateVersion(); // Trigger re-evaluation
    return this.ngControl?.control?.invalid ?? false;
  });
  /** Whether the form control is valid */
  readonly isValid: Signal<boolean> = computed(() => {
    this.controlStateVersion();
    return this.ngControl?.control?.valid ?? true;
  });
  /** Whether the form control has been touched */
  readonly isTouched: Signal<boolean> = computed(() => {
    this.controlStateVersion();
    return this.ngControl?.control?.touched ?? false;
  });
  /** Whether the form control has not been touched */
  readonly isUntouched: Signal<boolean> = computed(() => !this.isTouched());
  /** Whether the form control has been modified */
  readonly isDirty: Signal<boolean> = computed(() => {
    this.controlStateVersion();
    return this.ngControl?.control?.dirty ?? false;
  });
  /** Whether the form control has not been modified */
  readonly isPristine: Signal<boolean> = computed(() => this.ngControl?.control?.pristine ?? true);
  /** Whether to show invalid state (invalid + touched) */
  readonly showInvalidState: Signal<boolean> = computed(() => this.isInvalid() && this.isTouched());

  // CVA callbacks
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync option template to provider for child options
    effect(() => {
      const tpl = this.optionTpl();
      this.optionTplProvider.optionTpl = tpl ?? null;
    });

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
            // Trigger re-evaluation of form state (dirty state changed)
            this.bumpControlState();
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
        // Clear any pending close animation
        if (this.closeAnimationTimeout) {
          clearTimeout(this.closeAnimationTimeout);
          this.closeAnimationTimeout = null;
        }
        this.isClosing.set(false);
        this.opened.emit();
        this.positionDialog();
        // Focus search input when opening if searchable
        if (this.searchable()) {
          requestAnimationFrame(() => {
            this.searchInputElement()?.nativeElement?.focus();
          });
        }
        this.wasOpen = true;
      } else if (this.wasOpen) {
        // Dialog is closing - trigger close animation
        this.isClosing.set(true);
        this.closeAnimationTimeout = setTimeout(() => {
          this.isClosing.set(false);
          this.closeAnimationTimeout = null;
        }, 150); // Match the fade-out animation duration
        this.closed.emit();
        this.onTouched();
        // Reset search query when closing
        this.resetSearch();
        // Trigger re-evaluation of form state (touched state changed)
        this.bumpControlState();
        this.wasOpen = false;
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
    this.bumpControlState();
  }

  /** Bump control state version to trigger re-evaluation of form state signals */
  private bumpControlState(): void {
    this.controlStateVersion.update(v => v + 1);
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

  /** Position the dialog relative to the trigger, handling viewport edges */
  private positionDialog(): void {
    const dialog = this.dialogElement();
    if (!dialog) return;

    // Use requestAnimationFrame to ensure dialog is visible
    requestAnimationFrame(() => {
      const dialogEl = dialog.nativeElement;
      const triggerEl = dialogEl.parentElement as HTMLElement | null;
      if (!triggerEl) return;

      const triggerRect = triggerEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const gap = 4; // Gap between trigger and dialog

      // Set the dialog width to match trigger
      this.renderer.setStyle(dialogEl, 'width', `${triggerRect.width}px`);
      this.renderer.setStyle(dialogEl, 'left', '0');

      // Get the max dialog height from the CVA size variant
      const maxHeight = this.getMaxDialogHeight();

      // Calculate available space below and above the trigger
      const spaceBelow = viewportHeight - triggerRect.bottom - gap;
      const spaceAbove = triggerRect.top - gap;

      // Determine if dialog should open above or below
      const openBelow = spaceBelow >= maxHeight || spaceBelow >= spaceAbove;

      if (openBelow) {
        // Position below trigger
        this.renderer.setStyle(dialogEl, 'top', `${triggerRect.height + gap}px`);
        this.renderer.setStyle(dialogEl, 'bottom', 'auto');
        // Constrain height if needed
        if (spaceBelow < maxHeight) {
          this.renderer.setStyle(dialogEl, 'maxHeight', `${spaceBelow}px`);
        } else {
          this.renderer.removeStyle(dialogEl, 'maxHeight');
        }
      } else {
        // Position above trigger
        this.renderer.setStyle(dialogEl, 'bottom', `${triggerRect.height + gap}px`);
        this.renderer.setStyle(dialogEl, 'top', 'auto');
        // Constrain height if needed
        if (spaceAbove < maxHeight) {
          this.renderer.setStyle(dialogEl, 'maxHeight', `${spaceAbove}px`);
        } else {
          this.renderer.removeStyle(dialogEl, 'maxHeight');
        }
      }
    });
  }

  /** Get maximum dialog height in pixels based on size variant */
  private getMaxDialogHeight(): number {
    switch (this.size()) {
      case 'sm':
        return 224; // 14rem
      case 'lg':
        return 384; // 24rem
      default:
        return 288; // 18rem (md)
    }
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
