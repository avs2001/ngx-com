import {
  computed,
  contentChildren,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { ComAvatar } from './avatar.component';
import type { AvatarSize } from './avatar.variants';

/** Spacing between overlapping avatars, keyed by size. */
const AVATAR_GROUP_SPACING: Record<AvatarSize, string> = {
  xs: '-0.375rem',  // -6px, ~30% of 20px
  sm: '-0.5rem',    // -8px, ~29% of 28px
  md: '-0.625rem',  // -10px, ~28% of 36px
  lg: '-0.75rem',   // -12px, ~25% of 48px
  xl: '-1rem',      // -16px, ~25% of 64px
  '2xl': '-1.5rem', // -24px, ~25% of 96px
};

/** Ring width for visual separation, keyed by size. */
const AVATAR_GROUP_RING: Record<AvatarSize, string> = {
  xs: '1px',
  sm: '1.5px',
  md: '2px',
  lg: '2px',
  xl: '2px',
  '2xl': '3px',
};

/**
 * Avatar group directive — displays multiple avatars in an overlapping stack.
 *
 * Apply this directive to a container element with `com-avatar` children.
 * The directive handles negative spacing, ring styling for visual separation,
 * and optionally limits the visible avatars with an overflow indicator.
 *
 * **Note:** Child avatars should use `variant="outline"` for best visual results,
 * as this provides the ring that separates overlapping avatars. The directive
 * adds `ring-background` to ensure proper visual separation.
 *
 * @tokens `--color-background`, `--color-muted`, `--color-muted-foreground`
 *
 * @example Basic usage
 * ```html
 * <div comAvatarGroup>
 *   <com-avatar src="/photos/a.jpg" name="Alice" variant="outline" />
 *   <com-avatar src="/photos/b.jpg" name="Bob" variant="outline" />
 *   <com-avatar src="/photos/c.jpg" name="Carol" variant="outline" />
 * </div>
 * ```
 *
 * @example With max limit and overflow indicator
 * ```html
 * <div comAvatarGroup [max]="3">
 *   <com-avatar src="/photos/a.jpg" name="Alice" variant="outline" />
 *   <com-avatar src="/photos/b.jpg" name="Bob" variant="outline" />
 *   <com-avatar src="/photos/c.jpg" name="Carol" variant="outline" />
 *   <com-avatar src="/photos/d.jpg" name="Dave" variant="outline" />
 *   <com-avatar src="/photos/e.jpg" name="Eve" variant="outline" />
 * </div>
 * <!-- Shows 3 avatars + "+2" indicator -->
 * ```
 *
 * @example Different sizes
 * ```html
 * <div comAvatarGroup size="sm">
 *   <com-avatar name="A" size="sm" variant="outline" />
 *   <com-avatar name="B" size="sm" variant="outline" />
 * </div>
 *
 * <div comAvatarGroup size="lg">
 *   <com-avatar name="A" size="lg" variant="outline" />
 *   <com-avatar name="B" size="lg" variant="outline" />
 * </div>
 * ```
 *
 * @example Reversed stacking (last avatar on top)
 * ```html
 * <div comAvatarGroup [reverse]="true">
 *   <com-avatar name="First" variant="outline" />
 *   <com-avatar name="Second" variant="outline" />
 *   <com-avatar name="Third (on top)" variant="outline" />
 * </div>
 * ```
 */
@Directive({
  selector: '[comAvatarGroup]',
  exportAs: 'comAvatarGroup',
  host: {
    class: 'com-avatar-group inline-flex items-center',
    '[class.flex-row-reverse]': 'reverse()',
  },
})
export class ComAvatarGroup {
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  /** Query all child ComAvatar components. */
  private readonly avatars: Signal<readonly ComAvatar[]> = contentChildren(ComAvatar);

  /**
   * Size variant — should match child avatar sizes for proper spacing.
   * If not provided, defaults to 'md'.
   */
  readonly size: InputSignal<AvatarSize> = input<AvatarSize>('md');

  /**
   * Maximum number of avatars to display.
   * When exceeded, remaining avatars are hidden and an overflow indicator shows "+N".
   * Set to 0 or undefined for unlimited.
   */
  readonly max: InputSignal<number | undefined> = input<number>();

  /**
   * When true, reverses the stacking order (last avatar on top instead of first).
   * Also reverses the visual order via flex-row-reverse.
   */
  readonly reverse: InputSignal<boolean> = input<boolean>(false);

  /** Overflow element reference for cleanup. */
  private overflowElement: HTMLElement | null = null;

  /** Track the number of hidden avatars. */
  protected readonly overflowCount: WritableSignal<number> = signal(0);

  /** Whether to show the overflow indicator. */
  protected readonly showOverflow: Signal<boolean> = computed(() => this.overflowCount() > 0);

  constructor() {
    // Apply styling to avatars when they change
    effect(() => {
      const avatarList = this.avatars();
      const maxCount = this.max();
      const size = this.size();
      const isReverse = this.reverse();

      this.applyAvatarStyles(avatarList, maxCount, size, isReverse);
    });
  }

  /**
   * Applies overlapping styles to child avatars and manages visibility.
   */
  private applyAvatarStyles(
    avatars: readonly ComAvatar[],
    max: number | undefined,
    size: AvatarSize,
    reverse: boolean
  ): void {
    const spacing = AVATAR_GROUP_SPACING[size];
    const ringWidth = AVATAR_GROUP_RING[size];
    const total = avatars.length;
    const visibleCount = max && max > 0 ? Math.min(max, total) : total;
    const hiddenCount = total - visibleCount;

    this.overflowCount.set(hiddenCount);

    avatars.forEach((avatar, index) => {
      const hostEl = (avatar as unknown as { elementRef?: ElementRef })['elementRef']?.nativeElement
        ?? this.getAvatarElement(index);

      if (!hostEl) return;

      // Determine if this avatar should be visible
      const isVisible = index < visibleCount;

      // Apply visibility
      this.renderer.setStyle(hostEl, 'display', isVisible ? 'inline-flex' : 'none');

      if (!isVisible) return;

      // Apply negative margin for overlap (not on first visible item)
      if (index > 0) {
        const marginProp = reverse ? 'marginRight' : 'marginLeft';
        this.renderer.setStyle(hostEl, marginProp, spacing);
      }

      // Apply z-index for stacking (first on top by default, last on top if reverse)
      const zIndex = reverse ? index + 1 : total - index;
      this.renderer.setStyle(hostEl, 'zIndex', zIndex.toString());
      this.renderer.setStyle(hostEl, 'position', 'relative');

      // Add ring for visual separation
      this.renderer.setStyle(hostEl, 'boxShadow', `0 0 0 ${ringWidth} var(--color-background)`);
    });

    // Manage overflow indicator
    this.updateOverflowIndicator(hiddenCount, size, spacing, reverse, visibleCount);
  }

  /**
   * Gets the native element of an avatar by index.
   */
  private getAvatarElement(index: number): HTMLElement | null {
    const children = this.elementRef.nativeElement.querySelectorAll('com-avatar');
    return children[index] as HTMLElement | null;
  }

  /**
   * Creates or updates the overflow indicator element.
   */
  private updateOverflowIndicator(
    count: number,
    size: AvatarSize,
    spacing: string,
    reverse: boolean,
    _visibleCount: number
  ): void {
    if (count <= 0) {
      // Remove existing overflow element
      if (this.overflowElement) {
        this.renderer.removeChild(this.elementRef.nativeElement, this.overflowElement);
        this.overflowElement = null;
      }
      return;
    }

    // Create overflow element if it doesn't exist
    let el = this.overflowElement;
    if (!el) {
      el = this.renderer.createElement('span') as HTMLElement;
      this.renderer.addClass(el, 'com-avatar-group__overflow');
      this.overflowElement = el;
    }

    // Apply size-specific classes and styles
    const sizeClasses = this.getOverflowSizeClasses(size);
    const ringWidth = AVATAR_GROUP_RING[size];

    // Reset classes and reapply
    el.className = 'com-avatar-group__overflow';
    sizeClasses.forEach(cls => this.renderer.addClass(el, cls));

    // Apply base styles
    this.renderer.setStyle(el, 'display', 'inline-flex');
    this.renderer.setStyle(el, 'alignItems', 'center');
    this.renderer.setStyle(el, 'justifyContent', 'center');
    this.renderer.setStyle(el, 'borderRadius', '9999px');
    this.renderer.setStyle(el, 'backgroundColor', 'var(--color-muted)');
    this.renderer.setStyle(el, 'color', 'var(--color-muted-foreground)');
    this.renderer.setStyle(el, 'fontWeight', '500');
    this.renderer.setStyle(el, 'position', 'relative');
    this.renderer.setStyle(el, 'zIndex', '0');
    this.renderer.setStyle(el, 'boxShadow', `0 0 0 ${ringWidth} var(--color-background)`);
    this.renderer.setStyle(el, 'userSelect', 'none');

    // Apply negative margin
    const marginProp = reverse ? 'marginRight' : 'marginLeft';
    this.renderer.setStyle(el, marginProp, spacing);

    // Update text content
    el.textContent = `+${count}`;

    // Ensure it's in the DOM at the correct position
    if (!el.parentElement) {
      if (reverse) {
        // Insert at the beginning for reverse mode
        this.renderer.insertBefore(
          this.elementRef.nativeElement,
          el,
          this.elementRef.nativeElement.firstChild
        );
      } else {
        // Append at the end for normal mode
        this.renderer.appendChild(this.elementRef.nativeElement, el);
      }
    }
  }

  /**
   * Returns size-specific classes for the overflow indicator.
   */
  private getOverflowSizeClasses(size: AvatarSize): string[] {
    const sizeMap: Record<AvatarSize, string[]> = {
      xs: ['size-5', 'text-[0.5rem]'],
      sm: ['size-7', 'text-xs'],
      md: ['size-9', 'text-sm'],
      lg: ['size-12', 'text-base'],
      xl: ['size-16', 'text-xl'],
      '2xl': ['size-24', 'text-3xl'],
    };
    return sizeMap[size];
  }
}
