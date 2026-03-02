import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ComAvatar, ComAvatarCustom } from 'ngx-com/components/avatar';
import type { AvatarColor, AvatarSize } from 'ngx-com/components/avatar';
import { ComIcon } from 'ngx-com/components/icon';
import type { IconSize } from 'ngx-com/components/icon';
import {
  ComItemLeading,
  ComItemTitle,
  ComItemSuffix,
  ComItemDescription,
  ComItemTrailing,
} from './item.directives';
import {
  itemVariants,
  ITEM_TITLE_CLASSES,
  ITEM_DESCRIPTION_CLASSES,
  ITEM_AVATAR_SIZES,
  ITEM_ICON_SIZES,
} from './item.variants';
import type { ItemSize, ItemDensity } from './item.variants';

/**
 * Item component — a universal compound display element that shows a leading
 * visual alongside a title, an optional description, and optional trailing content.
 *
 * Works in all these contexts:
 * - List rows (device lists, settings menus, search results)
 * - Page/section headers
 * - Dropdown menu items
 * - Table cells
 * - Card headers
 * - Nav items
 *
 * **Anatomy:**
 * ```
 * ┌─────────────────────────────────────────────────────────┐
 * │  ┌───────┐                                              │
 * │  │com-   │  Title text  ·  [inline suffix]   [TRAILING] │
 * │  │avatar │  Description text (secondary)                │
 * │  └───────┘                                              │
 * └─────────────────────────────────────────────────────────┘
 * ```
 *
 * Five content zones:
 * 1. **Leading visual** — optional. Default: `com-avatar` with `shape="rounded"` + `variant="soft"`.
 *    Override via `comItemLeading` directive.
 * 2. **Title** — primary text. Required (via input or projection).
 * 3. **Inline suffix** — same line as title, after it. For badges, tags, status dots.
 * 4. **Description** — secondary text below title. Optional.
 * 5. **Trailing** — far-right aligned. Actions, chevrons, timestamps.
 *
 * @tokens `--color-primary-subtle`, `--color-muted`, `--color-muted-foreground`,
 *         `--color-foreground`, `--color-ring`
 *
 * @example Simplest — text only, no icon
 * ```html
 * <com-item title="Select all" />
 * ```
 *
 * @example Icon + title + description (most common)
 * ```html
 * <com-item
 *   title="Dexcom G7"
 *   description="109123c2d2194bffe519b03ceb51730d5064f9de46c54c4e..."
 *   icon="smartphone"
 * />
 * ```
 *
 * @example Icon with different color
 * ```html
 * <com-item title="Warning detected" icon="alert-triangle" iconColor="warn" />
 * <com-item title="Active" icon="check-circle" iconColor="accent" />
 * ```
 *
 * @example Page header with badge suffix (size lg)
 * ```html
 * <com-item
 *   title="My BP datasource"
 *   description="View and manage datasource configuration"
 *   size="lg"
 * >
 *   <ng-template comItemSuffix>
 *     <span class="inline-flex items-center gap-1 rounded-pill border border-primary/30 bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
 *       <com-icon name="bluetooth" size="xs" /> Bluetooth
 *     </span>
 *   </ng-template>
 * </com-item>
 * ```
 *
 * @example Custom leading — user avatar with image
 * ```html
 * <com-item title="Jane Doe" description="jane@example.com">
 *   <ng-template comItemLeading>
 *     <com-avatar src="/photos/jane.jpg" name="Jane Doe" size="sm" />
 *   </ng-template>
 * </com-item>
 * ```
 *
 * @example Interactive list item with trailing chevron
 * ```html
 * <com-item
 *   title="Bluetooth Settings"
 *   description="Manage paired devices"
 *   icon="bluetooth"
 *   [interactive]="true"
 *   (click)="openSettings()"
 * >
 *   <ng-template comItemTrailing>
 *     <com-icon name="chevron-right" size="sm" color="muted" />
 *   </ng-template>
 * </com-item>
 * ```
 *
 * @example Compact density — dropdown menu
 * ```html
 * @for (option of options; track option.value) {
 *   <com-item
 *     [title]="option.label"
 *     [icon]="option.icon"
 *     density="compact"
 *     [interactive]="true"
 *     [active]="option.value === selected()"
 *     (click)="select(option)"
 *   />
 * }
 * ```
 *
 * @example Rich description via projection
 * ```html
 * <com-item title="API Key" icon="key">
 *   <ng-template comItemDescription>
 *     <code class="text-xs font-mono text-muted-foreground">sk-abc...xyz</code>
 *     <span class="text-xs text-muted-foreground"> · Created 3 days ago</span>
 *   </ng-template>
 *   <ng-template comItemTrailing>
 *     <button class="text-sm text-primary hover:text-primary-hover">Revoke</button>
 *   </ng-template>
 * </com-item>
 * ```
 *
 * @example Disabled
 * ```html
 * <com-item
 *   title="Enterprise Features"
 *   description="Available on Enterprise plan"
 *   icon="crown"
 *   [disabled]="true"
 * />
 * ```
 */
