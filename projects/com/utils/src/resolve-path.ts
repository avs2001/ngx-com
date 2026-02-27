/**
 * Utility type that recursively maps the object type to the type of the resolved path.
 *
 * @example
 * type A = { user: { profile: { name: string } } };
 * type Result = ResolvePath<A, 'user.profile.name'>; // Result is string
 */
export type ResolvePath<T, P extends string> = P extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? ResolvePath<T[Head], Tail>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/**
 * Resolves a nested path in an object, returning the value at the specified path.
 *
 * This function splits the provided `path` into keys and iterates through the object to access the
 * corresponding value at each key. If any part of the path is undefined or if the path leads to a non-object,
 * it returns `undefined`.
 *
 * @template T - The type of the object.
 * @template P - The dot-separated string path type.
 * @param obj - The object to resolve the path within.
 * @param path - The dot-separated string representing the path to the value.
 * @returns The value at the resolved path, or `undefined` if any part of the path is invalid.
 *
 * @example
 * const obj = { user: { profile: { name: 'John Doe' } } };
 * const result = resolvePath(obj, 'user.profile.name');
 * console.log(result); // 'John Doe'
 *
 * @example
 * const result2 = resolvePath(obj, 'user.address.city');
 * console.log(result2); // undefined
 */
export function resolvePath<T extends object, P extends string>(
  obj: T,
  path: P,
): ResolvePath<T, P> | undefined {
  const keys = path.split('.') as (keyof T)[];
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string | number | symbol, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current as ResolvePath<T, P>;
}
