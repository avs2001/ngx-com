import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges and deduplicates CSS class names using clsx and tailwind-merge.
 * Tailwind-merge ensures conflicting utility classes are resolved correctly.
 *
 * @param inputs - Class values to merge (strings, arrays, objects, or falsy values)
 * @returns A single string of merged, deduplicated class names
 *
 * @example
 * ```ts
 * mergeClasses('px-2 py-1', 'px-4'); // 'py-1 px-4'
 * mergeClasses('text-sm', condition && 'text-lg'); // 'text-lg' if condition is true
 * ```
 */
export function mergeClasses(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
