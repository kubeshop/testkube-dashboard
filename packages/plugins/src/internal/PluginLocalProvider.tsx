import {FC, PropsWithChildren, useContext} from 'react';

import type {Plugin} from './Plugin';
import {PluginScopeContext} from './PluginScopeProvider';
import {PluginScopeCallSync, PluginScopeChildrenScope} from './symbols';

export const PluginLocalProvider: FC<PropsWithChildren<{plugin: Plugin<any>}>> = ({plugin, children}) => {
  const {root} = useContext(PluginScopeContext);
  root[PluginScopeChildrenScope].get(plugin)![PluginScopeCallSync]();
  return <>{children}</>;
};
