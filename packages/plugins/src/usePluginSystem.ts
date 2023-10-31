import {FC, PropsWithChildren, createElement, useEffect, useMemo, useRef} from 'react';

import {PluginResolver} from './PluginResolver';
import {PluginEntry} from './internal/Plugin';
import {PluginScope} from './internal/PluginScope';
import {PluginRoute} from './internal/types';

export const usePluginSystem = (
  plugins: PluginEntry<any>[],
  parent: PluginScope<any> | null = null
): [FC<PropsWithChildren<{}>>, {scope: PluginScope<any>; routes: PluginRoute[]}] => {
  // Preserve plugins identity
  const pluginsRef = useRef(plugins);
  if (pluginsRef.current.length !== plugins.length || pluginsRef.current.some((x, i) => x !== plugins[i])) {
    pluginsRef.current = plugins;
  }

  const [PluginSystemProvider, {initialize, routes}] = useMemo(
    () => PluginResolver.of(...pluginsRef.current).resolve(),
    [pluginsRef.current]
  );

  // TODO: Nicer way of destroying previous scope.
  const prevScope = useRef<PluginScope<any> | null>(null);
  useMemo(() => prevScope.current?.destroy(), [initialize, parent]);
  const scope = useMemo(() => initialize(parent), [initialize, parent]);
  useEffect(() => () => scope.destroy(), []);
  prevScope.current = scope;

  const Provider: FC<PropsWithChildren<{}>> = useMemo(
    () =>
      ({children}) =>
        createElement(PluginSystemProvider, {root: scope}, children),
    [PluginSystemProvider, scope]
  );

  return [Provider, {scope, routes}];
};
