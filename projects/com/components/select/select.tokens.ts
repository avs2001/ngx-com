import { InjectionToken, type Signal } from '@angular/core';
import type { CompareFn, RegisteredOption, SelectSize } from './select.types';

/**
 * Interface for parent select component that options can communicate with.
 */
export interface SelectParent<T = unknown> {
  /** Register an option with the parent */
  registerOption(option: RegisteredOption<T>): void;

  /** Unregister an option from the parent */
  unregisterOption(id: string): void;

  /** Select an option by value */
  selectOption(value: T): void;

  /** Set the active index for keyboard navigation */
  setActiveIndex(index: number): void;

  /** Signal indicating if the panel is open */
  readonly isOpen: Signal<boolean>;

  /** Signal containing the currently selected value */
  readonly value: Signal<T | null>;

  /** Signal containing the active option index for keyboard navigation */
  readonly activeIndex: Signal<number>;

  /** Signal containing the select size */
  readonly size: Signal<SelectSize>;

  /** Signal indicating if the select is disabled */
  readonly disabled: Signal<boolean>;

  /** Comparison function for matching values */
  readonly compareWith: Signal<CompareFn<T>>;
}

/**
 * Injection token for parent-child communication between ComSelect and ComSelectOption.
 */
export const SELECT_PARENT: InjectionToken<SelectParent<unknown>> = new InjectionToken<
  SelectParent<unknown>
>('SelectParent');
