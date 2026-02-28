import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { tabItemVariants } from './tabs.variants';
import type { TabVariant, TabSize, TabColor } from './tabs.variants';
import { mergeClasses } from './tabs.utils';

/**
 * Tab link directive for route-driven navigation tabs.
 *
 * Applied to anchor or button elements inside `ui-tab-nav-bar`.
 * Automatically detects active state from `routerLinkActive` if present.
 *
 * @example Basic usage with router
 * ```html
 * <nav ui-tab-nav-bar>
 *   <a uiTabLink routerLink="overview" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">
 *     Overview
 *   </a>
 *   <a uiTabLink routerLink="settings" routerLinkActive #rla2="routerLinkActive" [active]="rla2.isActive">
 *     Settings
 *   </a>
 * </nav>
 * ```
 *
 * @example Disabled link
 * ```html
 * <a uiTabLink [disabled]="true">Coming Soon</a>
 * ```
 */
@Directive({
  selector: 'a[uiTabLink], button[uiTabLink]',
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
  private readonly routerLinkActive = inject(RouterLinkActive, { optional: true, self: true });
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

  // ─── Computed ───

  /**
   * Resolved active state — uses routerLinkActive if available, otherwise input.
   */
  readonly isActive: Signal<boolean> = computed(() => {
    if (this.routerLinkActive) {
      return this.routerLinkActive.isActive;
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
