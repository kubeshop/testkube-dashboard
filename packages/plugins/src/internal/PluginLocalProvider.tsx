import {FC, PropsWithChildren, useContext} from 'react';

import type {Plugin} from './Plugin';
import {PluginRootContext} from './PluginRootScopeProvider';
import {PluginScopeCallSync, PluginScopeChildrenScope} from './symbols';

export const PluginLocalProvider: FC<PropsWithChildren<{plugin: Plugin<any>}>> = ({plugin, children}) => {
  const {root} = useContext(PluginRootContext);
  root[PluginScopeChildrenScope].get(plugin)![PluginScopeCallSync]();
  return <>{children}</>;
};
