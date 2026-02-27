/**
 * Splits an array into chunks of the specified size.
 *
 * @template T - The type of array elements.
 * @param array - The array to split.
 * @param size - The size of each chunk (must be positive).
 * @returns An array of chunks.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
 * chunk([1, 2, 3], 5); // [[1, 2, 3]]
 * chunk([], 2); // []
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error('Chunk size must be a positive number');
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
