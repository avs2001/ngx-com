/**
 * Creates a new object with the specified keys omitted from the source object.
 *
 * @template T - The type of the source object.
 * @template K - The keys to omit.
 * @param obj - The source object.
 * @param keys - The keys to omit from the object.
 * @returns A new object without the specified keys.
 *
 * @example
 * const user = { id: 1, name: 'John', password: 'secret', email: 'john@example.com' };
 * omit(user, ['password']); // { id: 1, name: 'John', email: 'john@example.com' }
 *
 * @example
 * const config = { host: 'localhost', port: 3000, debug: true };
 * omit(config, ['debug']); // { host: 'localhost', port: 3000 }
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}
