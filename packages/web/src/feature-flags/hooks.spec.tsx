import {renderHook} from '@testing-library/react';

import {FeatureFlagsContext} from './context';
import {useFeatureFlag} from './hooks';

describe('useFeatureFlag', () => {
  it('should return true if the feature flag is enabled', () => {
    const flags = {'my-feature': true};
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <FeatureFlagsContext.Provider value={flags}>{children}</FeatureFlagsContext.Provider>
    );
    const {result} = renderHook(() => useFeatureFlag('my-feature'), {wrapper});
    expect(result.current).toBe(true);
  });

  it('should return false if the feature flag is disabled', () => {
    const flags = {'my-feature': false};
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <FeatureFlagsContext.Provider value={flags}>{children}</FeatureFlagsContext.Provider>
    );
    const {result} = renderHook(() => useFeatureFlag('my-feature'), {wrapper});
    expect(result.current).toBe(false);
  });

  it('should return false if the feature flag is not defined', () => {
    const flags = {};
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <FeatureFlagsContext.Provider value={flags}>{children}</FeatureFlagsContext.Provider>
    );
    const {result} = renderHook(() => useFeatureFlag('my-feature'), {wrapper});
    expect(result.current).toBe(false);
  });
});
