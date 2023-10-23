import {act, renderHook} from '@testing-library/react';

import {useCopyToClipboard} from './useCopyToClipboard';

Object.assign(navigator, {clipboard: {writeText: jest.fn().mockImplementation(() => Promise.resolve())}});
Object.assign(global, {prompt: jest.fn().mockReturnValue('')});

describe('useCopyToClipboard', () => {
  it('should copy text to clipboard', () => {
    const textToCopy = 'Hello, world!';
    const {result} = renderHook(() => useCopyToClipboard(textToCopy));

    act(() => {
      result.current.setCopyToClipboardState(true);
    });

    expect(result.current.isCopied).toBe(true);
  });

  it('should copy text to clipboard when textToCopy is a function', () => {
    const textToCopy = jest.fn().mockReturnValue('Hello, world!');
    const {result} = renderHook(() => useCopyToClipboard(textToCopy));

    act(() => {
      result.current.setCopyToClipboardState(true);
    });

    expect(result.current.isCopied).toBe(true);
    expect(textToCopy).toHaveBeenCalled();
  });

  it('should not copy text to clipboard when setCopyToClipboardState is false', () => {
    const textToCopy = 'Hello, world!';
    const {result} = renderHook(() => useCopyToClipboard(textToCopy));

    act(() => {
      result.current.setCopyToClipboardState(false);
    });

    expect(result.current.isCopied).toBe(false);
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  //   it('should reset isCopied after timeout', () => {
  //     jest.useFakeTimers();
  //     const textToCopy = 'Hello, world!';
  //     const timeoutInMs = 5000;
  //     const {result} = renderHook(() => useCopyToClipboard(textToCopy, {timeoutInMs}));

  //     act(() => {
  //       result.current.setCopyToClipboardState(true);
  //     });

  //     expect(result.current.isCopied).toBe(true);

  //     jest.advanceTimersByTime(6000);

  //     console.log('timeout finished in test');
  //     expect(result.current.isCopied).toBe(false);
  //   });
});
