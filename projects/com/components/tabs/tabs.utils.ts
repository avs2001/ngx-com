import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 */
export function mergeClasses(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

let tabIdCounter = 0;

/**
 * Generates a unique ID for tab components.
 */
export function generateTabId(): string {
  return `ui-tab-${++tabIdCounter}`;
}
