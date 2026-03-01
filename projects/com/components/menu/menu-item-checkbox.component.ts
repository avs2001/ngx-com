import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import type { InputSignalWithTransform, ModelSignal, Signal, WritableSignal } from '@angular/core';
import { MenuItemBase } from './menu.component';
import { MENU_REF } from './menu-tokens';
import { menuCheckIndicatorVariants, menuItemVariants, type MenuSize } from './menu.variants';
import { mergeClasses } from './menu.utils';

/**
 * Checkbox menu item component with toggleable checked state.
 *
 * @tokens `--color-popover-foreground`, `--color-foreground`, `--color-muted`
 *
 * @example
 * ```html
 * <button comMenuItemCheckbox [(checked)]="showSidebar">Sidebar</button>
 * ```
 */
@Component({
  selector: '[comMenuItemCheckbox]',
  exportAs: 'comMenuItemCheckbox',
  template: `
    <span [class]="indicatorClasses()">
      @if (checked()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-full h-full"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      }
    </span>
    <ng-content />
  `,
  providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => MenuItemCheckboxComponent) }],
  host: {
    '[class]': 'itemClasses()',
    '[attr.role]': '"menuitemcheckbox"',
    '[attr.tabindex]': '-1',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'menuItemDisabled() || null',
    '[attr.disabled]': 'menuItemDisabled() || null',
    '(click)': 'toggle($event)',
    '(keydown.enter)': 'toggle($event)',
    '(keydown.space)': 'toggle($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemCheckboxComponent extends MenuItemBase {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menu = inject(MENU_REF, { optional: true });

  // ─── Inputs ───

  /** Disables the item. */
  readonly menuItemDisabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  /** Two-way bindable checked state. */
  readonly checked: ModelSignal<boolean> = model<boolean>(false);

  // ─── Internal State ───

  private readonly isFocused: WritableSignal<boolean> = signal(false);

  // ─── Computed ───

  private readonly size: Signal<MenuSize> = computed(() => this.menu?.menuSize() ?? 'md');

  protected readonly itemClasses: Signal<string> = computed(() =>
    mergeClasses(
      menuItemVariants({
        size: this.size(),
        focused: this.isFocused(),
        disabled: this.menuItemDisabled(),
      }),
    ),
  );

  protected readonly indicatorClasses: Signal<string> = computed(() =>
    mergeClasses(menuCheckIndicatorVariants({ size: this.size() })),
  );

  // ─── FocusableOption Implementation ───

  get disabled(): boolean {
    return this.menuItemDisabled();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
    this.isFocused.set(true);
  }

  getLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  // ─── Event Handlers ───

  protected toggle(event: Event): void {
    if (this.menuItemDisabled()) return;

    event.preventDefault();
    this.checked.update((c) => !c);
  }

  protected onMouseEnter(): void {
    if (this.menuItemDisabled()) return;
    this.focus();
  }

  protected onMouseLeave(): void {
    this.isFocused.set(false);
  }
}
