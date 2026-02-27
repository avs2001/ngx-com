/**
 * Types and interfaces for the Select component.
 */

/** Visual state of an option within the select panel */
export type SelectOptionState = 'default' | 'active' | 'selected' | 'disabled';

/** Visual state of the select trigger button */
export type SelectTriggerState = 'default' | 'focused' | 'disabled' | 'error';

/** Size variants for the select component */
export type SelectSize = 'sm' | 'md' | 'lg';

/** Visual variants for the select trigger */
export type SelectVariant = 'default' | 'ghost' | 'bordered';

/**
 * Comparison function to determine if two values are equal.
 * Used for matching selected value to options.
 */
export type CompareFn<T> = (o1: T, o2: T) => boolean;

/**
 * Default comparison function using strict equality.
 */
export function defaultCompareFn<T>(o1: T, o2: T): boolean {
  return o1 === o2;
}

/**
 * Registered option metadata for parent-child communication.
 */
export interface RegisteredOption<T> {
  /** Unique identifier for the option */
  id: string;
  /** The option's value */
  value: T;
  /** Display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled: boolean;
}
