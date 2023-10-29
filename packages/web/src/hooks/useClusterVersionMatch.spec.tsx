import {renderHook} from '@testing-library/react';

import MainContext from '@contexts/MainContext';

import {mockMainContextValue} from '@src/utils/mocks';

import useClusterVersionMatch from './useClusterVersionMatch';

describe('useClusterVersionMatch', () => {
  const wrapper = ({children}: {children: any}) => (
    <MainContext.Provider value={mockMainContextValue}>{children}</MainContext.Provider>
  );

  it('should return true if the cluster version matches the required version', () => {
    const requiredVersion = 'v1.2.3';
    const clusterVersion = 'v1.2.3';

    const {result} = renderHook(() => useClusterVersionMatch(requiredVersion, clusterVersion), {wrapper});

    expect(result.current).toBe(true);
  });

  it('should return false if the cluster version does not match the required version', () => {
    const requiredVersion = 'v1.20.0';

    const {result} = renderHook(() => useClusterVersionMatch(requiredVersion), {wrapper});

    expect(result.current).toBe(false);
  });

  it('should return false if the cluster version does not match the required version', () => {
    const requiredVersion = 'v1.20.0';
    const defaultClusterVersion = 'v1.19.0';
    const emptyWrapper = ({children}: {children: any}) => (
      <MainContext.Provider value={{...mockMainContextValue, clusterVersion: undefined}}>
        {children}
      </MainContext.Provider>
    );

    const {result} = renderHook(() => useClusterVersionMatch(requiredVersion, defaultClusterVersion), {
      wrapper: emptyWrapper,
    });

    expect(result.current).toBe('v1.19.0');
  });
});
