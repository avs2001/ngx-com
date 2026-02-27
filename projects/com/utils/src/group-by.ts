/**
 * Groups an array of items based on a provided predicate function.
 *
 * @template K - The type of keys produced by the predicate, typically a string, number, or symbol.
 * @template V - The type of items in the collection.
 * @param collection - The array of items to be grouped.
 * @param predicate - A function that takes an item and returns a key by which to group the item.
 * @returns An object where each key is a group identifier produced by the predicate,
 * and the value is an array of items belonging to that group.
 *
 * @example
 * // Group an array of people by their age
 * const people = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 30 }];
 * const groupedByAge = groupBy(people, person => person.age);
 * // Output:
 * // {
 * //   25: [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 25 }],
 * //   30: [{ name: 'Charlie', age: 30 }]
 * // }
 */
export function groupBy<K extends string | number | symbol, V>(
  collection: V[],
  predicate: (item: V) => K,
): Record<K, V[]> {
  return collection.reduce(
    (groups, item) => {
      const groupKey = predicate(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<K, V[]>,
  );
}
