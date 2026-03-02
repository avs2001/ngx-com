import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  linkedSignal,
  output,
  ViewEncapsulation,
} from '@angular/core';
import type {
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ComIcon } from 'ngx-com/components/icon';
import { ComAvatarCustom } from './avatar-custom.directive';
import type { AvatarTemplateContext } from './avatar-custom.directive';
import {
  avatarVariants,
  avatarColorVariants,
  getInitials,
  resolveAutoColor,
  AVATAR_INITIALS_SIZES,
  AVATAR_OUTLINE_RING_SIZES,
} from './avatar.variants';
import type {
  AvatarSize,
  AvatarColor,
  AvatarShape,
  AvatarVariant,
  ResolvedAvatarColor,
} from './avatar.variants';

/** Image loading state. */
type ImageState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Avatar component — displays a user's profile image, initials, or a fallback icon.
 *
 * Handles the full lifecycle of image loading with a graceful fallback chain:
 * 1. Custom template (via `comAvatarCustom` directive) — if provided, always wins
 * 2. Image — if `src` is provided and loads successfully
 * 3. Initials — if `name` is provided, auto-generated from the name
 * 4. Default icon — generic user silhouette via `com-icon`
 *
 * **Note:** The default fallback icon requires the `User` icon from lucide-angular
 * to be registered via `provideComIcons({ User })` in your application config.
 *
 * @tokens `--color-primary`, `--color-primary-foreground`, `--color-primary-subtle`, `--color-primary-subtle-foreground`,
 *         `--color-accent`, `--color-accent-foreground`, `--color-accent-subtle`, `--color-accent-subtle-foreground`,
 *         `--color-warn`, `--color-warn-foreground`, `--color-warn-subtle`, `--color-warn-subtle-foreground`,
 *         `--color-muted`, `--color-muted-foreground`,
 *         `--color-border`, `--color-background`, `--color-foreground`, `--color-ring`
 *
 * @example Simple image avatar
 * ```html
 * <com-avatar src="/photos/jane.jpg" name="Jane Doe" />
 * ```
 *
 * @example Initials fallback (no image)
 * ```html
 * <com-avatar name="Jane Doe" />
 * <!-- renders "JD" with auto-computed background color -->
 * ```
 *
 * @example Explicit color and shape
 * ```html
 * <com-avatar name="John Smith" color="primary" variant="filled" />
 * <com-avatar name="Alice" color="accent" shape="rounded" />
 * ```
 *
 * @example Sizes — from badge to profile header
 * ```html
 * <!-- Tiny: inside a badge or inline with text -->
 * <com-avatar name="JD" size="xs" />
 *
 * <!-- Small: list items, comments -->
 * <com-avatar src="/photos/jane.jpg" name="Jane" size="sm" />
 *
 * <!-- Medium: default, cards -->
 * <com-avatar src="/photos/jane.jpg" name="Jane" />
 *
 * <!-- Large: profile sidebar -->
 * <com-avatar src="/photos/jane.jpg" name="Jane" size="lg" />
 *
 * <!-- Extra large: profile hero -->
 * <com-avatar src="/photos/jane.jpg" name="Jane" size="xl" />
 *
 * <!-- 2XL: full profile page header -->
 * <com-avatar src="/photos/jane.jpg" name="Jane" size="2xl" />
 * ```
 *
 * @example Default icon fallback (no name, no image)
 * ```html
 * <!-- Shows generic user icon -->
 * <com-avatar />
 * ```
 *
 * @example Interactive (clickable, for menus)
 * ```html
 * <com-avatar
 *   src="/photos/me.jpg"
 *   name="My Profile"
 *   [interactive]="true"
 *   (click)="openProfileMenu()"
 * />
 * ```
 *
 * @example With status indicator (composed externally)
 * ```html
 * <!-- The avatar itself doesn't own the status dot — the consumer composes it -->
 * <div class="relative inline-flex">
 *   <com-avatar src="/photos/jane.jpg" name="Jane" size="sm" />
 *   <span class="absolute bottom-0 right-0 size-2.5 rounded-full bg-success ring-2 ring-background"></span>
 * </div>
 * ```
 *
 * @example Custom template — company logo with fallback
 * ```html
 * <com-avatar name="Acme Corp" size="lg" color="primary">
 *   <ng-template comAvatarCustom let-initials="initials">
 *     <img src="/logos/acme.svg" class="size-full object-contain p-1" alt="Acme Corp" />
 *   </ng-template>
 * </com-avatar>
 * ```
 *
 * @example Custom template — emoji avatar
 * ```html
 * <com-avatar name="Bot" color="accent" variant="filled">
 *   <ng-template comAvatarCustom>
 *     <span class="text-lg">🤖</span>
 *   </ng-template>
 * </com-avatar>
 * ```
 *
 * @example Inline with text
 * ```html
 * <span class="inline-flex items-center gap-2">
 *   <com-avatar name="Jane Doe" size="xs" />
 *   <span class="text-sm">Jane Doe</span>
 * </span>
 * ```
 *
 * @example Avatar in a badge context
 * ```html
 * <!-- Works at xs/sm sizes without breaking layout -->
 * <div class="flex items-center gap-1.5 rounded-pill bg-muted px-2 py-0.5">
 *   <com-avatar name="Jane" size="xs" />
 *   <span class="text-xs">Jane Doe</span>
 *   <button class="text-muted-foreground hover:text-foreground">
 *     <com-icon name="x" size="xs" />
 *   </button>
 * </div>
 * ```
 *
 * @example Outline variant (good for overlapping stacks)
 * ```html
 * <div class="flex -space-x-2">
 *   <com-avatar src="/photos/a.jpg" name="Alice" size="sm" variant="outline" />
 *   <com-avatar src="/photos/b.jpg" name="Bob" size="sm" variant="outline" />
 *   <com-avatar src="/photos/c.jpg" name="Carol" size="sm" variant="outline" />
 *   <com-avatar name="+3" size="sm" variant="outline" color="muted" />
 * </div>
 * ```
 */
