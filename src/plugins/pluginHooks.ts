import {useContext, useMemo} from 'react';

import PluginsContext from './PluginsContext';
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

  const elements = useMemo(() => {
    const slotElement: any[] = scope.getSlot(name);
    slotElement.forEach((e: any) => {
      // by default, all elements are visible,
      // unless visibility is configured explicitly in the metadata
      if (!e.metadata?.visibile) {
        defaults.push(e);
      } else if (e.metadata.visibile(scope.getState(name))) {
        // if visibility is configured, check if the element is visible
        defaults.push(e);
      }
    });
    return orderArray(defaults);
  }, [defaults, scope.getSlot(name)]);
  return elements;
};
