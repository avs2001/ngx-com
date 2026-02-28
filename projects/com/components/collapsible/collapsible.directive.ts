import {
  booleanAttribute,
  computed,
  Directive,
  input,
  model,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, ModelSignal, Signal } from '@angular/core';
import { mergeClasses, generateCollapsibleId } from './collapsible.utils';
import { collapsibleVariants } from './collapsible.variants';
import type { CollapsibleVariant } from './collapsible.variants';

/**
 * Root collapsible directive — manages state and provides shell styling.
 *
 * Works as a DI anchor for child directives (trigger, content).
 * Exposes programmatic control via template reference.
 *
 * @tokens `--color-border`, `--color-background`, `--color-foreground`, `--shadow-xs`
 *
 * @example Basic usage
 * ```html
 * <div comCollapsible variant="card">
 *   <button comCollapsibleTrigger>Section Title</button>
 *   <com-collapsible-content>
 *     <div class="p-4">Content here.</div>
 *   </com-collapsible-content>
 * </div>
 * ```
 *
 * @example Two-way binding with external control
 * ```html
 * <div comCollapsible [(open)]="sectionOpen" #section="comCollapsible">
 *   <button comCollapsibleTrigger>Advanced</button>
 *   <com-collapsible-content>...</com-collapsible-content>
 * </div>
 * <button (click)="section.toggle()">Toggle externally</button>
 * ```
 */
@Directive({
  selector: '[comCollapsible]',
  exportAs: 'comCollapsible',
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
})
export class ComCollapsible {
  /** Unique ID for the collapsible instance. */
  private readonly id: string = generateCollapsibleId();

  /** ID for the trigger element (used for aria-labelledby). */
  readonly triggerId: string = `${this.id}-trigger`;

  /** ID for the content panel (used for aria-controls). */
  readonly contentId: string = `${this.id}-content`;

  // ============ INPUTS ============

  /** Two-way bound open state. */
  readonly open: ModelSignal<boolean> = model<boolean>(false);

  /** Disables the collapsible, preventing state changes. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  });

  /** Shell preset variant. */
  readonly variant: InputSignal<CollapsibleVariant> = input<CollapsibleVariant>('ghost');

  /** Consumer CSS classes — merged with variant classes. */
  readonly userClass: InputSignal<string> = input<string>('', { alias: 'class' });

  // ============ COMPUTED STATE ============

  /** @internal Computed host class from CVA + consumer overrides. */
  protected readonly computedClass: Signal<string> = computed(() =>
    mergeClasses(
      collapsibleVariants({ variant: this.variant() }),
      this.userClass()
    )
  );

  // ============ PUBLIC API ============

  /** Returns the current open state. */
  isOpen(): boolean {
    return this.open();
  }

  /** Returns the current disabled state. */
  isDisabled(): boolean {
    return this.disabled();
  }

  /** Toggles the open state (if not disabled). */
  toggle(): void {
    if (this.disabled()) return;
    this.open.update((v) => !v);
  }

  /** Expands the collapsible (if not disabled). */
  expand(): void {
    if (this.disabled()) return;
    this.open.set(true);
  }

  /** Collapses the collapsible (if not disabled). */
  collapse(): void {
    if (this.disabled()) return;
    this.open.set(false);
  }
}