@Component({
  selector: 'com-avatar',
  exportAs: 'comAvatar',
  template: `
    <!-- Layer 1: Background content (initials, icon, or custom template) -->
    @if (customTemplate(); as template) {
      <!-- Custom template — full consumer control -->
      <ng-container
        [ngTemplateOutlet]="template.templateRef"
        [ngTemplateOutletContext]="templateContext()"
      />
    } @else if (computedInitials()) {
      <!-- Initials -->
      <span
        aria-hidden="true"
        class="font-medium leading-none"
        [class]="initialsSizeClass()"
      >
        {{ computedInitials() }}
      </span>
    } @else {
      <!-- Default icon fallback -->
      <com-icon name="user" [size]="iconSize()" aria-hidden="true" />
    }

    <!-- Layer 2: Image (overlays the fallback when loaded) -->
    @if (src() && !customTemplate()) {
      <img
        [src]="src()"
        [alt]="alt() || name() || 'Avatar'"
        class="absolute inset-0 size-full object-cover transition-opacity duration-200"
        [class.opacity-0]="imageState() !== 'loaded'"
        [class.opacity-100]="imageState() === 'loaded'"
        [style.border-radius]="'inherit'"
        (load)="onImageLoad()"
        (error)="onImageError()"
      />
    }

    <!-- Screen reader text -->
    <span class="sr-only">{{ alt() || name() || 'User avatar' }}</span>
  `,
  styles: `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet, ComIcon],
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': 'interactive() ? "button" : "img"',
    '[attr.tabindex]': 'interactive() ? 0 : null',
    '[attr.aria-label]': 'alt() || name() || "User avatar"',
  },
})
export class ComAvatar {
  /** Host element reference (used by ComAvatarGroup). */
  readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  // ─── Content ───

  /** Image URL for the avatar. */
  readonly src: InputSignal<string | undefined> = input<string>();

  /** Alt text for the image. Falls back to `name` if not provided. */
  readonly alt: InputSignal<string | undefined> = input<string>();

  /** User's display name — used to generate initials and as aria fallback. */
  readonly name: InputSignal<string | undefined> = input<string>();

  // ─── CVA Variants ───

  /** Size variant. */
  readonly size: InputSignal<AvatarSize> = input<AvatarSize>('md');

  /** Color variant. 'auto' deterministically picks a color based on the name. */
  readonly color: InputSignal<AvatarColor> = input<AvatarColor>('auto');

  /** Shape variant. */
  readonly shape: InputSignal<AvatarShape> = input<AvatarShape>('circle');

  /** Visual style variant. */
  readonly variant: InputSignal<AvatarVariant> = input<AvatarVariant>('soft');

  // ─── Behavior ───

  /** When true, renders as a button with hover/active states. */
  readonly interactive: InputSignal<boolean> = input<boolean>(false);

  // ─── Outputs ───

  /** Emits when the image fails to load (after fallback kicks in). */
  readonly imageError: OutputEmitterRef<void> = output<void>();

  /** Emits when the image loads successfully. */
  readonly imageLoaded: OutputEmitterRef<void> = output<void>();

  // ─── Template Projection ───

  /** Custom template for full control over avatar content. */
  readonly customTemplate: Signal<ComAvatarCustom | undefined> = contentChild(ComAvatarCustom);

  // ─── Internal State ───

  /**
   * Current image loading state.
   * Resets to 'loading' or 'idle' when `src` changes.
   */
  protected readonly imageState: WritableSignal<ImageState> = linkedSignal<string | undefined, ImageState>({
    source: this.src,
    computation: (src) => src ? 'loading' : 'idle',
  });

  // ─── Computed Values ───

  /** Resolved color (handles 'auto' based on name). */
  protected readonly resolvedColor: Signal<ResolvedAvatarColor> = computed(() =>
    resolveAutoColor(this.color(), this.name())
  );

  /** Computed initials from the name. */
  readonly computedInitials: Signal<string> = computed(() => {
    const name = this.name();
    return name ? getInitials(name) : '';
  });

  /** Template context for custom templates. */
  protected readonly templateContext: Signal<AvatarTemplateContext> = computed(() => ({
    $implicit: this.name(),
    initials: this.computedInitials(),
    size: this.size(),
  }));

  /** CSS classes for the host element. */
  protected readonly hostClasses: Signal<string> = computed(() => {
    const baseClasses = avatarVariants({
      size: this.size(),
      shape: this.shape(),
      interactive: this.interactive(),
    });

    const colorClasses = this.variant() === 'outline'
      ? avatarColorVariants({ variant: 'outline' })
      : avatarColorVariants({
          variant: this.variant(),
          color: this.resolvedColor(),
        });

    // Add outline ring size for outline variant
    const ringClass = this.variant() === 'outline'
      ? AVATAR_OUTLINE_RING_SIZES[this.size()]
      : '';

    return [baseClasses, colorClasses, ringClass].filter(Boolean).join(' ');
  });

  /** Font size class for initials. */
  protected readonly initialsSizeClass: Signal<string> = computed(
    () => AVATAR_INITIALS_SIZES[this.size()]
  );

  /** Icon size for the fallback icon (same as avatar size). */
  protected readonly iconSize: Signal<AvatarSize> = this.size;

  // ─── Event Handlers ───

  /** @internal Handles successful image load. */
  protected onImageLoad(): void {
    this.imageState.set('loaded');
    this.imageLoaded.emit();
  }

  /** @internal Handles image load error. */
  protected onImageError(): void {
    this.imageState.set('error');
    this.imageError.emit();
  }
}
