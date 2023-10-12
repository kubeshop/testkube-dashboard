import {FC, PropsWithChildren, createContext, useContext, useMemo} from 'react';

import {PluginRootScope as PluginRootScopeType} from './PluginRootScope';
import {PluginScopeCallSync} from './symbols';

export const PluginRootContext = createContext<{root: PluginRootScopeType<any>}>(undefined as any);

export const PluginRootScopeProvider: FC<PropsWithChildren<{root: PluginRootScopeType<any>}>> = ({root, children}) => {
  const value = useMemo(() => ({root}), [root]);
  return <PluginRootContext.Provider value={value}>{children}</PluginRootContext.Provider>;
};

export const PluginRootScopeSyncProvider: FC<PropsWithChildren<{}>> = ({children}) => {
  useContext(PluginRootContext).root[PluginScopeCallSync]();
  return <>{children}</>;
};
