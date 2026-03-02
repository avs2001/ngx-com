import { Directive, TemplateRef, inject } from '@angular/core';
import type { AvatarSize } from './avatar.variants';

/**
 * Template context provided to custom avatar templates.
 *
 * @example
 * ```html
 * <com-avatar name="Acme Corp" size="lg">
 *   <ng-template comAvatarCustom let-name let-initials="initials" let-size="size">
 *     <img src="/logos/acme.svg" class="size-full object-contain p-1" [alt]="name" />
 *   </ng-template>
 * </com-avatar>
 * ```
 */
export interface AvatarTemplateContext {
  /** The `name` input value (default for `let-name`). */
  $implicit: string | undefined;
  /** Computed initials from the name. */
  initials: string;
  /** Current size variant, allowing templates to adapt. */
  size: AvatarSize;
}

/**
 * Directive to provide a custom template for avatar content.
 *
 * When this directive is used, the avatar ignores the `src`, `name`, and
 * default icon fallback — the template has full control over the content.
 * Use this for company logos, emoji avatars, or custom graphics.
 *
 * @example Company logo
 * ```html
 * <com-avatar name="Acme Corp" size="lg" color="primary">
 *   <ng-template comAvatarCustom let-initials="initials">
 *     <img src="/logos/acme.svg" class="size-full object-contain p-1" alt="Acme Corp" />
 *   </ng-template>
 * </com-avatar>
 * ```
 *
 * @example Emoji avatar
 * ```html
 * <com-avatar name="Bot" color="accent" variant="filled">
 *   <ng-template comAvatarCustom>
 *     <span class="text-lg">🤖</span>
 *   </ng-template>
 * </com-avatar>
 * ```
 *
 * @example Adaptive content using size context
 * ```html
 * <com-avatar name="Jane" [size]="avatarSize">
 *   <ng-template comAvatarCustom let-size="size">
 *     @if (size === 'xs' || size === 'sm') {
 *       <span class="text-xs">👤</span>
 *     } @else {
 *       <img src="/custom-avatar.png" class="size-full object-cover" />
 *     }
 *   </ng-template>
 * </com-avatar>
 * ```
 */
@Directive({
  selector: 'ng-template[comAvatarCustom]',
})
export class ComAvatarCustom {
  readonly templateRef: TemplateRef<AvatarTemplateContext> = inject(TemplateRef);

  /**
   * Static type guard for template type checking.
   * Enables type-safe access to context properties in templates.
   */
  static ngTemplateContextGuard(
    _dir: ComAvatarCustom,
    ctx: unknown
  ): ctx is AvatarTemplateContext {
    return true;
  }
}
