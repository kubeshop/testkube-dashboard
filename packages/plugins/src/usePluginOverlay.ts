import {FC, PropsWithChildren, ReactElement, createElement, useCallback} from 'react';

import {Plugin, PluginEntry} from './internal/Plugin';
import {PluginOverlay} from './internal/PluginOverlay';

export const usePluginOverlay = (plugins: PluginEntry<any>[]) => {
  const createProviderTree = useCallback((overlays: PluginOverlay[], children: ReactElement): ReactElement => {
    if (overlays.length === 0) {
      return children;
    }

    const lastOverlay = overlays[overlays.length - 1];
    const provider = lastOverlay.useProvider();
    const newChildren = provider ? createElement(provider.type, provider.props, children) : children;

    return createProviderTree(overlays.slice(0, -1), newChildren);
  }, []);

  const ProviderComponent = useCallback<FC<PropsWithChildren<any>>>(
    ({children}) =>
      createProviderTree(
        plugins.filter((plugin): plugin is Plugin<any> => 'overlay' in plugin).map(plugin => plugin.overlay),
        children
      ),
    [createProviderTree]
  );

  return ProviderComponent;
};
