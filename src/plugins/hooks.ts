import {useContext, useMemo} from 'react';

import {PluginsContext} from './context';
import {orderArray} from './utils';

export const usePluginState = <T>(name: string) => {
  const {scope} = useContext(PluginsContext);
  const setStateCallback = useMemo(() => scope.setState.bind(scope, name), [name, scope]);
  const pair: [T, (value: T) => void] = [scope.getState<T>(name), setStateCallback];
  return pair;
};

export const usePluginSlot = (name: string) => usePluginSlotList(name)[0];

export const usePluginSlotList = (name: string, defaults: any[] = []) => {
  const {scope} = useContext(PluginsContext);

  // by default, all elements are visible,
  // unless visibility is configured explicitly in the metadata
  const elements = useMemo(
    () => orderArray([...defaults, ...scope.getSlot(name)].filter(x => !x.metadata?.visible || x.metadata.visible())),
    [defaults, scope.getSlot(name)]
  );
  return elements;
};
