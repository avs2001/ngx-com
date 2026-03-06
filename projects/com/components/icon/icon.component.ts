import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';
import { ComIconRegistry } from './icon.registry';
import { iconVariants, ICON_SIZE_PX, type IconColor, type IconSize } from './icon.variants';

/**
 * Converts a kebab-case or space-separated icon name to PascalCase.
 *
 * Uses the same regex as lucide-angular for consistency.
 */
function toPascalCase(str: string): string {
  return str.replace(/(\w)([a-z0-9]*)(_|-|\s*)/g, (_g0, g1: string, g2: string) =>
    g1.toUpperCase() + g2.toLowerCase()
  );
}

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
    @if (resolvedIcon(); as iconData) {
      <lucide-icon
        [img]="iconData"
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
  private readonly registry = inject(ComIconRegistry);

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

  /** Resolves icon data from either `img` (direct ref) or `name` (registry lookup). */
  protected readonly resolvedIcon: Signal<LucideIconData | undefined> = computed(() => {
    const imgData = this.img();
    if (imgData) return imgData;

    const iconName = this.name();
    if (iconName) return this.registry.get(toPascalCase(iconName)) ?? undefined;

    return undefined;
  });

  protected readonly sizeInPx: Signal<number> = computed(() => ICON_SIZE_PX[this.size()]);
  protected readonly hostClasses: Signal<string> = computed(() =>
    iconVariants({ color: this.color(), size: this.size() })
  );
}
