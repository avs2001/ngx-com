import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, InputSignal, OutputEmitterRef, WritableSignal, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { dropdownSearchVariants } from './dropdown.variants';
import type { DropdownSize } from './dropdown.variants';
import { mergeClasses } from './dropdown.utils';

/**
 * Search input component for filtering dropdown options.
 * Includes debouncing for better performance.
 *
 * @example
 * ```html
 * <com-dropdown-search
 *   [placeholder]="'Search...'"
 *   [debounceTime]="300"
 *   (searchChange)="onSearch($event)"
 * />
 * ```
 */
@Component({
  selector: 'com-dropdown-search',
  exportAs: 'comDropdownSearch',
  template: `
    <div class="relative flex items-center">
      <!-- Search icon -->
      <svg
        class="pointer-events-none absolute left-3 h-4 w-4 text-surface-400 dark:text-surface-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <!-- Input -->
      <input
        #searchInput
        type="text"
        [class]="searchClasses()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        [attr.autocomplete]="'off'"
        [attr.autocapitalize]="'off'"
        [attr.autocorrect]="'off'"
        [attr.spellcheck]="'false'"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
      />

      <!-- Clear button -->
      @if (showClear()) {
        <button
          type="button"
          class="absolute right-3 flex h-4 w-4 items-center justify-center rounded-sm text-surface-400 opacity-70 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:text-surface-500"
          [attr.aria-label]="'Clear search'"
          (click)="clearSearch()"
        >
          <svg
            class="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-dropdown-search-host block',
    '[attr.comDropdownSearch]': 'true',
  },
})
export class ComDropdownSearch implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  /** Reference to the input element. */
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  /** Subject for debounced search. */
  private readonly searchSubject = new Subject<string>();

  /** Current internal search value. */
  private readonly internalValue: WritableSignal<string> = signal('');

  /** Placeholder text for the search input. */
  readonly placeholder: InputSignal<string> = input<string>('Search...');

  /** Aria label for accessibility. */
  readonly ariaLabel: InputSignal<string> = input<string>('Search options');

  /** Whether the search input is disabled. */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Debounce time in milliseconds. */
  readonly debounceMs: InputSignal<number> = input<number>(300);

  /** Size variant for styling. */
  readonly size: InputSignal<DropdownSize> = input<DropdownSize>('default');

  /** Additional CSS classes to apply. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** Emitted when the search value changes (after debounce). */
  readonly searchChange: OutputEmitterRef<string> = output<string>();

  /** Emitted when a navigation key is pressed (for focus management). */
  readonly keyNav: OutputEmitterRef<KeyboardEvent> = output<KeyboardEvent>();

  /** Whether to show the clear button. */
  protected readonly showClear: Signal<boolean> = computed(() => this.internalValue().length > 0);

  /** Computed CSS classes for the search input. */
  protected readonly searchClasses: Signal<string> = computed(() => {
    const baseClasses = dropdownSearchVariants({ size: this.size() });
    // Add left padding for the search icon
    return mergeClasses(baseClasses, 'pl-9 pr-8', this.userClass());
  });

  ngOnInit(): void {
    // Set up debounced search
    this.searchSubject
      .pipe(
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.searchChange.emit(value);
      });
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.internalValue.set(value);
    this.searchSubject.next(value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Let parent handle navigation keys
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
      this.keyNav.emit(event);
    }
  }

  protected clearSearch(): void {
    this.internalValue.set('');
    this.searchSubject.next('');
    this.focus();
  }

  /** Focuses the search input. */
  focus(): void {
    this.inputRef()?.nativeElement.focus();
  }

  /** Gets the current search value. */
  getValue(): string {
    return this.internalValue();
  }

  /** Sets the search value programmatically. */
  setValue(value: string): void {
    this.internalValue.set(value);
    const inputEl = this.inputRef()?.nativeElement;
    if (inputEl) {
      inputEl.value = value;
    }
    this.searchSubject.next(value);
  }

  /** Clears the search input. */
  clear(): void {
    this.clearSearch();
  }
}
