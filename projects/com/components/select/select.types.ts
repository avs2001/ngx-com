/**
 * Select component shared types
 */

/** Available sizes for the select component */
export type ComSelectSize = 'sm' | 'md' | 'lg';

/** Comparison function for determining value equality */
export type CompareFn<T> = (a: T, b: T) => boolean;

/** Display function for formatting selected value */
export type DisplayFn<T> = (value: T) => string;
