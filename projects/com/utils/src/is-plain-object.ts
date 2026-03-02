/**
 * Checks if a value is a plain object (not null, not an array).
 *
 * @param value - The value to check.
 * @returns `true` if value is a plain object; otherwise, `false`.
 *
 * @example
 * isPlainObject({ a: 1 }); // true
 * isPlainObject([1, 2]); // false
 * isPlainObject(null); // false
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
