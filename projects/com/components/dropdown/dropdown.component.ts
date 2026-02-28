import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
  ViewContainerRef,
  DOCUMENT,
} from '@angular/core';
import type {
  InputSignal,
  OnInit,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { NgControl } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import {
  Overlay,
  OverlayRef,
  OverlayModule,
} from '@angular/cdk/overlay';
import type { ConnectedPosition, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComDropdownOption } from './dropdown-option.component';
import { ComDropdownPanel } from './dropdown-panel.component';
import { ComDropdownSearch } from './dropdown-search.component';
import { ComDropdownTag } from './dropdown-tag.component';
import { ComDropdownGroup } from './dropdown-group.component';
import { ComDropdownOptionTpl } from './directives/dropdown-option-tpl.directive';
import { ComDropdownSelectedTpl } from './directives/dropdown-selected-tpl.directive';
import { ComDropdownEmptyTpl } from './directives/dropdown-empty-tpl.directive';
import { ComDropdownGroupTpl } from './directives/dropdown-group-tpl.directive';
import { ComDropdownTagTpl } from './directives/dropdown-tag-tpl.directive';
import {
  dropdownTriggerVariants,
  dropdownChevronVariants,
  dropdownClearVariants,
  dropdownOverflowBadgeVariants,
} from './dropdown.variants';
import type {
  DropdownVariant,
  DropdownSize,
  DropdownState,
} from './dropdown.variants';
import type {
  ComDropdownOptionContext,
  ComDropdownSelectedContext,
  ComDropdownEmptyContext,
  ComDropdownGroupContext,
  ComDropdownTagContext,
  ComDropdownProcessedOption,
  ComDropdownGroup as DropdownGroupType,
  ComDropdownPanelWidth,
} from './dropdown.models';
import {
  defaultCompareWith,
  defaultDisplayWith,
  defaultFilterWith,
  generateDropdownId,
} from './dropdown.models';
import { mergeClasses } from './dropdown.utils';

/** Default position for the dropdown panel. */
const DEFAULT_POSITIONS: ConnectedPosition[] = [
  // Below trigger, aligned start
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  // Above trigger, aligned start
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  // Below trigger, aligned end
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
  // Above trigger, aligned end
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
];

/** Threshold for enabling virtual scrolling. */
const VIRTUAL_SCROLL_THRESHOLD = 50;

/**
 * Reusable dropdown/select component with full accessibility support.
 * Implements ControlValueAccessor for Reactive Forms integration.
 *
 * @example
 * ```html
 * <com-dropdown
 *   [options]="users()"
 *   [compareWith]="compareById"
 *   formControlName="assignee"
 *   placeholder="Select user..."
 *   [searchable]="true"
 * >
 *   <ng-template comDropdownOption let-user let-selected="selected">
 *     <span>{{ user.name }}</span>
 *   </ng-template>
 * </com-dropdown>
 * ```
 */
@Component({
  selector: 'com-dropdown',
  exportAs: 'comDropdown',
  template: `
    <!-- Trigger button -->
    <button
      #triggerElement
      type="button"
      role="combobox"
      [class]="triggerClasses()"
      [attr.id]="triggerId()"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="panelId()"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-activedescendant]="activeDescendant()"
      [attr.aria-required]="required() || null"
      [attr.aria-invalid]="state() === 'error' || null"
      [attr.aria-disabled]="disabled() || null"
      [attr.tabindex]="disabled() ? -1 : 0"
      [disabled]="disabled()"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
    >
      <!-- Selected value display -->
      <span class="flex-1 truncate text-left">
        @if (selectedTemplate()) {
          <ng-container
            [ngTemplateOutlet]="selectedTemplate()!.templateRef"
            [ngTemplateOutletContext]="selectedContext()"
          />
        } @else if (multiple()) {
          @if (selectedValues().length > 0) {
            <span class="flex flex-wrap gap-1">
              @for (item of visibleTags(); track trackByValue(item, $index); let i = $index) {
                <com-dropdown-tag
                  [value]="item"
                  [displayText]="displayWith()(item)"
                  [index]="i"
                  [size]="size()"
                  [disabled]="disabled()"
                  [tagTemplate]="tagTemplate()?.templateRef ?? null"
                  (remove)="removeValue($event)"
                />
              }
              @if (hiddenTagsCount() > 0) {
                <span [class]="overflowBadgeClasses()">
                  +{{ hiddenTagsCount() }}
                </span>
              }
            </span>
          } @else {
            <span class="text-surface-400 dark:text-surface-500">{{ placeholder() }}</span>
          }
        } @else {
          @if (selectedValue() !== null && selectedValue() !== undefined) {
            {{ displayWith()(selectedValue()!) }}
          } @else {
            <span class="text-surface-400 dark:text-surface-500">{{ placeholder() }}</span>
          }
        }
      </span>

      <!-- Clear button -->
      @if (clearable() && hasValue() && !disabled()) {
        <button
          type="button"
          [class]="clearClasses()"
          [attr.aria-label]="'Clear selection'"
          (click)="clear($event)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-full w-full"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      }

      <!-- Chevron icon -->
      <svg
        [class]="chevronClasses()"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Panel template (rendered in overlay) -->
    <ng-template #panelTemplate>
      <div
        #panelElement
        [class]="panelClasses()"
        [attr.id]="panelId()"
        [attr.role]="'listbox'"
        [attr.aria-multiselectable]="multiple() || null"
        [attr.aria-label]="placeholder()"
        (keydown)="onPanelKeydown($event)"
      >
        <!-- Search input -->
        @if (searchable()) {
          <com-dropdown-search
            [placeholder]="searchPlaceholder()"
            [size]="size()"
            [debounceMs]="searchDebounceMs()"
            (searchChange)="onSearchChange($event)"
            (keyNav)="onSearchKeyNav($event)"
          />
        }

        <!-- Options list -->
        <div
          class="overflow-auto"
          [style.maxHeight]="maxHeight()"
        >
          @if (groupedOptions().length > 0) {
            @for (group of groupedOptions(); track group.key) {
              <!-- Group header -->
              <com-dropdown-group
                [label]="group.key"
                [count]="group.options.length"
                [expanded]="group.expanded"
                [size]="size()"
                [groupTemplate]="groupTemplate()?.templateRef ?? null"
              />

              <!-- Group options -->
              @for (option of group.options; track option.id; let i = $index) {
                <com-dropdown-option
                  [value]="option.value"
                  [displayText]="option.displayText"
                  [id]="option.id"
                  [index]="getGlobalIndex(group.key, i)"
                  [selected]="isSelected(option.value)"
                  [active]="isActive(option.id)"
                  [disabled]="option.disabled"
                  [size]="size()"
                  [optionTemplate]="optionTemplate()?.templateRef ?? null"
                  (select)="selectOption($event)"
                  (hover)="onOptionHover(option.id)"
                />
              }
            }
          } @else if (filteredOptions().length > 0) {
            @for (option of filteredOptions(); track option.id; let i = $index) {
              <com-dropdown-option
                [value]="option.value"
                [displayText]="option.displayText"
                [id]="option.id"
                [index]="i"
                [selected]="isSelected(option.value)"
                [active]="isActive(option.id)"
                [disabled]="option.disabled"
                [size]="size()"
                [optionTemplate]="optionTemplate()?.templateRef ?? null"
                (select)="selectOption($event)"
                (hover)="onOptionHover(option.id)"
              />
            }
          } @else {
            <!-- Empty state -->
            @if (emptyTemplate()) {
              <ng-container
                [ngTemplateOutlet]="emptyTemplate()!.templateRef"
                [ngTemplateOutletContext]="emptyContext()"
              />
            } @else {
              <div class="flex items-center justify-center px-3 py-6 text-surface-500 dark:text-surface-400">
                @if (searchQuery()) {
                  No results for "{{ searchQuery() }}"
                } @else {
                  No options available
                }
              </div>
            }
          }
        </div>
      </div>
    </ng-template>

    <!-- Live announcer region -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ liveAnnouncement() }}
    </div>
  `,
  styles: `
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
  `,
  imports: [
    NgTemplateOutlet,
    OverlayModule,
    ComDropdownOption,
    ComDropdownSearch,
    ComDropdownTag,
    ComDropdownGroup,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-dropdown-host inline-block',
    '[class.com-dropdown-disabled]': 'disabled()',
    '[class.com-dropdown-open]': 'isOpen()',
  },
})
export class ComDropdown<T> implements ControlValueAccessor, OnInit {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly liveAnnouncer = inject(LiveAnnouncer);
  private readonly document = inject(DOCUMENT);

  /** Optional NgControl for form integration. */
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  /** Reference to the trigger button element. */
  private readonly triggerRef: Signal<ElementRef<HTMLButtonElement>> =
    viewChild.required<ElementRef<HTMLButtonElement>>('triggerElement');

  /** Reference to the panel template. */
  private readonly panelTemplateRef: Signal<TemplateRef<unknown>> =
    viewChild.required<TemplateRef<unknown>>('panelTemplate');

  /** Content query for custom option template. */
  protected readonly optionTemplate: Signal<ComDropdownOptionTpl<T> | undefined> =
    contentChild(ComDropdownOptionTpl<T>);

  /** Content query for custom selected template. */
  protected readonly selectedTemplate: Signal<ComDropdownSelectedTpl<T> | undefined> =
    contentChild(ComDropdownSelectedTpl<T>);

  /** Content query for custom empty template. */
  protected readonly emptyTemplate: Signal<ComDropdownEmptyTpl | undefined> =
    contentChild(ComDropdownEmptyTpl);

  /** Content query for custom group template. */
  protected readonly groupTemplate: Signal<ComDropdownGroupTpl | undefined> =
    contentChild(ComDropdownGroupTpl);

  /** Content query for custom tag template. */
  protected readonly tagTemplate: Signal<ComDropdownTagTpl<T> | undefined> =
    contentChild(ComDropdownTagTpl<T>);

  /** Overlay reference. */
  private overlayRef: OverlayRef | null = null;

  /** Unique ID for the dropdown. */
  private readonly dropdownId = generateDropdownId();

  // ============ INPUTS ============

  /** Array of options to display. */
  readonly options: InputSignal<T[]> = input<T[]>([]);

  /** Current value (single or array for multiple). */
  readonly value: InputSignal<T | T[] | null> = input<T | T[] | null>(null);

  /** Placeholder text when no value is selected. */
  readonly placeholder: InputSignal<string> = input<string>('Select...');

  /** Enable multi-select mode. */
  readonly multiple: InputSignal<boolean> = input<boolean>(false);

  /** Enable search/filter input. */
  readonly searchable: InputSignal<boolean> = input<boolean>(false);

  /** Search input placeholder. */
  readonly searchPlaceholder: InputSignal<string> = input<string>('Search...');

  /** Disable the dropdown. */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Mark as required. */
  readonly required: InputSignal<boolean> = input<boolean>(false);

  /** Show clear button. */
  readonly clearable: InputSignal<boolean> = input<boolean>(false);

  /** Custom equality function for comparing values. */
  readonly compareWith: InputSignal<(a: T, b: T) => boolean> = input<(a: T, b: T) => boolean>(defaultCompareWith);

  /** Function to get display text from a value. */
  readonly displayWith: InputSignal<(value: T) => string> = input<(value: T) => string>(defaultDisplayWith);

  /** Custom filter function for search. */
  readonly filterWith: InputSignal<((option: T, query: string) => boolean) | null> =
    input<((option: T, query: string) => boolean) | null>(null);

  /** Function to group options by a key. */
  readonly groupBy: InputSignal<((option: T) => string) | null> = input<((option: T) => string) | null>(null);

  /** CVA variant for trigger styling. */
  readonly variant: InputSignal<DropdownVariant> = input<DropdownVariant>('default');

  /** Size variant. */
  readonly size: InputSignal<DropdownSize> = input<DropdownSize>('default');

  /** Validation state. */
  readonly state: InputSignal<DropdownState> = input<DropdownState>('default');

  /** Additional CSS classes for the trigger. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** Additional CSS classes for the panel. */
  readonly panelClass: InputSignal<string> = input<string>('');

  /** Maximum height of the panel. */
  readonly maxHeight: InputSignal<string> = input<string>('256px');

  /** Panel width strategy. */
  readonly panelWidth: InputSignal<ComDropdownPanelWidth> = input<ComDropdownPanelWidth>('trigger');

  /** Debounce time for search (ms). */
  readonly searchDebounceMs: InputSignal<number> = input<number>(300);

  /** Virtual scroll threshold. */
  readonly virtualScrollThreshold: InputSignal<number> = input<number>(VIRTUAL_SCROLL_THRESHOLD);

  /** Maximum number of tags to display in multi-select mode. Set to null for no limit. */
  readonly maxVisibleTags: InputSignal<number | null> = input<number | null>(2);

  // ============ OUTPUTS ============

  /** Emitted when the value changes. */
  readonly valueChange: OutputEmitterRef<T | T[] | null> = output<T | T[] | null>();

  /** Emitted when search query changes. */
  readonly searchChange: OutputEmitterRef<string> = output<string>();

  /** Emitted when panel opens. */
  readonly opened: OutputEmitterRef<void> = output<void>();

  /** Emitted when panel closes. */
  readonly closed: OutputEmitterRef<void> = output<void>();

  // ============ INTERNAL STATE ============

  /** Whether the panel is open. */
  readonly isOpen: WritableSignal<boolean> = signal(false);

  /** Current search query. */
  readonly searchQuery: WritableSignal<string> = signal('');

  /** Currently active (keyboard focused) option ID. */
  readonly activeOptionId: WritableSignal<string | null> = signal(null);

  /** Internal value state (managed by CVA or input). */
  readonly internalValue: WritableSignal<T | T[] | null> = linkedSignal<T | T[] | null>(() => this.value() ?? null);

  /** Live announcements for screen readers. */
  readonly liveAnnouncement: WritableSignal<string> = signal('');

  // ============ COMPUTED STATE ============

  /** Trigger element ID. */
  readonly triggerId: Signal<string> = computed(() => `${this.dropdownId}-trigger`);

  /** Panel element ID. */
  readonly panelId: Signal<string> = computed(() => `${this.dropdownId}-panel`);

  /** Currently active descendant ID (for ARIA). */
  readonly activeDescendant: Signal<string | null> = computed(() => {
    return this.isOpen() ? this.activeOptionId() : null;
  });

  /** Whether the dropdown has a value. */
  readonly hasValue: Signal<boolean> = computed(() => {
    const val = this.internalValue();
    if (this.multiple()) {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== null && val !== undefined;
  });

  /** Selected value (single mode). */
  readonly selectedValue: Signal<T | null> = computed(() => {
    const val = this.internalValue();
    if (this.multiple() || Array.isArray(val)) {
      return null;
    }
    return val;
  });

  /** Selected values (multiple mode). */
  readonly selectedValues: Signal<T[]> = computed(() => {
    const val = this.internalValue();
    if (!this.multiple()) {
      return [];
    }
    return Array.isArray(val) ? val : val !== null ? [val] : [];
  });

  /** Tags visible in the trigger (limited by maxVisibleTags). */
  readonly visibleTags: Signal<T[]> = computed(() => {
    const all = this.selectedValues();
    const max = this.maxVisibleTags();
    if (max === null || all.length <= max) {
      return all;
    }
    return all.slice(0, max);
  });

  /** Count of hidden tags (for +N badge). */
  readonly hiddenTagsCount: Signal<number> = computed(() => {
    const all = this.selectedValues();
    const max = this.maxVisibleTags();
    if (max === null || all.length <= max) {
      return 0;
    }
    return all.length - max;
  });

  /** Processed options with display text and IDs. */
  readonly processedOptions: Signal<ComDropdownProcessedOption<T>[]> = computed(() => {
    const opts = this.options();
    const display = this.displayWith();
    return opts.map((opt, index) => ({
      value: opt,
      displayText: display(opt),
      disabled: false, // Could be extended with disabledWith input
      id: `${this.dropdownId}-option-${index}`,
    }));
  });

  /** Filtered options based on search query. */
  readonly filteredOptions: Signal<ComDropdownProcessedOption<T>[]> = computed(() => {
    const opts = this.processedOptions();
    const query = this.searchQuery().trim();

    if (!query) {
      return opts;
    }

    const filterFn = this.filterWith();
    const display = this.displayWith();

    return opts.filter((opt) => {
      if (filterFn) {
        return filterFn(opt.value, query);
      }
      return defaultFilterWith(opt.value, query, display);
    });
  });

  /** Grouped options (when groupBy is provided). */
  readonly groupedOptions: Signal<DropdownGroupType<ComDropdownProcessedOption<T>>[]> = computed(() => {
    const groupFn = this.groupBy();
    if (!groupFn) {
      return [];
    }

    const opts = this.filteredOptions();
    const groups = new Map<string, ComDropdownProcessedOption<T>[]>();

    for (const opt of opts) {
      const key = groupFn(opt.value);
      const existing = groups.get(key) || [];
      existing.push(opt);
      groups.set(key, existing);
    }

    return Array.from(groups.entries()).map(([key, options]) => ({
      key,
      options,
      expanded: true,
    }));
  });

  /** Whether virtual scrolling should be enabled. */
  readonly virtualScrollEnabled: Signal<boolean> = computed(() => {
    return this.filteredOptions().length > this.virtualScrollThreshold();
  });

  /** Context for selected template. */
  readonly selectedContext: Signal<ComDropdownSelectedContext<T>> = computed(() => ({
    $implicit: this.internalValue(),
    placeholder: this.placeholder(),
    multiple: this.multiple(),
  }));

  /** Context for empty template. */
  readonly emptyContext: Signal<ComDropdownEmptyContext> = computed(() => ({
    $implicit: this.searchQuery(),
  }));

  /** Computed trigger classes. */
  readonly triggerClasses: Signal<string> = computed(() => {
    const baseClasses = dropdownTriggerVariants({
      variant: this.variant(),
      size: this.size(),
      state: this.state(),
      open: this.isOpen(),
    });
    return mergeClasses(baseClasses, this.userClass());
  });

  /** Computed panel classes. */
  readonly panelClasses: Signal<string> = computed(() => {
    return mergeClasses(
      'w-full z-50 overflow-hidden rounded-md border border-surface-200 bg-surface-50 text-surface-900 shadow-lg outline-none',
      'dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100',
      this.panelClass()
    );
  });

  /** Computed chevron classes. */
  readonly chevronClasses: Signal<string> = computed(() => {
    return dropdownChevronVariants({
      size: this.size(),
      open: this.isOpen(),
    });
  });

  /** Computed clear button classes. */
  readonly clearClasses: Signal<string> = computed(() => {
    return dropdownClearVariants({ size: this.size() });
  });

  /** Computed overflow badge classes. */
  readonly overflowBadgeClasses: Signal<string> = computed(() => {
    return dropdownOverflowBadgeVariants({ size: this.size() });
  });

  // ============ CVA CALLBACKS ============

  private onChange: (value: T | T[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Wire up NgControl if present
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    // Nothing special needed here since we use effects
  }

  // ============ CVA IMPLEMENTATION ============

  writeValue(value: T | T[] | null): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Disabled state is handled via the disabled input
    // When using forms, the form control's disabled state takes precedence
  }

  // ============ PUBLIC METHODS ============

  /** Opens the dropdown panel. */
  open(): void {
    if (this.disabled() || this.isOpen()) {
      return;
    }

    this.createOverlay();
    this.isOpen.set(true);
    this.opened.emit();

    // Set initial active option
    const currentValue = this.internalValue();
    if (currentValue !== null && !this.multiple()) {
      const option = this.filteredOptions().find((opt) => this.compareWith()(opt.value, currentValue as T));
      if (option) {
        this.activeOptionId.set(option.id);
      }
    } else {
      const firstOption = this.filteredOptions()[0];
      if (firstOption) {
        this.activeOptionId.set(firstOption.id);
      }
    }

    // Announce opening
    this.announce(`${this.placeholder()} dropdown opened, ${this.filteredOptions().length} options available`);
  }

  /** Closes the dropdown panel. */
  close(): void {
    if (!this.isOpen()) {
      return;
    }

    this.destroyOverlay();
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.activeOptionId.set(null);
    this.closed.emit();
    this.onTouched();
  }

  /** Toggles the dropdown panel. */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Clears the selection. */
  clear(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    const newValue = this.multiple() ? [] : null;
    this.updateValue(newValue);
    this.announce('Selection cleared');
  }

  /** Checks if a value is selected. */
  isSelected(value: T): boolean {
    const current = this.internalValue();
    const compare = this.compareWith();

    if (this.multiple()) {
      const arr = Array.isArray(current) ? current : [];
      return arr.some((v) => compare(v, value));
    }

    return current !== null && compare(current as T, value);
  }

  /** Checks if an option ID is the active one. */
  isActive(optionId: string): boolean {
    return this.activeOptionId() === optionId;
  }

  // ============ EVENT HANDLERS ============

  protected onTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
        } else {
          this.navigateOptions(event.key === 'ArrowDown' ? 1 : -1);
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen() && this.activeOptionId()) {
          this.selectActiveOption();
        } else {
          this.toggle();
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
          this.triggerRef().nativeElement.focus();
        }
        break;

      case 'Home':
        if (this.isOpen()) {
          event.preventDefault();
          this.navigateToFirst();
        }
        break;

      case 'End':
        if (this.isOpen()) {
          event.preventDefault();
          this.navigateToLast();
        }
        break;

      case 'Tab':
        // Close panel when tabbing away from trigger
        if (this.isOpen()) {
          this.close();
        }
        // Don't prevent default - let Tab naturally move focus
        break;

      default:
        // Type-ahead search
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          this.typeAhead(event.key);
        }
        break;
    }
  }

  protected onPanelKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateOptions(1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.navigateOptions(-1);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectActiveOption();
        break;

      case 'Escape':
        event.preventDefault();
        this.close();
        this.triggerRef().nativeElement.focus();
        break;

      case 'Tab':
        this.close();
        break;

      case 'Home':
        event.preventDefault();
        this.navigateToFirst();
        break;

      case 'End':
        event.preventDefault();
        this.navigateToLast();
        break;
    }
  }

  protected onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.searchChange.emit(query);

    // Reset active option to first result
    const filtered = this.filteredOptions();
    const firstFiltered = filtered[0];
    if (firstFiltered) {
      this.activeOptionId.set(firstFiltered.id);
    } else {
      this.activeOptionId.set(null);
    }
  }

  protected onSearchKeyNav(event: KeyboardEvent): void {
    // Delegate to panel keydown handler
    this.onPanelKeydown(event);
  }

  protected onOptionHover(optionId: string): void {
    this.activeOptionId.set(optionId);
  }

  protected selectOption(value: T): void {
    if (this.multiple()) {
      this.toggleMultipleValue(value);
    } else {
      this.updateValue(value);
      this.close();
      this.triggerRef().nativeElement.focus();
    }
  }

  protected removeValue(value: T): void {
    const current = this.selectedValues();
    const compare = this.compareWith();
    const newValues = current.filter((v) => !compare(v, value));
    this.updateValue(newValues.length > 0 ? newValues : []);
    this.announce(`${this.displayWith()(value)} removed`);
  }

  protected trackByValue(item: T, _index: number): unknown {
    return item;
  }

  protected getGlobalIndex(groupKey: string, localIndex: number): number {
    const groups = this.groupedOptions();
    let globalIndex = 0;

    for (const group of groups) {
      if (group.key === groupKey) {
        return globalIndex + localIndex;
      }
      globalIndex += group.options.length;
    }

    return localIndex;
  }

  // ============ PRIVATE METHODS ============

  private createOverlay(): void {
    if (this.overlayRef) {
      return;
    }

    const hostEl = this.elementRef.nativeElement;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(hostEl)
      .withPositions(DEFAULT_POSITIONS)
      .withFlexibleDimensions(false)
      .withPush(true);

    const hostWidth = hostEl.getBoundingClientRect().width;

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      ...this.getPanelWidthConfig(hostWidth),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Attach panel template
    const portal = new TemplatePortal(this.panelTemplateRef(), this.viewContainerRef);
    this.overlayRef.attach(portal);

    // Close on backdrop click
    this.overlayRef
      .backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());

    // Close on outside click
    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.close());
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  /**
   * Returns overlay width configuration based on panelWidth setting.
   * - 'trigger': min-width equals host, can grow wider
   * - 'auto': no width constraint
   * - specific value: exact width
   */
  private getPanelWidthConfig(hostWidth: number): { minWidth?: number; width?: string } {
    const config = this.panelWidth();
    if (config === 'trigger') {
      return { minWidth: hostWidth };
    }
    if (config === 'auto') {
      return {};
    }
    return { width: config };
  }

  private updateValue(value: T | T[] | null): void {
    this.internalValue.set(value);
    this.onChange(value);
    this.valueChange.emit(value);

    // Announce selection
    if (value !== null && !Array.isArray(value)) {
      this.announce(`${this.displayWith()(value)} selected`);
    }
  }

  private toggleMultipleValue(value: T): void {
    const current = this.selectedValues();
    const compare = this.compareWith();
    const isAlreadySelected = current.some((v) => compare(v, value));

    let newValues: T[];
    if (isAlreadySelected) {
      newValues = current.filter((v) => !compare(v, value));
      this.announce(`${this.displayWith()(value)} deselected`);
    } else {
      newValues = [...current, value];
      this.announce(`${this.displayWith()(value)} selected`);
    }

    this.updateValue(newValues.length > 0 ? newValues : []);
  }

  private navigateOptions(direction: 1 | -1): void {
    const options = this.groupBy() ? this.flattenGroupedOptions() : this.filteredOptions();
    if (options.length === 0) {
      return;
    }

    const currentId = this.activeOptionId();
    let currentIndex = options.findIndex((opt) => opt.id === currentId);

    if (currentIndex === -1) {
      currentIndex = direction === 1 ? -1 : options.length;
    }

    let nextIndex = currentIndex + direction;

    // Wrap around
    if (nextIndex < 0) {
      nextIndex = options.length - 1;
    } else if (nextIndex >= options.length) {
      nextIndex = 0;
    }

    // Skip disabled options
    const startIndex = nextIndex;
    let currentOption = options[nextIndex];
    while (currentOption?.disabled) {
      nextIndex += direction;
      if (nextIndex < 0) nextIndex = options.length - 1;
      else if (nextIndex >= options.length) nextIndex = 0;
      if (nextIndex === startIndex) return; // All disabled
      currentOption = options[nextIndex];
    }

    const targetOption = options[nextIndex];
    if (targetOption) {
      this.activeOptionId.set(targetOption.id);
    }
  }

  private navigateToFirst(): void {
    const options = this.groupBy() ? this.flattenGroupedOptions() : this.filteredOptions();
    const firstEnabled = options.find((opt) => !opt.disabled);
    if (firstEnabled) {
      this.activeOptionId.set(firstEnabled.id);
    }
  }

  private navigateToLast(): void {
    const options = this.groupBy() ? this.flattenGroupedOptions() : this.filteredOptions();
    const lastEnabled = [...options].reverse().find((opt) => !opt.disabled);
    if (lastEnabled) {
      this.activeOptionId.set(lastEnabled.id);
    }
  }

  private selectActiveOption(): void {
    const activeId = this.activeOptionId();
    if (!activeId) return;

    const options = this.groupBy() ? this.flattenGroupedOptions() : this.filteredOptions();
    const option = options.find((opt) => opt.id === activeId);

    if (option && !option.disabled) {
      this.selectOption(option.value);
    }
  }

  private flattenGroupedOptions(): ComDropdownProcessedOption<T>[] {
    return this.groupedOptions().flatMap((group) => group.options);
  }

  private typeAhead(char: string): void {
    // Simple type-ahead: find first option starting with the character
    const options = this.filteredOptions();
    const display = this.displayWith();
    const lowerChar = char.toLowerCase();

    const match = options.find((opt) => !opt.disabled && display(opt.value).toLowerCase().startsWith(lowerChar));

    if (match) {
      this.activeOptionId.set(match.id);
      if (!this.isOpen()) {
        this.selectOption(match.value);
      }
    }
  }

  private announce(message: string): void {
    this.liveAnnouncement.set(message);
    this.liveAnnouncer.announce(message, 'polite');
  }
}
