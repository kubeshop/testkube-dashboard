import {detectCircularDependencies} from './detectCircularDependencies';

describe('plugins', () => {
  describe('detectCircularDependencies', () => {
    it('should not have false positives', () => {
      const deps = new Map([
        [0, new Set([1])],
        [1, new Set([2])],
        [2, new Set([])],
        [3, new Set([1, 2])],
        [4, new Set([1])],
        [5, new Set([])],
      ]);
      expect(detectCircularDependencies(deps)).toEqual([]);
    });

    it('should detect self-circular dependency', () => {
      const deps = new Map([
        [0, new Set([1, 0])],
        [1, new Set([2])],
        [2, new Set([])],
        [3, new Set([1, 2])],
        [4, new Set([1])],
        [5, new Set([])],
      ]);
      expect(detectCircularDependencies(deps)).toEqual([{from: 0, through: 0}]);
    });

    it('should detect simple circular dependency', () => {
      const deps = new Map([
        [0, new Set([1])],
        [1, new Set([2, 0])],
        [2, new Set([])],
        [3, new Set([1, 2])],
        [4, new Set([1])],
        [5, new Set([])],
      ]);
      expect(detectCircularDependencies(deps)).toEqual([
        {from: 0, through: 1},
        {from: 1, through: 0},
      ]);
    });

    it('should detect long circular dependency', () => {
      const deps = new Map([
        [0, new Set([1])],
        [1, new Set([2])],
        [2, new Set([3])],
        [3, new Set([1, 2])],
        [4, new Set([1])],
        [5, new Set([])],
      ]);
      expect(detectCircularDependencies(deps)).toEqual([
        {from: 1, through: 2},
        {from: 2, through: 3},
        {from: 3, through: 1},
        {from: 3, through: 2},
      ]);
    });
  });
});
