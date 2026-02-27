/**
 * Splits an array into two groups based on a predicate function.
 * The first array contains elements that satisfy the predicate,
 * the second contains elements that don't.
 *
 * @template T - The type of array elements.
 * @param array - The array to partition.
 * @param predicate - The function to test each element.
 * @returns A tuple of [truthy, falsy] arrays.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5, 6];
 * partition(numbers, n => n % 2 === 0); // [[2, 4, 6], [1, 3, 5]]
 *
 * @example
 * const users = [
 *   { name: 'Alice', active: true },
 *   { name: 'Bob', active: false },
 *   { name: 'Charlie', active: true }
 * ];
 * partition(users, u => u.active);
 * // [[{ name: 'Alice', active: true }, { name: 'Charlie', active: true }], [{ name: 'Bob', active: false }]]
 */
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  for (const item of array) {
    if (predicate(item)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }

  return [truthy, falsy];
}
