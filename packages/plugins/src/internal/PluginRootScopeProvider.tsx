import {FC, PropsWithChildren, createContext, useMemo} from 'react';

import {PluginRootScope as PluginRootScopeType} from './PluginRootScope';

export const PluginRootContext = createContext<{root: PluginRootScopeType<any>}>(undefined as any);

export const PluginRootScopeProvider: FC<PropsWithChildren<{root: PluginRootScopeType<any>}>> = ({root, children}) => {
  const value = useMemo(() => ({root}), [root]);
  return <PluginRootContext.Provider value={value}>{children}</PluginRootContext.Provider>;
};
