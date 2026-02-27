/**
 * Creates a deep clone of a value, handling objects, arrays, Date, and RegExp.
 * Note: Does not handle circular references, functions, or special objects like Map, Set.
 * For complex cloning needs, consider using `structuredClone()`.
 *
 * @template T - The type of the value to clone.
 * @param value - The value to deep clone.
 * @returns A deep clone of the value.
 *
 * @example
 * const original = { a: 1, b: { c: 2, d: [3, 4] } };
 * const cloned = deepClone(original);
 * cloned.b.c = 5;
 * console.log(original.b.c); // 2 (unchanged)
 *
 * @example
 * const arr = [{ id: 1 }, { id: 2 }];
 * const clonedArr = deepClone(arr);
 * clonedArr[0].id = 99;
 * console.log(arr[0].id); // 1 (unchanged)
 */
export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item)) as T;
  }

  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      result[key] = deepClone((value as Record<string, unknown>)[key]);
    }
    return result as T;
  }

  return value;
}
