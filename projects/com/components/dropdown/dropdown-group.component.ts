import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import type { Signal, InputSignal, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { dropdownGroupVariants } from './dropdown.variants';
import type { DropdownSize } from './dropdown.variants';
import type { ComDropdownGroupContext } from './dropdown.models';
import { mergeClasses } from './dropdown.utils';

/**
 * Group header component for categorized dropdown options.
 *
 * @example
 * ```html
 * <com-dropdown-group
 *   [label]="'Fruits'"
 *   [count]="5"
 * />
 * ```
 */
@Component({
  selector: 'com-dropdown-group',
  exportAs: 'comDropdownGroup',
  template: `
    @if (groupTemplate()) {
      <ng-container
        [ngTemplateOutlet]="groupTemplate()!"
        [ngTemplateOutletContext]="templateContext()"
      />
    } @else {
      <div [class]="groupClasses()">
        <span>{{ label() }}</span>
        @if (showCount()) {
          <span class="ml-auto text-xs text-surface-400 dark:text-surface-500">
            ({{ count() }})
          </span>
        }
      </div>
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'com-dropdown-group-host block',
    role: 'presentation',
  },
})
export class ComDropdownGroup {
  /** The group label/key. */
  readonly label: InputSignal<string> = input.required<string>();

  /** The number of options in this group. */
  readonly count: InputSignal<number> = input<number>(0);

  /** Whether the group is expanded (for collapsible groups). */
  readonly expanded: InputSignal<boolean> = input<boolean>(true);

  /** Whether to show the count badge. */
  readonly showCount: InputSignal<boolean> = input<boolean>(false);

  /** Size variant for styling. */
  readonly size: InputSignal<DropdownSize> = input<DropdownSize>('default');

  /** Additional CSS classes for the group header. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  /** Custom template for rendering the group header. */
  readonly groupTemplate: InputSignal<TemplateRef<ComDropdownGroupContext> | null> =
    input<TemplateRef<ComDropdownGroupContext> | null>(null);

  /** Computed CSS classes for the group header. */
  protected readonly groupClasses: Signal<string> = computed(() => {
    const baseClasses = dropdownGroupVariants({ size: this.size() });
    return mergeClasses(baseClasses, this.userClass());
  });

  /** Template context for custom group templates. */
  protected readonly templateContext: Signal<ComDropdownGroupContext> = computed(() => ({
    $implicit: this.label(),
    expanded: this.expanded(),
    count: this.count(),
  }));
}
