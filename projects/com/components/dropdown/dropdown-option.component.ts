import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { Signal, InputSignal, OutputEmitterRef, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { dropdownOptionVariants } from './dropdown.variants';
import type { DropdownSize } from './dropdown.variants';
import type { ComDropdownOptionContext } from './dropdown.models';
import { mergeClasses } from './dropdown.utils';

/**
 * A single option in the dropdown list.
 * Implements CDK's Highlightable interface for keyboard navigation.
 *
 * @example
 * ```html
 * <com-dropdown-option
 *   [value]="user"
 *   [selected]="isSelected(user)"
 *   [disabled]="user.inactive"
 *   (select)="onSelect(user)"
 * />
 * ```
 */
@Component({
  selector: 'com-dropdown-option',
  exportAs: 'comDropdownOption',
  template: `
    <div
      #optionElement
      [class]="optionClasses()"
      [attr.role]="'option'"
      [attr.id]="id()"
      [attr.aria-selected]="selected()"
      [attr.aria-disabled]="disabled() || null"
      [attr.data-active]="active() || null"
      [attr.data-selected]="selected() || null"
      [attr.data-disabled]="disabled() || null"
      (click)="onOptionClick($event)"
      (mouseenter)="onMouseEnter()"
    >
      @if (optionTemplate()) {
        <ng-container
          [ngTemplateOutlet]="optionTemplate()!"
          [ngTemplateOutletContext]="templateContext()"
        />
      } @else {
        <span class="truncate">{{ displayText() }}</span>
        @if (selected()) {
          <svg
            class="ml-auto h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        }
      }
    </div>
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-dropdown-option-host block',
  },
})
export class ComDropdownOption<T> {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Reference to the option element for focus management. */
  private readonly optionRef = viewChild<ElementRef<HTMLElement>>('optionElement');

  /** The value this option represents. */
  readonly value: InputSignal<T> = input.required<T>();

  /** Display text for this option (when no template is provided). */
  readonly displayText: InputSignal<string> = input<string>('');

  /** Unique identifier for this option. */
  readonly id: InputSignal<string> = input.required<string>();

  /** Index of this option in the list. */
  readonly index: InputSignal<number> = input<number>(0);

  /** Whether this option is currently selected. */
  readonly selected: InputSignal<boolean> = input<boolean>(false);

  /** Whether this option is currently active (keyboard focused). */
  readonly active: InputSignal<boolean> = input<boolean>(false);

  /** Whether this option is disabled. */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Size variant for styling. */
  readonly size: InputSignal<DropdownSize> = input<DropdownSize>('default');

  /** Custom template for rendering the option content. */
  readonly optionTemplate: InputSignal<TemplateRef<ComDropdownOptionContext<T>> | null> =
    input<TemplateRef<ComDropdownOptionContext<T>> | null>(null);

  /** Additional CSS classes to apply. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** Emitted when the option is selected. */
  readonly select: OutputEmitterRef<T> = output<T>();

  /** Emitted when the mouse enters the option. */
  readonly hover: OutputEmitterRef<T> = output<T>();

  /** Computed option state for CVA styling. */
  protected readonly optionState: Signal<'default' | 'active' | 'selected' | 'selected-active' | 'disabled'> =
    computed(() => {
      if (this.disabled()) return 'disabled';
      if (this.selected() && this.active()) return 'selected-active';
      if (this.selected()) return 'selected';
      if (this.active()) return 'active';
      return 'default';
    });

  /** Computed CSS classes for the option. */
  protected readonly optionClasses: Signal<string> = computed(() => {
    const baseClasses = dropdownOptionVariants({
      size: this.size(),
      state: this.optionState(),
    });
    return mergeClasses(baseClasses, this.userClass());
  });

  /** Template context for custom option templates. */
  protected readonly templateContext: Signal<ComDropdownOptionContext<T>> = computed(() => ({
    $implicit: this.value(),
    index: this.index(),
    selected: this.selected(),
    active: this.active(),
    disabled: this.disabled(),
  }));

  protected onOptionClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.select.emit(this.value());
  }

  protected onMouseEnter(): void {
    if (!this.disabled()) {
      this.hover.emit(this.value());
    }
  }

  /** Gets the host element. */
  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /** Scrolls this option into view. */
  scrollIntoView(): void {
    this.optionRef()?.nativeElement.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }

  /** Focuses this option element. */
  focus(): void {
    this.optionRef()?.nativeElement.focus();
  }
}
