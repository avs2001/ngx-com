import { chunk } from './chunk';
import { debounce } from './debounce';
import { throttle } from './throttle';
import { groupBy } from './group-by';
import { omit } from './omit';
import { pick } from './pick';
import { partition } from './partition';
import { deepClone } from './deep-clone';
import { deepEqual } from './deep-equal';
import { deepMerge } from './deep-merge';
import { isPlainObject } from './is-plain-object';
import { mergeClasses } from './merge-classes';
import { resolvePath } from './resolve-path';
import { retry } from './retry';

describe('chunk', () => {
  it('should split array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should handle exact divisible arrays', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('should handle chunk size larger than array', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it('should handle empty array', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it('should handle chunk size of 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('should throw error for zero chunk size', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow('Chunk size must be a positive number');
  });

  it('should throw error for negative chunk size', () => {
    expect(() => chunk([1, 2, 3], -1)).toThrow('Chunk size must be a positive number');
  });

  it('should preserve object references in chunks', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const result = chunk([obj1, obj2], 1);
    expect(result[0]?.[0]).toBe(obj1);
    expect(result[1]?.[0]).toBe(obj2);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should delay function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should use default wait time of 300ms', () => {
    const fn = vi.fn();
    const debounced = debounce(fn);

    debounced();
    vi.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should reset timer on subsequent calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    vi.advanceTimersByTime(200);
    debounced();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass latest arguments', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('first');
    debounced('second');
    debounced('third');

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledWith('third');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should cancel pending calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    debounced.cancel();

    vi.advanceTimersByTime(300);
    expect(fn).not.toHaveBeenCalled();
  });

  it('should flush pending calls immediately', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('test');
    debounced.flush();

    expect(fn).toHaveBeenCalledWith('test');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should do nothing on flush when no pending call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced.flush();
    expect(fn).not.toHaveBeenCalled();
  });

  it('should report pending status correctly', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    expect(debounced.pending()).toBe(false);

    debounced();
    expect(debounced.pending()).toBe(true);

    vi.advanceTimersByTime(300);
    expect(debounced.pending()).toBe(false);
  });

  it('should support leading edge execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, { wait: 300, leading: true });

    debounced('first');
    expect(fn).toHaveBeenCalledWith('first');
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should execute trailing call after leading with new args', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, { wait: 300, leading: true });

    debounced('first');
    expect(fn).toHaveBeenCalledWith('first');

    debounced('second');
    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledWith('second');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should accept options object with wait', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, { wait: 500 });

    debounced();
    vi.advanceTimersByTime(499);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should execute immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should not execute within wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should execute trailing call after wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('first');
    throttled('second');
    throttled('third');

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('third');
  });

  it('should allow execution after wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    vi.advanceTimersByTime(100);
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should cancel pending calls', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled.cancel();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments correctly', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('arg1', 'arg2');
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('groupBy', () => {
  it('should group items by predicate result', () => {
    const people = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 30 },
    ];

    const result = groupBy(people, person => person.age);

    expect(result[25]).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 25 },
    ]);
    expect(result[30]).toEqual([{ name: 'Charlie', age: 30 }]);
  });

  it('should handle empty array', () => {
    const result = groupBy([], () => 'key');
    expect(result).toEqual({});
  });

  it('should group by string keys', () => {
    const items = [
      { type: 'fruit' as const, name: 'apple' },
      { type: 'vegetable' as const, name: 'carrot' },
      { type: 'fruit' as const, name: 'banana' },
    ];

    const result = groupBy(items, item => item.type);

    expect(result['fruit']).toHaveLength(2);
    expect(result['vegetable']).toHaveLength(1);
  });

  it('should group primitives', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = groupBy(numbers, n => (n % 2 === 0 ? ('even' as const) : ('odd' as const)));

    expect(result['even']).toEqual([2, 4, 6]);
    expect(result['odd']).toEqual([1, 3, 5]);
  });

  it('should handle single item groups', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = groupBy(items, item => item.id);

    expect(Object.keys(result)).toHaveLength(3);
  });
});

describe('omit', () => {
  it('should omit specified keys', () => {
    const user = { id: 1, name: 'John', password: 'secret', email: 'john@example.com' };
    const result = omit(user, ['password']);

    expect(result).toEqual({ id: 1, name: 'John', email: 'john@example.com' });
    expect('password' in result).toBe(false);
  });

  it('should omit multiple keys', () => {
    const config = { host: 'localhost', port: 3000, debug: true, verbose: true };
    const result = omit(config, ['debug', 'verbose']);

    expect(result).toEqual({ host: 'localhost', port: 3000 });
  });

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, []);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should not modify original object', () => {
    const original = { a: 1, b: 2, c: 3 };
    omit(original, ['b']);

    expect(original).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle object with all keys omitted', () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, ['a', 'b']);

    expect(result).toEqual({});
  });
});

