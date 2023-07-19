import {PluginData} from './PluginsContext';

export const insertPluginsToArray = <T, K>(pluginsArray: PluginData[], array: T[], props: K): T[] => {
  const components = [...array];
  pluginsArray.forEach(plugin => {
    const {getComponent} = plugin;

    const order = plugin.order ?? -Infinity;
    const indexToInsert = components.findIndex((item, index) => index < order);
    if (indexToInsert === -1) {
      components.push(getComponent(props));
    } else {
      components.splice(order, 0, getComponent(props));
    }
  });
  return components;
};
