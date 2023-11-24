import {act, render} from '@testing-library/react';
import parser from 'cron-parser';

import NextExecution from './NextExecution';

describe('organisms', () => {
  describe('SettingsScheduling', () => {
    describe('NextExecution', () => {
      beforeEach(() => {
        jest.useFakeTimers('modern').setSystemTime(new Date('2023-11-24T10:03:33'));
      });

      const expression = parser.parseExpression('*/1 * * * *');

      it('should display error', () => {
        const result = render(<NextExecution error />);
        expect(result.container.textContent).toEqual('Invalid cron format');
      });

      it('should display information about no schedule', () => {
        const result = render(<NextExecution />);
        expect(result.container.textContent).toEqual('Not scheduled');
      });

      it('should display time', () => {
        const result = render(<NextExecution expression={expression} />);
        expect(result.container.textContent).toEqual('in 27 seconds');
      });

      it('should show now when the time is very near', () => {
        const result = render(<NextExecution expression={expression} />);
        act(() => {
          jest.advanceTimersByTime(26999);
        });
        expect(result.container.textContent).toEqual('now');
      });

      it('should iterate with next value after queue passed', () => {
        const result = render(<NextExecution expression={expression} />);
        act(() => {
          jest.advanceTimersByTime(30000);
        });
        expect(result.container.textContent).toEqual('in 57 seconds');
      });
    });
  });
});