describe('pick', () => {
  it('should pick specified keys', () => {
    const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
    const result = pick(user, ['id', 'name']);

    expect(result).toEqual({ id: 1, name: 'John' });
  });

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, []);

    expect(result).toEqual({});
  });

  it('should not modify original object', () => {
    const original = { a: 1, b: 2, c: 3 };
    pick(original, ['a']);

    expect(original).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should pick all keys when all specified', () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, ['a', 'b']);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle picking single key', () => {
    const config = { host: 'localhost', port: 3000, debug: true };
    const result = pick(config, ['port']);

    expect(result).toEqual({ port: 3000 });
  });
});

describe('partition', () => {
  it('should partition array by predicate', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const [even, odd] = partition(numbers, n => n % 2 === 0);

    expect(even).toEqual([2, 4, 6]);
    expect(odd).toEqual([1, 3, 5]);
  });

  it('should handle empty array', () => {
    const [truthy, falsy] = partition([], () => true);

    expect(truthy).toEqual([]);
    expect(falsy).toEqual([]);
  });

  it('should handle all truthy', () => {
    const [truthy, falsy] = partition([1, 2, 3], () => true);

    expect(truthy).toEqual([1, 2, 3]);
    expect(falsy).toEqual([]);
  });

  it('should handle all falsy', () => {
    const [truthy, falsy] = partition([1, 2, 3], () => false);

    expect(truthy).toEqual([]);
    expect(falsy).toEqual([1, 2, 3]);
  });

  it('should partition objects', () => {
    const users = [
      { name: 'Alice', active: true },
      { name: 'Bob', active: false },
      { name: 'Charlie', active: true },
    ];

    const [active, inactive] = partition(users, u => u.active);

    expect(active).toHaveLength(2);
    expect(inactive).toHaveLength(1);
    expect(active[0]?.name).toBe('Alice');
    expect(inactive[0]?.name).toBe('Bob');
  });

  it('should preserve order within partitions', () => {
    const items = [1, 2, 3, 4, 5];
    const [greater, lessOrEqual] = partition(items, n => n > 3);

    expect(greater).toEqual([4, 5]);
    expect(lessOrEqual).toEqual([1, 2, 3]);
  });
});

describe('deepClone', () => {
  it('should clone primitive values', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('should clone simple objects', () => {
    const original = { a: 1, b: 2 };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should clone nested objects', () => {
    const original = { a: 1, b: { c: 2, d: { e: 3 } } };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned.b).not.toBe(original.b);
    expect(cloned.b.d).not.toBe(original.b.d);
  });

  it('should clone arrays', () => {
    const original = [1, 2, [3, 4]];
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[2]).not.toBe(original[2]);
  });

  it('should clone arrays of objects', () => {
    const original = [{ id: 1 }, { id: 2 }];
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned[0]).not.toBe(original[0]);
  });

  it('should clone Date objects', () => {
    const date = new Date('2024-01-01');
    const cloned = deepClone(date);

    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
    expect(cloned.getTime()).toBe(date.getTime());
  });

  it('should clone RegExp objects', () => {
    const regex = /test/gi;
    const cloned = deepClone(regex);

    expect(cloned).toEqual(regex);
    expect(cloned).not.toBe(regex);
    expect(cloned.source).toBe(regex.source);
    expect(cloned.flags).toBe(regex.flags);
  });

  it('should handle mixed nested structures', () => {
    const original = {
      array: [1, { nested: true }],
      date: new Date('2024-01-01'),
      regex: /pattern/i,
      nested: { deep: { value: 42 } },
    };
    const cloned = deepClone(original);

    expect(cloned).toEqual(original);
    expect(cloned.array).not.toBe(original.array);
    expect(cloned.date).not.toBe(original.date);
    expect(cloned.regex).not.toBe(original.regex);
  });

  it('should not affect original when modifying clone', () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = deepClone(original);

    cloned.a = 99;
    cloned.b.c = 99;

    expect(original.a).toBe(1);
    expect(original.b.c).toBe(2);
  });
});

