import {renderHook} from '@testing-library/react';

import {useLastCallback} from './useLastCallback';

describe('useLastCallback', () => {
  it('should return a function that always calls the latest version of the callback', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const {result, rerender} = renderHook(cb => useLastCallback(cb), {
      initialProps: callback1,
    });

    const callback1Result = result.current;
    expect(callback1).not.toHaveBeenCalled();

    rerender(callback2);
    expect(callback2).not.toHaveBeenCalled();

    callback1Result();
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();

    rerender(callback1);
    expect(result.current).toBe(callback1Result);

    callback1Result();
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should not fail without a callback', () => {
    const {result, rerender} = renderHook(cb => useLastCallback(undefined));
    expect(() => result.current()).not.toThrow();

    rerender(null);
    expect(() => result.current()).not.toThrow();
  });
});
