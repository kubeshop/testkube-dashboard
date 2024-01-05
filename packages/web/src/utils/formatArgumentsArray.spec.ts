import {formatArgumentsArray} from './formatArgumentsArray';

describe('utils', () => {
  describe('formatArgumentsArray', () => {
    it('should handle empty array', () => {
      expect(formatArgumentsArray([])).toEqual([]);
    });

    it('should handle array with one argument', () => {
      expect(formatArgumentsArray(['abc'])).toEqual(['abc']);
    });

    it('should handle array with multiple arguments', () => {
      expect(formatArgumentsArray(['abc', 'def'])).toEqual(['abc', 'def']);
    });

    it('should handle array with multiple arguments with spaces', () => {
      expect(formatArgumentsArray(['ab c', 'de f'])).toEqual(['"ab c"', '"de f"']);
    });
  });
});
