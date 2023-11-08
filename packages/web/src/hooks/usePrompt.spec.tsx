import {UNSAFE_NavigationContext as NavigationContext, Navigator} from 'react-router-dom';

import {act, renderHook} from '@testing-library/react';

import {usePrompt} from './usePrompt';

describe('usePrompt', () => {
  let navigationContextValue: {
    basename: string;
    navigator: Navigator;
    static: boolean;
  };

  beforeEach(() => {
    navigationContextValue = {
      basename: 'basename',
      navigator: {
        createHref: jest.fn(),
        go: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
      },
      static: true,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not block navigation when condition is false', () => {
    const navigatorSpyOn = jest.spyOn(navigationContextValue.navigator, 'push').mockImplementation().mockClear();
    renderHook(() => usePrompt('Are you sure?', () => false), {
      wrapper: ({children}) => (
        <NavigationContext.Provider value={navigationContextValue}>{children}</NavigationContext.Provider>
      ),
    });

    act(() => {
      navigationContextValue.navigator.push('/some-path');
    });

    expect(navigatorSpyOn).toHaveBeenCalledWith('/some-path');
  });

  it('should block navigation when condition is true', () => {
    const navigatorSpyOn = jest.spyOn(navigationContextValue.navigator, 'push').mockImplementation().mockClear();
    renderHook(() => usePrompt('Are you sure?', () => true), {
      wrapper: ({children}) => (
        <NavigationContext.Provider value={navigationContextValue}>{children}</NavigationContext.Provider>
      ),
    });

    act(() => {
      navigationContextValue.navigator.push('/some-path');
    });

    expect(navigatorSpyOn).toHaveBeenCalledTimes(0);
  });

  it('should block navigation when when condition becomes true', () => {
    let navigatorSpyOn = jest.spyOn(navigationContextValue.navigator, 'push');
    const {rerender} = renderHook(({when}) => usePrompt('Are you sure?', when), {
      initialProps: {when: () => false},
      wrapper: ({children}) => (
        <NavigationContext.Provider value={navigationContextValue}>{children}</NavigationContext.Provider>
      ),
    });

    act(() => {
      navigationContextValue.navigator.push('/some-path');
    });

    expect(navigatorSpyOn).toHaveBeenCalledWith('/some-path');
    expect(navigatorSpyOn).toHaveBeenCalledTimes(1);

    rerender({when: () => true});

    act(() => {
      navigationContextValue.navigator.push('/some-path');
    });

    // not called again, when condition callback is true
    expect(navigatorSpyOn).toHaveBeenCalledTimes(1);
  });
});
