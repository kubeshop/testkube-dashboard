import {act, renderHook} from '@testing-library/react';

import useLoadingIndicator from './useLoadingIndicator';

describe('useLoadingIndicator', () => {
  it('should return isLoading as false by default', () => {
    const {result} = renderHook(() => useLoadingIndicator());
    expect(result.current.isLoading).toBe(false);
  });

  it('should set isLoading to true when handleLoading is called', () => {
    const {result} = renderHook(() => useLoadingIndicator());
    act(() => {
      result.current.handleLoading();
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('should set isLoading to false after timeoutInterval when handleLoading is called', () => {
    jest.useFakeTimers();
    const {result} = renderHook(() => useLoadingIndicator(1000));
    act(() => {
      result.current.handleLoading();
    });
    expect(result.current.isLoading).toBe(true);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.isLoading).toBe(false);
  });
});
