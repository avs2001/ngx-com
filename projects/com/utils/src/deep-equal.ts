/**
 * Performs a deep equality comparison between two values.
 * Handles primitives, objects, arrays, Date, and RegExp.
 *
 * @template T - The type of values to compare.
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` if values are deeply equal; otherwise, `false`.
 *
 * @example
 * deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
 * deepEqual({ a: 1 }, { a: 2 }); // false
 * deepEqual([1, [2, 3]], [1, [2, 3]]); // true
 * deepEqual([1, 2], [1, 2, 3]); // false
 * deepEqual(new Date('2024-01-01'), new Date('2024-01-01')); // true
 */
export function deepEqual<T>(a: T, b: T): boolean {
  if (a === b) {
    return true;
  }

  if (a === null || b === null) {
    return a === b;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a !== 'object') {
    return a === b;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
