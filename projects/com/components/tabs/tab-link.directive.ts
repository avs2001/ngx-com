import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLinkActive } from '@angular/router';
import { startWith } from 'rxjs';
import { tabItemVariants } from './tabs.variants';
import type { TabVariant, TabSize, TabColor } from './tabs.variants';
import { mergeClasses } from './tabs.utils';

/**
 * Tab link directive for route-driven navigation tabs.
 *
 * Applied to anchor or button elements inside `com-tab-nav-bar`.
 * Automatically detects active state from `routerLinkActive` if present.
 *
 * @example Basic usage with router
 * ```html
 * <nav com-tab-nav-bar>
 *   <a comTabLink routerLink="overview" routerLinkActive>Overview</a>
 *   <a comTabLink routerLink="settings" routerLinkActive>Settings</a>
 * </nav>
 * ```
 *
 * @example Manual active state control
 * ```html
 * <a comTabLink [active]="isOverviewActive">Overview</a>
 * ```
 *
 * @example Disabled link
 * ```html
 * <a comTabLink [disabled]="true">Coming Soon</a>
 * ```
 */
@Directive({
  selector: 'a[comTabLink], button[comTabLink]',
  host: {
    role: 'tab',
    '[class]': 'computedClass()',
    '[attr.aria-selected]': 'isActive()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
    '[tabindex]': 'isActive() ? 0 : -1',
  },
})
export class TabLinkDirective {
  private readonly routerLinkActive: RouterLinkActive | null = inject(RouterLinkActive, { optional: true, self: true });
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  // ─── Inputs ───

  /** Manual active state control. */
  readonly active: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Prevents interaction when true. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Visual variant (inherited from parent nav bar or set directly). */
  readonly variant: InputSignal<TabVariant> = input<TabVariant>('underline');

  /** Size (inherited from parent nav bar or set directly). */
  readonly size: InputSignal<TabSize> = input<TabSize>('md');

  /** Color (inherited from parent nav bar or set directly). */
  readonly color: InputSignal<TabColor> = input<TabColor>('primary');

  /** Additional CSS classes. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  // ─── Private ───

  /**
   * Reactive signal from RouterLinkActive.isActiveChange.
   * Converts the EventEmitter to a signal for proper reactivity.
   */
  private readonly routerLinkActiveState: Signal<boolean> | null = this.routerLinkActive
    ? toSignal(
        this.routerLinkActive.isActiveChange.pipe(startWith(this.routerLinkActive.isActive)),
        { initialValue: this.routerLinkActive.isActive }
      )
    : null;

  // ─── Computed ───

  /**
   * Resolved active state — uses routerLinkActive if available, otherwise input.
   */
  readonly isActive: Signal<boolean> = computed(() => {
    if (this.routerLinkActiveState) {
      return this.routerLinkActiveState();
    }
    return this.active();
  });

  /** Computed host class from CVA + consumer overrides. */
  readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      tabItemVariants({
        variant: this.variant(),
        size: this.size(),
        color: this.color(),
        active: this.isActive(),
      }),
      this.disabled() && 'pointer-events-none',
      this.userClass()
    )
  );

  /** Focus this tab link element. */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
