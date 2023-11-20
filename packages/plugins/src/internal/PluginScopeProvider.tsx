import {FC, PropsWithChildren, createContext, useMemo} from 'react';

import {PluginScope} from './PluginScope';

export const PluginScopeContext = createContext<{root: PluginScope<any>}>(undefined as any);

export const PluginScopeProvider: FC<PropsWithChildren<{root: PluginScope<any>}>> = ({root, children}) => {
  const value = useMemo(() => ({root}), [root]);
  return <PluginScopeContext.Provider value={value}>{children}</PluginScopeContext.Provider>;
};
