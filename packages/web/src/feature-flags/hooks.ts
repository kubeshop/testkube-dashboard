import {useContext} from 'react';

import {FeatureFlagsContext} from './context';

export const useFeatureFlag = (name: string): boolean => {
  const flags = useContext(FeatureFlagsContext);
  return Boolean(flags[name]);
};
