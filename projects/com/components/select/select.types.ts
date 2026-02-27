/**
 * Select component shared types
 */

/** Available sizes for the select component */
export type ComSelectSize = 'sm' | 'md' | 'lg';

/** Comparison function for determining value equality */
export type CompareFn<T> = (a: T, b: T) => boolean;

/** Display function for formatting selected value */
export type DisplayFn<T> = (value: T) => string;

/** Search predicate function for local filtering */
export type SearchPredicateFn<T> = (option: T, query: string, label: string) => boolean;

/** Default search debounce time in milliseconds */
export const DEFAULT_SEARCH_DEBOUNCE = 300;
