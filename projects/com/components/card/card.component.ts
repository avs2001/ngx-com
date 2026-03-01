import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { mergeClasses } from './card.utils';
import { cardVariants } from './card.variants';
import type { CardVariant, CardPadding, CardRadius } from './card.variants';

/**
 * Card container component - a styled surface for content.
 *
 * The card is a pure container with no imposed structure.
 * Use card directives (comCardHeader, comCardContent, etc.) to compose layouts.
 *
 * @tokens `--color-popover`, `--color-popover-foreground`, `--color-muted`, `--color-muted-hover`,
 *         `--color-foreground`, `--color-border`, `--color-primary`, `--color-ring`
 *
 * @example Basic card
 * ```html
 * <com-card>
 *   <div comCardContent>Simple content</div>
 * </com-card>
 * ```
 *
 * @example Interactive card
 * ```html
 * <com-card [interactive]="true" (click)="onCardClick()">
 *   <div comCardContent>Clickable card</div>
 * </com-card>
 * ```
 *
 * @example Outlined variant with custom padding
 * ```html
 * <com-card variant="outlined" padding="md">
 *   <p>Outlined card with medium padding</p>
 * </com-card>
 * ```
 */
@Component({
  selector: 'com-card',
  exportAs: 'comCard',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'computedClass()',
  },
})
export class ComCard {
  /** Visual treatment of the card surface. */
  readonly variant: InputSignal<CardVariant> = input<CardVariant>('elevated');

  /** Inner spacing. Default 'none' - sub-parts manage their own padding. */
  readonly padding: InputSignal<CardPadding> = input<CardPadding>('none');

  /** Border radius. */
  readonly radius: InputSignal<CardRadius> = input<CardRadius>('lg');

  /** When true, adds hover/active states and cursor-pointer. */
  readonly interactive: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Consumer CSS classes - merged with variant classes. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  protected readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      cardVariants({
        variant: this.variant(),
        padding: this.padding(),
        radius: this.radius(),
        interactive: this.interactive(),
      }),
      this.userClass()
    )
  );
}
