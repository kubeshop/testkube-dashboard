import {prettifyArguments} from './prettifyArguments';

describe('utils', () => {
  describe('prettifyArguments', () => {
    it('should handle empty string', () => {
      expect(prettifyArguments('')).toBe('');
      expect(prettifyArguments('  \t \n  ')).toBe('');
    });

    it('should support options with no quoted arguments', () => {
      expect(prettifyArguments(`-c . --dash-value --value abc`)).toBe(`-c
.
--dash-value
--value
abc`);
    });

    it('should support options with no quoted arguments', () => {
      expect(prettifyArguments(`-c . --dash-value --value abc`)).toBe(`-c
.
--dash-value
--value
abc`);
    });

    it('should handle quoted simple arguments', () => {
      expect(prettifyArguments(`-c 'abc' --value "abc" --value2="abc" --value3='def'`)).toBe(`-c
'abc'
--value
"abc"
--value2="abc"
--value3='def'`);
    });

    it('should handle quoted arguments with spaces', () => {
      expect(prettifyArguments(`-c 'ab c' --value "ab c" --value2="ab c" --value3='de f'`)).toBe(`-c
'ab c'
--value
"ab c"
--value2="ab c"
--value3='de f'`);
    });

    it('should handle quoted arguments with different quotes inside', () => {
      expect(prettifyArguments(`-c 'ab "c' --value "ab 'c" --value2="ab 'c" --value3='de "f'`)).toBe(`-c
'ab "c'
--value
"ab 'c"
--value2="ab 'c"
--value3='de "f'`);
    });

    it('should handle quoted arguments with escaped quotes inside', () => {
      expect(prettifyArguments(`-c 'ab \\'c' --value "ab \\"c" --value2="ab \\"c" --value3='de \\'f'`)).toBe(`-c
'ab \\'c'
--value
"ab \\"c"
--value2="ab \\"c"
--value3='de \\'f'`);
    });

    it('should handle quoted arguments with escaped quotes inside', () => {
      expect(prettifyArguments(`-c 'ab \\'c' --value "ab \\"c" --value2="ab \\"c" --value3='de \\'f'`)).toBe(`-c
'ab \\'c'
--value
"ab \\"c"
--value2="ab \\"c"
--value3='de \\'f'`);
    });

    it('should handle escaped spaces', () => {
      expect(prettifyArguments(`-c ab\\ c\\ def\\\tghi another\\\nabcdef`)).toBe(`-c
ab\\ c\\ def\\\tghi
another\\
abcdef`);
    });
  });
});
