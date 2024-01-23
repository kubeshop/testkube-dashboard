import {renderHook} from '@testing-library/react';

import {countLines, useCountLines} from './utils';

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
  });
});
