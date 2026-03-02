import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';
import { iconVariants, ICON_SIZE_PX, type IconColor, type IconSize } from './icon.variants';

/**
 * Icon component — renders Lucide icons with CVA-powered color and size variants.
 *
 * Icons inherit `currentColor` by default, making them automatically match
 * surrounding text. Use the `color` input for semantic color variants that
 * respond to theme changes.
 *
 * @tokens `--color-primary`, `--color-accent`, `--color-warn`, `--color-success`,
 *         `--color-muted-foreground`, `--color-disabled-foreground`,
 *         `--size-icon-xs`, `--size-icon-sm`, `--size-icon-md`,
 *         `--size-icon-lg`, `--size-icon-xl`, `--size-icon-2xl`
 *
 * @example Basic usage (requires icon registration via provideComIcons)
 * ```html
 * <com-icon name="star" />
 * <com-icon name="check" color="success" size="sm" />
 * <com-icon name="alert-triangle" color="warn" />
 * ```
 *
 * @example Direct icon reference (no provider needed)
 * ```html
 * <com-icon [img]="StarIcon" color="accent" size="2xl" />
 * ```
 *
 * @example Accessible icon (not decorative)
 * ```html
 * <com-icon name="check" color="success" ariaLabel="Task completed" />
 * ```
 *
 * @example Inline with text (inherits parent color)
 * ```html
 * <span class="text-primary">
 *   <com-icon name="star" size="sm" /> Favorite
 * </span>
 * ```
 */
@Component({
  selector: 'com-icon',
  template: `
    @if (img(); as imgData) {
      <lucide-icon
        [img]="imgData"
        [size]="sizeInPx()"
        [strokeWidth]="strokeWidth()"
        [absoluteStrokeWidth]="absoluteStrokeWidth()"
        color="currentColor"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-hidden]="ariaLabel() ? null : 'true'"
      />
    } @else if (name(); as iconName) {
      <lucide-icon
        [name]="iconName"
        [size]="sizeInPx()"
        [strokeWidth]="strokeWidth()"
        [absoluteStrokeWidth]="absoluteStrokeWidth()"
        color="currentColor"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-hidden]="ariaLabel() ? null : 'true'"
      />
    }
  `,
  host: {
    '[class]': 'hostClasses()',
  },
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ComIcon {
  /** Icon name in kebab-case (e.g. 'chevron-right'). Requires provideComIcons registration. */
  readonly name: InputSignal<string | undefined> = input<string>();

  /** Direct Lucide icon reference. Takes precedence over `name`. */
  readonly img: InputSignal<LucideIconData | undefined> = input<LucideIconData>();

  /** Semantic color variant. Defaults to 'current' (inherits from parent). */
  readonly color: InputSignal<IconColor> = input<IconColor>('current');

  /** Size variant. Defaults to 'lg' (24px). */
  readonly size: InputSignal<IconSize> = input<IconSize>('lg');

  /** Stroke width. Defaults to 2. */
  readonly strokeWidth: InputSignal<number> = input<number>(2);

  /** When true, stroke width doesn't scale with icon size. */
  readonly absoluteStrokeWidth: InputSignal<boolean> = input<boolean>(false);

  /** Applies aria-label and removes aria-hidden. Use for meaningful icons. */
  readonly ariaLabel: InputSignal<string | undefined> = input<string>();

  protected readonly sizeInPx: Signal<number> = computed(() => ICON_SIZE_PX[this.size()]);
  protected readonly hostClasses: Signal<string> = computed(() =>
    iconVariants({ color: this.color(), size: this.size() })
  );
}
