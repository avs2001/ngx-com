import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal, WritableSignal } from '@angular/core';
import { MenuItemBase } from './menu.component';
import { MENU_REF, ROOT_MENU_TRIGGER } from './menu-tokens';
import { MenuGroupRef } from './menu-group.directive';
import { menuCheckIndicatorVariants, menuItemVariants, type MenuSize } from './menu.variants';
import { mergeClasses } from './menu.utils';

/**
 * Radio menu item component for single-selection within a group.
 *
 * @tokens `--color-popover-foreground`, `--color-foreground`, `--color-muted`
 *
 * @example
 * ```html
 * <div comMenuGroup [(groupValue)]="sortField">
 *   <button comMenuItemRadio value="name">Name</button>
 *   <button comMenuItemRadio value="date">Date</button>
 * </div>
 * ```
 */
@Component({
  selector: '[comMenuItemRadio]',
  exportAs: 'comMenuItemRadio',
  template: `
    <span [class]="indicatorClasses()">
      @if (isChecked()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-full h-full"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="6" />
        </svg>
      }
    </span>
    <ng-content />
  `,
  providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => MenuItemRadioComponent) }],
  host: {
    '[class]': 'itemClasses()',
    '[attr.role]': '"menuitemradio"',
    '[attr.tabindex]': '-1',
    '[attr.aria-checked]': 'isChecked()',
    '[attr.aria-disabled]': 'menuItemDisabled() || null',
    '[attr.disabled]': 'menuItemDisabled() || null',
    '(click)': 'select($event)',
    '(keydown.enter)': 'select($event)',
    '(keydown.space)': 'select($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemRadioComponent extends MenuItemBase {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menu = inject(MENU_REF, { optional: true });
  private readonly rootTrigger = inject(ROOT_MENU_TRIGGER, { optional: true });
  private readonly group = inject(MenuGroupRef, { optional: true });

  // ─── Inputs ───

  /** Disables the item. */
  readonly menuItemDisabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  /** The value this radio item represents. */
  readonly value: InputSignal<unknown> = input.required<unknown>();

  // ─── Internal State ───

  private readonly isFocused: WritableSignal<boolean> = signal(false);

  // ─── Computed ───

  private readonly size: Signal<MenuSize> = computed(() => this.menu?.menuSize() ?? 'md');

  /** Whether this radio item is currently selected. */
  readonly isChecked: Signal<boolean> = computed(() => this.group?.groupValue() === this.value());

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

  protected select(event: Event): void {
    if (this.menuItemDisabled()) return;

    event.preventDefault();
    this.group?.setGroupValue(this.value());

    if (this.rootTrigger?.menuCloseOnSelect()) {
      this.rootTrigger.close();
    }
  }

  protected onMouseEnter(): void {
    if (this.menuItemDisabled()) return;
    this.focus();
  }

  protected onMouseLeave(): void {
    this.isFocused.set(false);
  }
}