describe('deepEqual', () => {
  it('should compare primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('a', 'a')).toBe(true);
    expect(deepEqual('a', 'b')).toBe(false);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(true, false)).toBe(false);
  });

  it('should handle null and undefined', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(null, {})).toBe(false);
  });

  it('should compare simple objects', () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it('should compare nested objects', () => {
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false);
  });

  it('should compare arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('should compare nested arrays', () => {
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(deepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
  });

  it('should compare Date objects', () => {
    expect(deepEqual(new Date('2024-01-01'), new Date('2024-01-01'))).toBe(true);
    expect(deepEqual(new Date('2024-01-01'), new Date('2024-01-02'))).toBe(false);
  });

  it('should compare RegExp objects', () => {
    expect(deepEqual(/test/gi, /test/gi)).toBe(true);
    expect(deepEqual(/test/gi, /test/g)).toBe(false);
    expect(deepEqual(/test/g, /other/g)).toBe(false);
  });

  it('should return false for different types', () => {
    expect(deepEqual(1 as unknown, '1' as unknown)).toBe(false);
    expect(deepEqual([] as unknown, {} as unknown)).toBe(false);
    expect(deepEqual(null as unknown, 0 as unknown)).toBe(false);
  });

  it('should handle objects with different key counts', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it('should compare same reference as equal', () => {
    const obj = { a: 1 };
    expect(deepEqual(obj, obj)).toBe(true);
  });

  it('should handle arrays of objects', () => {
    expect(deepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    expect(deepEqual([{ a: 1 }], [{ a: 2 }])).toBe(false);
  });
});

describe('deepMerge', () => {
  it('should merge simple objects', () => {
    const result = deepMerge<Record<string, number>>({ a: 1 }, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should override properties from later sources', () => {
    const result = deepMerge<Record<string, number>>({ a: 1, b: 2 }, { b: 3, c: 4 });
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should deep merge nested objects', () => {
    const defaults = { theme: { color: 'blue', size: 'md' }, debug: false };
    const userConfig = { theme: { color: 'red' }, debug: true };
    const result = deepMerge(defaults, userConfig);

    expect(result).toEqual({ theme: { color: 'red', size: 'md' }, debug: true });
  });

  it('should replace arrays not merge them', () => {
    const a = { arr: [1, 2] };
    const b = { arr: [3, 4] };
    const result = deepMerge(a, b);

    expect(result).toEqual({ arr: [3, 4] });
  });

  it('should handle multiple sources', () => {
    const result = deepMerge<Record<string, number>>({ a: 1 }, { b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle empty sources', () => {
    const result = deepMerge<Record<string, number>>({ a: 1 }, {}, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should not modify original objects', () => {
    type TestObj = { a?: number; b?: number; nested: { x?: number; y?: number } };
    const original1: TestObj = { a: 1, nested: { x: 1 } };
    const original2: TestObj = { b: 2, nested: { y: 2 } };
    deepMerge<TestObj>(original1, original2);

    expect(original1).toEqual({ a: 1, nested: { x: 1 } });
    expect(original2).toEqual({ b: 2, nested: { y: 2 } });
  });

  it('should handle deeply nested structures', () => {
    type DeepObj = { level1: { level2: { level3: Record<string, string> } } };
    const a: DeepObj = { level1: { level2: { level3: { value: 'a' } } } };
    const b: DeepObj = { level1: { level2: { level3: { other: 'b' } } } };
    const result = deepMerge<DeepObj>(a, b);

    expect(result).toEqual({
      level1: { level2: { level3: { value: 'a', other: 'b' } } },
    });
  });

  it('should skip null and non-object sources', () => {
    type RecordNum = Record<string, number>;
    const result = deepMerge<RecordNum>({ a: 1 }, null as unknown as RecordNum, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should clone arrays in the result', () => {
    const original = { arr: [1, 2, 3] };
    const result = deepMerge(original);

    result.arr.push(4);
    expect(original.arr).toEqual([1, 2, 3]);
  });
});

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
    expect(isPlainObject({ nested: { object: true } })).toBe(true);
  });

  it('should return false for arrays', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it('should return false for null', () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isPlainObject(() => {})).toBe(false);
  });

  it('should return true for Object.create(null)', () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
  });
});

