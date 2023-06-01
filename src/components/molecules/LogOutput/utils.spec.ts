import {renderHook} from '@testing-library/react';

import {countLines, getLastLines, useCountLines, useLastLines} from './utils';

describe('molecules', () => {
  describe('LogOutput', () => {
    describe('countLines', () => {
      it('should always have at least single line', () => {
        expect(countLines('')).toBe(1);
        expect(countLines('there is some text')).toBe(1);
      });

      it('should ignore carriage returns', () => {
        expect(countLines('there is\rsome\rother')).toBe(1);
      });

      it('should count empty lines', () => {
        expect(countLines('\n')).toBe(2);
        expect(countLines('there\n\n')).toBe(3);
      });

      it('should count many lines', () => {
        expect(countLines('abc\n'.repeat(100))).toBe(101);
        expect(countLines('\nabc'.repeat(100))).toBe(101);
        expect(countLines('\nabc'.repeat(100).substring(1))).toBe(100);
      });
    });

    describe('getLastLines', () => {
      it('should return whole text when does not have enough lines', () => {
        expect(getLastLines('abc', 1)).toBe('abc');
        expect(getLastLines('abc', 10)).toBe('abc');
        expect(getLastLines('abc\ndef', 10)).toBe('abc\ndef');
      });

      it('should cut text to last lines', () => {
        expect(getLastLines('abc\n'.repeat(100), 10)).toBe('abc\n'.repeat(9));
        expect(getLastLines('\nabc'.repeat(100), 10)).toBe('\nabc'.repeat(10).substring(1));
      });
    });

    describe('useCountLines', () => {
      it('should return number of lines', () => {
        const {result} = renderHook(() => useCountLines('\nabc'.repeat(100)));
        expect(result.current).toBe(101);
      });

      it('should react to text change', () => {
        const {result, rerender} = renderHook(({text}) => useCountLines(text), {
          initialProps: {text: '\nabc'.repeat(100)},
        });
        rerender({text: '\nabc'.repeat(1000)});
        expect(result.current).toBe(1001);
      });
    });

    describe('useLastLines', () => {
      it('should return all text when there is less lines', () => {
        const {result} = renderHook(() => useLastLines('\nabc'.repeat(100), 1000));
        expect(result.current).toBe('\nabc'.repeat(100));
      });

      it('should cut text to last lines', () => {
        const {result} = renderHook(() => useLastLines('abc\n'.repeat(100), 10));
        expect(result.current).toBe('abc\n'.repeat(9));
      });

      it('should react to text change', () => {
        const {result, rerender} = renderHook(({text}) => useLastLines(text, 200), {
          initialProps: {text: '\nabc'.repeat(100)},
        });
        rerender({text: 'abc\n'.repeat(1000)});
        expect(result.current).toBe('abc\n'.repeat(199));
      });

      it('should react to lines change', () => {
        const {result, rerender} = renderHook(({max}) => useLastLines('abc\n'.repeat(1000), max), {
          initialProps: {max: 100},
        });
        rerender({max: 200});
        expect(result.current).toBe('abc\n'.repeat(199));
      });
    });
  });
});