@Component({
  selector: 'com-item',
  exportAs: 'comItem',
  template: `
    <!-- Leading visual zone -->
    @if (leadingDirective(); as leading) {
      <ng-container [ngTemplateOutlet]="leading.templateRef" />
    } @else if (icon()) {
      <com-avatar
        [size]="avatarSize()"
        shape="rounded"
        variant="soft"
        [color]="resolvedIconColor()"
      >
        <ng-template comAvatarCustom>
          <com-icon [name]="icon()" [size]="iconSize()" />
        </ng-template>
      </com-avatar>
    }

    <!-- Text zone -->
    <div class="flex min-w-0 flex-1 flex-col justify-center">
      <!-- Title row -->
      <div class="flex items-center gap-1.5">
        @if (titleDirective(); as titleTpl) {
          <ng-container [ngTemplateOutlet]="titleTpl.templateRef" />
        } @else if (title()) {
          <span
            class="text-foreground"
            [class]="titleClasses()"
            [class.truncate]="truncate()"
          >
            {{ title() }}
          </span>
        }
        @if (suffixDirective(); as suffix) {
          <ng-container [ngTemplateOutlet]="suffix.templateRef" />
        }
      </div>

      <!-- Description row -->
      @if (descriptionDirective(); as descTpl) {
        <ng-container [ngTemplateOutlet]="descTpl.templateRef" />
      } @else if (description()) {
        <span
          class="text-muted-foreground"
          [class]="descriptionClasses()"
          [class.truncate]="truncate()"
        >
          {{ description() }}
        </span>
      }
    </div>

    <!-- Trailing zone -->
    @if (trailingDirective(); as trailing) {
      <div class="flex shrink-0 items-center">
        <ng-container [ngTemplateOutlet]="trailing.templateRef" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgTemplateOutlet,
    ComAvatar,
    ComAvatarCustom,
    ComIcon,
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': 'interactive() ? "button" : null',
    '[attr.tabindex]': 'interactive() && !disabled() ? 0 : null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-label]': 'title() || null',
    '(keydown.enter)': 'onKeyboardActivate($event)',
    '(keydown.space)': 'onKeyboardActivate($event)',
  },
})
export class ComItem {
  // ─── Content Inputs ───

  /** Primary text. Required unless using comItemTitle directive. */
  readonly title: InputSignal<string | undefined> = input<string>();

  /** Secondary text below the title. */
  readonly description: InputSignal<string | undefined> = input<string>();

  /** Lucide icon name — renders inside a com-avatar container. */
  readonly icon: InputSignal<string | undefined> = input<string>();

  /** Color variant passed to the leading com-avatar. */
  readonly iconColor: InputSignal<AvatarColor> = input<AvatarColor>('primary');

  // ─── CVA Variant Inputs ───

  /** Size variant affecting typography and spacing. */
  readonly size: InputSignal<ItemSize> = input<ItemSize>('md');

  /** Density variant affecting vertical padding. */
  readonly density: InputSignal<ItemDensity> = input<ItemDensity>('default');

  /** Enables hover/active/focus states. */
  readonly interactive: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Shows selected/active highlight. */
  readonly active: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Dims and disables pointer events. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Truncates title and description text. */
  readonly truncate: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  });

  // ─── Content Projection Queries ───

  protected readonly leadingDirective: Signal<ComItemLeading | undefined> =
    contentChild(ComItemLeading);

  protected readonly titleDirective: Signal<ComItemTitle | undefined> =
    contentChild(ComItemTitle);

  protected readonly suffixDirective: Signal<ComItemSuffix | undefined> =
    contentChild(ComItemSuffix);

  protected readonly descriptionDirective: Signal<ComItemDescription | undefined> =
    contentChild(ComItemDescription);

  protected readonly trailingDirective: Signal<ComItemTrailing | undefined> =
    contentChild(ComItemTrailing);

  // ─── Computed Values ───

  /** Resolved icon color (handles 'auto' → 'primary' for items since there's no name). */
  protected readonly resolvedIconColor: Signal<AvatarColor> = computed(() => {
    const color = this.iconColor();
    // For items, 'auto' should default to 'primary' since there's no name to hash
    return color === 'auto' ? 'primary' : color;
  });

  /** Avatar size mapped from item size. */
  protected readonly avatarSize: Signal<AvatarSize> = computed(
    () => ITEM_AVATAR_SIZES[this.size()]
  );

  /** Icon size mapped from item size. */
  protected readonly iconSize: Signal<IconSize> = computed(
    () => ITEM_ICON_SIZES[this.size()]
  );

  /** Title typography classes based on size. */
  protected readonly titleClasses: Signal<string> = computed(
    () => ITEM_TITLE_CLASSES[this.size()]
  );

  /** Description typography classes based on size. */
  protected readonly descriptionClasses: Signal<string> = computed(
    () => ITEM_DESCRIPTION_CLASSES[this.size()]
  );

  /** Host element classes from CVA. */
  protected readonly hostClasses: Signal<string> = computed(() =>
    itemVariants({
      size: this.size(),
      density: this.density(),
      interactive: this.interactive(),
      active: this.active(),
      disabled: this.disabled(),
    })
  );

  // ─── Keyboard Accessibility ───

  protected onKeyboardActivate(event: Event): void {
    if (this.interactive() && !this.disabled()) {
      event.preventDefault();
      (event.target as HTMLElement).click();
    }
  }
}
