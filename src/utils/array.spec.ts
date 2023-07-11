import {reorder} from './array';

describe('array', () => {
  describe('reorder', () => {
    it('should correctly reorder an array', () => {
      const list = ['a', 'b', 'c'];
      const result = reorder(list, 0, 2);

      expect(result).toEqual(['b', 'c', 'a']);
    });
  });
});