describe('mergeClasses', () => {
  it('should merge multiple class strings', () => {
    const result = mergeClasses('px-2 py-1', 'mx-4');
    expect(result).toBe('px-2 py-1 mx-4');
  });

  it('should handle conflicting tailwind classes', () => {
    const result = mergeClasses('px-2', 'px-4');
    expect(result).toBe('px-4');
  });

  it('should handle conditional classes', () => {
    const result = mergeClasses('base-class', false && 'hidden', true && 'visible');
    expect(result).toBe('base-class visible');
  });

  it('should handle array inputs', () => {
    const result = mergeClasses(['class1', 'class2']);
    expect(result).toBe('class1 class2');
  });

  it('should handle object inputs', () => {
    const result = mergeClasses({ visible: true, hidden: false });
    expect(result).toBe('visible');
  });

  it('should handle empty inputs', () => {
    const result = mergeClasses('', null, undefined);
    expect(result).toBe('');
  });

  it('should handle complex tailwind conflicts', () => {
    const result = mergeClasses('text-sm text-red-500', 'text-lg');
    expect(result).toBe('text-red-500 text-lg');
  });

  it('should preserve non-conflicting classes', () => {
    const result = mergeClasses('rounded-md shadow-sm', 'hover:shadow-lg');
    expect(result).toBe('rounded-md shadow-sm hover:shadow-lg');
  });
});

describe('resolvePath', () => {
  it('should resolve simple path', () => {
    const obj = { name: 'John' };
    expect(resolvePath(obj, 'name')).toBe('John');
  });

  it('should resolve nested path', () => {
    const obj = { user: { profile: { name: 'John' } } };
    expect(resolvePath(obj, 'user.profile.name')).toBe('John');
  });

  it('should return undefined for invalid path', () => {
    const obj = { user: { profile: { name: 'John' } } };
    expect(resolvePath(obj, 'user.address.city')).toBeUndefined();
  });

  it('should handle arrays in path', () => {
    const obj = { items: [{ id: 1 }, { id: 2 }] };
    expect(resolvePath(obj, 'items.0.id')).toBe(1);
    expect(resolvePath(obj, 'items.1.id')).toBe(2);
  });

  it('should return undefined for empty object', () => {
    expect(resolvePath({}, 'any.path')).toBeUndefined();
  });

  it('should handle single level path', () => {
    const obj = { value: 42 };
    expect(resolvePath(obj, 'value')).toBe(42);
  });

  it('should handle null values in path', () => {
    const obj = { user: null };
    expect(resolvePath(obj, 'user.name')).toBeUndefined();
  });

  it('should return complex values at path', () => {
    const obj = { data: { nested: { array: [1, 2, 3] } } };
    expect(resolvePath(obj, 'data.nested.array')).toEqual([1, 2, 3]);
  });

  it('should handle deeply nested paths', () => {
    const obj = { a: { b: { c: { d: { e: 'deep' } } } } };
    expect(resolvePath(obj, 'a.b.c.d.e')).toBe('deep');
  });
});

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('success');

    const resultPromise = retry(fn, { attempts: 3, delay: 100 });
    const result = await resultPromise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('fail')).mockResolvedValue('success');

    const resultPromise = retry(fn, { attempts: 3, delay: 100 });

    await vi.advanceTimersByTimeAsync(100);
    const result = await resultPromise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should throw after all attempts fail', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('persistent failure'));

    // Start retry and catch the rejection immediately
    let caughtError: Error | undefined;
    const resultPromise = retry(fn, { attempts: 3, delay: 100 }).catch((e: Error) => {
      caughtError = e;
    });

    // Advance through all retries
    await vi.runAllTimersAsync();
    await resultPromise;

    expect(caughtError?.message).toBe('persistent failure');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should apply exponential backoff', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const resultPromise = retry(fn, { attempts: 3, delay: 100, backoff: 2 });

    // First retry after 100ms
    await vi.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(2);

    // Second retry after 200ms (100 * 2)
    await vi.advanceTimersByTimeAsync(200);
    const result = await resultPromise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should respect shouldRetry predicate', async () => {
    class RetryableError extends Error {}
    class NonRetryableError extends Error {}

    const fn = vi.fn().mockRejectedValue(new NonRetryableError('do not retry'));

    const resultPromise = retry(fn, {
      attempts: 3,
      delay: 100,
      shouldRetry: error => error instanceof RetryableError,
    });

    await expect(resultPromise).rejects.toThrow('do not retry');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry when shouldRetry returns true', async () => {
    class RetryableError extends Error {}

    const fn = vi.fn().mockRejectedValueOnce(new RetryableError('retry me')).mockResolvedValue('success');

    const resultPromise = retry(fn, {
      attempts: 3,
      delay: 100,
      shouldRetry: error => error instanceof RetryableError,
    });

    await vi.advanceTimersByTimeAsync(100);
    const result = await resultPromise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should handle single attempt', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'));

    const resultPromise = retry(fn, { attempts: 1, delay: 100 });

    await expect(resultPromise).rejects.toThrow('fail');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should use default backoff of 1', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const resultPromise = retry(fn, { attempts: 3, delay: 100 });

    await vi.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(100);
    const result = await resultPromise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
