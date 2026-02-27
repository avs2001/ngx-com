import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Uses clsx for conditional class handling and tailwind-merge for deduplication.
 *
 * @param inputs - Class values to merge (strings, arrays, objects)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * ```ts
 * mergeClasses('p-2', 'p-4'); // => 'p-4'
 * mergeClasses('text-red-500', condition && 'text-blue-500');
 * ```
 */
export function mergeClasses(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
