import {PluginData} from './PluginsContext';

export const insertPluginsToArray = <T, K>(pluginsArray: PluginData[], array: T[], props: K): T[] => {
  const components = [...array];
  pluginsArray.forEach(plugin => {
    const {priority, getComponent} = plugin;
    priority ? components.splice(priority, 0, getComponent(props)) : components.push(getComponent(props));
  });
  return components;
};
