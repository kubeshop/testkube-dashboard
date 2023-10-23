import {pick, shallowEqual} from './utils';

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
});
