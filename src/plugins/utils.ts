export const insertPluginsToArray = <T>(pluginsArray: any[], array: T[]): T[] => {
  const components = [...array];
  pluginsArray.forEach(plugin => {
    const {index, ...pluginData} = plugin;
    index ? components.splice(index, 0, pluginData) : components.push(pluginData);
  });
  return components;
};
