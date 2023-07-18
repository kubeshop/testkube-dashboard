export const insertPluginsToArray = <T>(pluginsArray: any[], array: T[]): T[] => {
  const components = [...array];
  pluginsArray.forEach(plugin => {
    const {priority, ...pluginData} = plugin;
    priority ? components.splice(priority, 0, pluginData) : components.push(pluginData);
  });
  return components;
};
