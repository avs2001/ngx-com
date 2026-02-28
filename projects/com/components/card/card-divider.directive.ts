import { booleanAttribute, computed, Directive, input } from '@angular/core';
import type { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';
import { mergeClasses } from './card.utils';

/**
 * Card divider directive - horizontal rule between card sections.
 *
 * @example Standard divider (with side margins)
 * ```html
 * <hr uiCardDivider />
 * ```
 *
 * @example Full-width divider (edge to edge)
 * ```html
 * <hr uiCardDivider [inset]="true" />
 * ```
 */
@Directive({
  selector: '[uiCardDivider]',
  exportAs: 'uiCardDivider',
  host: {
    '[class]': 'computedClass()',
  },
})
export class UiCardDivider {
  /** When true, divider spans full card width (no horizontal margin). */
  readonly inset: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Consumer CSS classes. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  protected readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      'block border-t border-border',
      this.inset() ? 'mx-0' : 'mx-5',
      this.userClass()
    )
  );
}
