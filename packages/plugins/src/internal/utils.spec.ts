import {defaults, getPathPatternMatcher, pick, shallowEqual} from './utils';

describe('plugins', () => {
  describe('pick', () => {
    it('should pick values correctly', () => {
      const result = pick({abc: true, def: 'xyz'} as any, ['abc', 'unknown']);
      expect(Object.keys(result)).toEqual(['abc', 'unknown']);
      expect(result).toEqual({abc: true, unknown: undefined});
    });
  });

  describe('shallowEqual', () => {
    it('should mark it correctly for primitive values', () => {
      expect(shallowEqual(10, 10)).toBe(true);
      expect(shallowEqual('abc', 'abc')).toBe(true);
      expect(shallowEqual(Infinity, Infinity)).toBe(true);
      expect(shallowEqual(true, true)).toBe(true);
      expect(shallowEqual(true, false)).toBe(false);
      expect(shallowEqual(undefined, false)).toBe(false);
      expect(shallowEqual(undefined, undefined)).toBe(true);
      expect(shallowEqual(undefined, null)).toBe(false);
      expect(shallowEqual('10', 10)).toBe(false);
      expect(shallowEqual('abc', 'xyz')).toBe(false);
    });

    it('should correctly work for simple objects', () => {
      expect(shallowEqual({}, null)).toBe(false);
      expect(shallowEqual({}, {})).toBe(true);
      expect(shallowEqual({a: 10}, {})).toBe(false);
      expect(shallowEqual({a: 10}, {a: 10})).toBe(true);
      expect(shallowEqual({b: 10}, {a: 10})).toBe(false);
      expect(shallowEqual({a: 10, b: 10, c: 10}, {a: 10, b: 10, c: 10})).toBe(true);
      expect(shallowEqual({a: 10, b: 10, c: 10}, {a: 10, b: 10, c: 10, d: 10})).toBe(false);
    });

    it('should work for nested objects', () => {
      const inner = {b: 10};
      expect(shallowEqual({a: inner}, {a: inner})).toBe(true);
      expect(shallowEqual({a: {...inner}}, {a: {...inner}})).toBe(false);
    });
  });

  describe('defaults', () => {
    it('should create a new object', () => {
      const a = {a: 10, b: 20};
      const b = {a: 40};
      defaults(a, b);
      expect(a).toEqual({a: 10, b: 20});
    });

    it('should override with defined values', () => {
      const a = {
        a1: undefined,
        a2: undefined,
        a3: undefined,
        b1: 'value',
        b2: 'value',
        b3: 'value',
      };
      const b = {
        a1: 'override',
        a2: undefined,
        b1: 'override',
        b2: undefined,
      };
      expect(defaults(a, b)).toEqual({
        a1: 'override',
        a2: undefined,
        a3: undefined,
        b1: 'override',
        b2: 'value',
        b3: 'value',
      });
    });
  });

  describe('getPathPatternMatcher', () => {
    const match = (a: string, b: string) => getPathPatternMatcher(a)(b);

    it('should work properly match paths', () => {
      expect(match('/a/b', '/a/b')).toBe(true);
      expect(match('/a/:var', '/a/b')).toBe(true);
      expect(match('/a/:var1', '/a/:var2')).toBe(true);
      expect(match('/a/b', '/a/:var2')).toBe(false);
      expect(match('/a/b', '/a')).toBe(false);
      expect(match('/something/else', '/something/else/nested')).toBe(false);
      expect(match('/something/else/*', '/something/else/nested')).toBe(true);
      expect(match('/something/else/*', '/something/else/nested/even/deeper')).toBe(true);
    });
  });
});
