import {escapeArguments} from './escapeArguments';

describe('utils', () => {
  describe('escapeArguments', () => {
    it('should handle empty array', () => {
      expect(escapeArguments([])).toEqual([]);
    });

    it('should handle array with one argument', () => {
      expect(escapeArguments(['abc'])).toEqual(['abc']);
    });

    it('should handle array with multiple arguments', () => {
      expect(escapeArguments(['abc', 'def'])).toEqual(['abc', 'def']);
    });

    it('should handle array with multiple arguments with spaces', () => {
      expect(escapeArguments(['ab c', 'de f'])).toEqual(['"ab c"', '"de f"']);
    });

    it('should handle array with multiple arguments with quotes', () => {
      expect(escapeArguments(['ab"c', 'de"f'])).toEqual(['ab"c', 'de"f']);
    });

    it('should handle array with multiple arguments with spaces and quotes', () => {
      expect(escapeArguments(['ab"c', 'de f'])).toEqual(['ab"c', '"de f"']);
    });
  });
});
