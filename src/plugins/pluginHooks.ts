import {useCallback, useContext, useMemo} from 'react';

import PluginsContext from './PluginsContext';
import {orderArray} from './utils';

export const usePluginState = <T>(name: string) => {
  const {scope} = useContext(PluginsContext);
  const setStateCallback = useCallback((value: any) => scope.setState.bind(name, value), [name, scope]);
  const pair: [T, (value: T) => void] = [scope.getState<T>(name), setStateCallback];
  return pair;
};

export const usePluginSlotList = (name: string, defaults: any[] = []) => {
  const {scope} = useContext(PluginsContext);
  const elements = useMemo(() => orderArray([...defaults, ...scope.getSlot(name)]), [defaults, scope.getSlot(name)]);
  return elements;
};
