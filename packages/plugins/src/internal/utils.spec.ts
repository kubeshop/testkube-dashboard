import {pick} from './utils';

describe('plugins', () => {
  describe('pick', () => {
    it('should pick values correctly', () => {
      const result = pick({abc: true, def: 'xyz'} as any, ['abc', 'unknown']);
      expect(Object.keys(result)).toEqual(['abc', 'unknown']);
      expect(result).toEqual({abc: true, unknown: undefined});
    });
  });
});
