import {useContext, useMemo} from 'react';

import PluginsContext from './PluginsContext';
import {orderArray} from './utils';

export const usePluginState = <T>(name: string) => {
  const {scope} = useContext(PluginsContext);
  const pair: [T, (value: T) => void] = [scope.getData<T>(name), scope.setData.bind(scope, name)];
  return pair;
};

export const usePluginSlotList = (name: string, defaults: any[] = []) => {
  const {scope} = useContext(PluginsContext);
  const elements = useMemo(() => orderArray([...defaults, ...scope.getSlot(name)]), [defaults, scope.getSlot(name)]);
  return elements;
};
