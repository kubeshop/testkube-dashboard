import {FC, PropsWithChildren, createContext, useState} from 'react';
import {useEvent} from 'react-use';

export const FeatureFlagsContext = createContext<Record<string, boolean>>({});

export const FeatureFlagsProvider: FC<PropsWithChildren<{}>> = ({children}) => {
  const [flags, setFlags] = useState({});
  useEvent('feature-flags', ({data}) => setFlags({...flags, ...data}));
  return <FeatureFlagsContext.Provider value={flags}>{children}</FeatureFlagsContext.Provider>;
};
