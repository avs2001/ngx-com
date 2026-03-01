import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { InputSignalWithTransform, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import { MenuItemBase } from './menu.component';
import { MENU_REF, ROOT_MENU_TRIGGER } from './menu-tokens';
import { menuItemVariants, type MenuSize } from './menu.variants';
import { mergeClasses } from './menu.utils';

/**
 * Menu item directive for actionable menu items.
 * Applied to buttons, anchors, or any element that should be selectable.
 *
 * @tokens `--color-popover-foreground`, `--color-foreground`, `--color-muted`, `--color-warn`, `--color-warn-subtle`
 *
 * @example
 * ```html
 * <button comMenuItem (menuItemSelect)="onEdit()">Edit</button>
 * <button comMenuItem [menuItemDisabled]="true">Disabled</button>
 * <button comMenuItem destructive>Delete</button>
 * ```
 */
@Directive({
  selector: '[comMenuItem]',
  exportAs: 'comMenuItem',
  providers: [{ provide: MenuItemBase, useExisting: forwardRef(() => MenuItemDirective) }],
  host: {
    '[class]': 'itemClasses()',
    '[attr.role]': '"menuitem"',
    '[attr.tabindex]': '-1',
    '[attr.aria-disabled]': 'menuItemDisabled() || null',
    '[attr.disabled]': 'menuItemDisabled() || null',
    '(click)': 'onAction($event)',
    '(keydown.enter)': 'onAction($event)',
    '(keydown.space)': 'onAction($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class MenuItemDirective extends MenuItemBase {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menu = inject(MENU_REF, { optional: true });
  private readonly rootTrigger = inject(ROOT_MENU_TRIGGER, { optional: true });

  // ─── Inputs ───

  /** Disables the item. */
  readonly menuItemDisabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  /** Marks item as destructive (delete, remove actions). */
  readonly destructive: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  // ─── Outputs ───

  /** Emitted when item is activated. */
  readonly menuItemSelect: OutputEmitterRef<void> = output<void>();

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
        destructive: this.destructive(),
      }),
    ),
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

  protected onAction(event: Event): void {
    if (this.menuItemDisabled()) return;

    event.preventDefault();
    this.menuItemSelect.emit();

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
