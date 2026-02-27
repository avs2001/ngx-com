import { deepClone } from './deep-clone';

/**
 * Deep merges multiple source objects into a new object.
 * Later sources override earlier ones. Arrays are replaced, not merged.
 *
 * @template T - The type of the resulting object.
 * @param sources - The source objects to merge.
 * @returns A new deeply merged object.
 *
 * @example
 * const defaults = { theme: { color: 'blue', size: 'md' }, debug: false };
 * const userConfig = { theme: { color: 'red' }, debug: true };
 * deepMerge(defaults, userConfig);
 * // { theme: { color: 'red', size: 'md' }, debug: true }
 *
 * @example
 * const a = { arr: [1, 2], nested: { x: 1 } };
 * const b = { arr: [3, 4], nested: { y: 2 } };
 * deepMerge(a, b);
 * // { arr: [3, 4], nested: { x: 1, y: 2 } } - arrays are replaced
 */
export function deepMerge<T extends object>(...sources: Partial<T>[]): T {
  const result: Record<string, unknown> = {};

  for (const source of sources) {
    if (typeof source !== 'object' || source === null) {
      continue;
    }

    for (const key of Object.keys(source)) {
      const sourceValue = (source as Record<string, unknown>)[key];
      const resultValue = result[key];

      if (Array.isArray(sourceValue)) {
        result[key] = deepClone(sourceValue);
      } else if (isPlainObject(sourceValue) && isPlainObject(resultValue)) {
        result[key] = deepMerge(
          resultValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
        );
      } else if (isPlainObject(sourceValue)) {
        result[key] = deepClone(sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
