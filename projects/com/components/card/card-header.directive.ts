import { Directive } from '@angular/core';

/**
 * Card header directive - top section for title and actions.
 *
 * Uses justify-between so it naturally supports a title group on the left
 * and an action element (icon button, menu trigger) on the right.
 *
 * @example Header with title
 * ```html
 * <div comCardHeader>
 *   <h3 comCardTitle>Card Title</h3>
 * </div>
 * ```
 *
 * @example Header with title and action
 * ```html
 * <div comCardHeader>
 *   <div>
 *     <h3 comCardTitle>Title</h3>
 *     <p comCardSubtitle>Subtitle</p>
 *   </div>
 *   <button comButton variant="ghost" size="icon" aria-label="More">...</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[comCardHeader]',
  exportAs: 'comCardHeader',
  host: {
    class: 'flex items-start justify-between gap-3 px-5 pt-5 pb-0',
  },
})
export class ComCardHeader {}
