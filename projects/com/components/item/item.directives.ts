import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marker directive for projecting custom leading content into a com-item.
 *
 * When this directive is present, it completely replaces the default
 * leading visual (which would otherwise be a com-avatar with an icon).
 * Use this for custom avatars (with images or initials), bare icons,
 * custom images, or any other leading visual.
 *
 * @example Custom avatar with image
 * ```html
 * <com-item title="Jane Doe" description="jane@example.com">
 *   <ng-template comItemLeading>
 *     <com-avatar src="/photos/jane.jpg" name="Jane Doe" size="sm" />
 *   </ng-template>
 * </com-item>
 * ```
 *
 * @example Avatar stack
 * ```html
 * <com-item title="3 collaborators">
 *   <ng-template comItemLeading>
 *     <div class="flex -space-x-2">
 *       <com-avatar name="A" size="xs" variant="outline" />
 *       <com-avatar name="B" size="xs" variant="outline" />
 *     </div>
 *   </ng-template>
 * </com-item>
 * ```
 */
@Directive({
  selector: 'ng-template[comItemLeading]',
})
export class ComItemLeading {
  readonly templateRef: TemplateRef<void> = inject(TemplateRef);
}

/**
 * Marker directive for projecting custom title content into a com-item.
 *
 * When this directive is present, it replaces the `title` input with
 * rich projected content. Use this when the title needs formatting,
 * links, or other custom markup.
 *
 * @example Title with link
 * ```html
 * <com-item icon="link">
 *   <ng-template comItemTitle>
 *     <a href="/docs/api" class="hover:underline">API Documentation</a>
 *   </ng-template>
 * </com-item>
 * ```
 */
@Directive({
  selector: 'ng-template[comItemTitle]',
})
export class ComItemTitle {
  readonly templateRef: TemplateRef<void> = inject(TemplateRef);
}

/**
 * Marker directive for projecting inline suffix content after the title.
 *
 * Content appears on the same line as the title, immediately after it.
 * Use this for badges, tags, status indicators, or other inline metadata.
 *
 * @example Badge suffix
 * ```html
 * <com-item title="My BP datasource" description="View and manage configuration">
 *   <ng-template comItemSuffix>
 *     <span class="inline-flex items-center gap-1 rounded-pill border border-primary/30 bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
 *       Bluetooth
 *     </span>
 *   </ng-template>
 * </com-item>
 * ```
 */
@Directive({
  selector: 'ng-template[comItemSuffix]',
})
export class ComItemSuffix {
  readonly templateRef: TemplateRef<void> = inject(TemplateRef);
}

/**
 * Marker directive for projecting custom description content into a com-item.
 *
 * When this directive is present, it replaces the `description` input
 * with rich projected content. Use this when the description needs
 * formatting, code snippets, or other custom markup.
 *
 * @example Description with code
 * ```html
 * <com-item title="API Key" icon="key">
 *   <ng-template comItemDescription>
 *     <code class="text-xs font-mono text-muted-foreground">sk-abc...xyz</code>
 *     <span class="text-xs text-muted-foreground"> · Created 3 days ago</span>
 *   </ng-template>
 * </com-item>
 * ```
 */
@Directive({
  selector: 'ng-template[comItemDescription]',
})
export class ComItemDescription {
  readonly templateRef: TemplateRef<void> = inject(TemplateRef);
}

/**
 * Marker directive for projecting trailing content into a com-item.
 *
 * Content appears at the far right edge of the item. Use this for
 * action buttons, navigation chevrons, toggles, timestamps, or
 * any other trailing content.
 *
 * @example Trailing chevron
 * ```html
 * <com-item title="Settings" icon="settings" [interactive]="true">
 *   <ng-template comItemTrailing>
 *     <com-icon name="chevron-right" size="sm" color="muted" />
 *   </ng-template>
 * </com-item>
 * ```
 *
 * @example Trailing action button
 * ```html
 * <com-item title="API Key" icon="key">
 *   <ng-template comItemTrailing>
 *     <button class="text-sm text-primary hover:text-primary-hover">Revoke</button>
 *   </ng-template>
 * </com-item>
 * ```
 */
@Directive({
  selector: 'ng-template[comItemTrailing]',
})
export class ComItemTrailing {
  readonly templateRef: TemplateRef<void> = inject(TemplateRef);
}
