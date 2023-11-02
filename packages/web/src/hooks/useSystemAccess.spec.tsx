import {renderHook} from '@testing-library/react';

import {PluginScopeMockProvider} from '@testkube/plugins/test';

import {SystemAccess, useSystemAccess} from './useSystemAccess';

describe('useSystemAccess', () => {
  const createWrapper =
    (isSystemAvailable: boolean, isClusterAvailable: boolean) =>
    ({children}: {children?: React.ReactNode}) =>
      <PluginScopeMockProvider data={{isSystemAvailable, isClusterAvailable}}>{children}</PluginScopeMockProvider>;

  it('should return SystemAccess.offline when isSystemAvailable is false', () => {
    const {result} = renderHook(() => useSystemAccess(), {wrapper: createWrapper(false, false)});
    expect(result.current).toBe(SystemAccess.offline);
  });

  it('should return SystemAccess.system when isClusterAvailable is false', () => {
    const {result} = renderHook(() => useSystemAccess(), {wrapper: createWrapper(true, false)});
    expect(result.current).toBe(SystemAccess.system);
  });

  it('should return SystemAccess.agent when both isSystemAvailable and isClusterAvailable are true', () => {
    const {result} = renderHook(() => useSystemAccess(), {wrapper: createWrapper(true, true)});
    expect(result.current).toBe(SystemAccess.agent);
  });

  it('should check currentSystemAccess when agent is online', () => {
    const {result} = renderHook(() => useSystemAccess(SystemAccess.system), {wrapper: createWrapper(true, true)});
    expect(result.current).toBe(true);
  });

  it('should check currentSystemAccess when agent is offline', () => {
    const {result} = renderHook(() => useSystemAccess(SystemAccess.agent), {wrapper: createWrapper(true, false)});
    expect(result.current).toBe(false);
  });
});
