import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import type { Signal, InputSignal, OutputEmitterRef, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { dropdownTagVariants, dropdownTagRemoveVariants } from './dropdown.variants';
import type { DropdownSize } from './dropdown.variants';
import type { ComDropdownTagContext } from './dropdown.models';
import { mergeClasses } from './dropdown.utils';

/**
 * Tag component for displaying selected items in multi-select mode.
 * Includes a remove button for deselection.
 *
 * @example
 * ```html
 * <com-dropdown-tag
 *   [value]="user"
 *   [displayText]="user.name"
 *   (remove)="onRemove(user)"
 * />
 * ```
 */
@Component({
  selector: 'com-dropdown-tag',
  exportAs: 'comDropdownTag',
  template: `
    @if (tagTemplate()) {
      <ng-container
        [ngTemplateOutlet]="tagTemplate()!"
        [ngTemplateOutletContext]="templateContext()"
      />
    } @else {
      <span [class]="tagClasses()">
        <span class="truncate">{{ displayText() }}</span>
        @if (!disabled()) {
          <button
            type="button"
            [class]="removeClasses()"
            [attr.aria-label]="'Remove ' + displayText()"
            (click)="onRemove($event)"
            (keydown.enter)="onRemove($event)"
            (keydown.space)="onRemove($event)"
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
      </span>
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-dropdown-tag-host inline-flex',
  },
})
export class ComDropdownTag<T> {
  /** The value this tag represents. */
  readonly value: InputSignal<T> = input.required<T>();

  /** Display text for this tag. */
  readonly displayText: InputSignal<string> = input<string>('');

  /** Index of this tag in the list. */
  readonly index: InputSignal<number> = input<number>(0);

  /** Whether the tag (and its remove button) is disabled. */
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Size variant for styling. */
  readonly size: InputSignal<DropdownSize> = input<DropdownSize>('default');

  /** Tag variant for styling. */
  readonly variant: InputSignal<'default' | 'primary'> = input<'default' | 'primary'>('primary');

  /** Additional CSS classes for the tag. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** Custom template for rendering the tag. */
  readonly tagTemplate: InputSignal<TemplateRef<ComDropdownTagContext<T>> | null> =
    input<TemplateRef<ComDropdownTagContext<T>> | null>(null);

  /** Emitted when the remove button is clicked. */
  readonly remove: OutputEmitterRef<T> = output<T>();

  /** Computed CSS classes for the tag. */
  protected readonly tagClasses: Signal<string> = computed(() => {
    const baseClasses = dropdownTagVariants({
      size: this.size(),
      variant: this.variant(),
    });
    return mergeClasses(baseClasses, this.userClass());
  });

  /** Computed CSS classes for the remove button. */
  protected readonly removeClasses: Signal<string> = computed(() => {
    return dropdownTagRemoveVariants({ size: this.size() });
  });

  /** Template context for custom tag templates. */
  protected readonly templateContext: Signal<ComDropdownTagContext<T>> = computed(() => ({
    $implicit: this.value(),
    index: this.index(),
    remove: () => this.emitRemove(),
  }));

  protected onRemove(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled()) {
      this.emitRemove();
    }
  }

  private emitRemove(): void {
    this.remove.emit(this.value());
  }
}
