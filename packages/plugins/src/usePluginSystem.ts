import {FC, PropsWithChildren, ReactElement, createElement, useEffect, useMemo, useRef, useState} from 'react';

import {PluginResolver} from './PluginResolver';
import {PluginEntry} from './internal/Plugin';
import {PluginScope} from './internal/PluginScope';
import {PluginRoute} from './internal/types';

type PluginSystemFC = FC<PropsWithChildren<{initFallback?: ReactElement<any, any> | null}>>;

export const usePluginSystem = (
  plugins: PluginEntry<any>[],
  parent: PluginScope<any> | null = null
): [PluginSystemFC, {scope: PluginScope<any>; routes: PluginRoute[]}] => {
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
  prevScope.current = scope;

  const Provider: PluginSystemFC = useMemo(
    () =>
      ({initFallback, children}) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [initialized, setInitialized] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          setInitialized(true);
        }, []);
        return initFallback != null && !initialized
          ? initFallback
          : createElement(PluginSystemProvider, {root: scope}, children);
      },
    [PluginSystemProvider, scope]
  );

  return [Provider, {scope, routes}];
};
