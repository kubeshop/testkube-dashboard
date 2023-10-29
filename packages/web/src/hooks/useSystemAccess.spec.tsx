import {renderHook} from '@testing-library/react';

import MainContext from '@contexts/MainContext';

import {SystemAccess, useSystemAccess} from './useSystemAccess';

describe('useSystemAccess', () => {
  it('should return SystemAccess.offline when isSystemAvailable is false', () => {
    const wrapper = ({children}: {children?: React.ReactNode}) => (
      <MainContext.Provider value={{isSystemAvailable: false, isClusterAvailable: false}}>
        {children}
      </MainContext.Provider>
    );
    const {result} = renderHook(() => useSystemAccess(), {wrapper});
    expect(result.current).toBe(SystemAccess.offline);
  });

  it('should return SystemAccess.system when isClusterAvailable is false', () => {
    const wrapper = ({children}: {children?: React.ReactNode}) => (
      <MainContext.Provider value={{isSystemAvailable: true, isClusterAvailable: false}}>
        {children}
      </MainContext.Provider>
    );
    const {result} = renderHook(() => useSystemAccess(), {wrapper});
    expect(result.current).toBe(SystemAccess.system);
  });

  it('should return SystemAccess.agent when both isSystemAvailable and isClusterAvailable are true', () => {
    const wrapper = ({children}: {children?: React.ReactNode}) => (
      <MainContext.Provider value={{isSystemAvailable: true, isClusterAvailable: true}}>
        {children}
      </MainContext.Provider>
    );
    const {result} = renderHook(() => useSystemAccess(), {wrapper});
    expect(result.current).toBe(SystemAccess.agent);
  });

  it('should check currentSystemAccess when agent is online', () => {
    const wrapper = ({children}: {children?: React.ReactNode}) => (
      <MainContext.Provider value={{isSystemAvailable: true, isClusterAvailable: true}}>
        {children}
      </MainContext.Provider>
    );
    const {result} = renderHook(() => useSystemAccess(SystemAccess.system), {wrapper});
    expect(result.current).toBe(true);
  });

  it('should check currentSystemAccess when agent is offline', () => {
    const wrapper = ({children}: {children?: React.ReactNode}) => (
      <MainContext.Provider value={{isSystemAvailable: true, isClusterAvailable: false}}>
        {children}
      </MainContext.Provider>
    );
    const {result} = renderHook(() => useSystemAccess(SystemAccess.agent), {wrapper});
    expect(result.current).toBe(false);
  });
});
