import {Plugin} from './Plugin';
import {detectResources} from './detectResources';
import {PluginDetails} from './symbols';

export type PluginDependencyMap = Map<Plugin<any>, Set<Plugin<any>>>;

export const detectDirectDependencies = (
  plugins: Plugin<any>[]
): {hard: PluginDependencyMap; loose: PluginDependencyMap} => {
  const hard: PluginDependencyMap = new Map();
  const loose: PluginDependencyMap = new Map();
  const {slots, data} = detectResources(plugins);

  plugins.forEach(plugin => {
    const ownDeps: Set<Plugin<any>> = new Set();
    const ownLooseDeps: Set<Plugin<any>> = new Set();
    Object.keys(plugin[PluginDetails].externalData).forEach(key => {
      data[key]?.forEach(x => ownDeps.add(x));
      data[key]?.forEach(x => ownLooseDeps.add(x));
    });
    Object.keys(plugin[PluginDetails].externalSlots).forEach(key => {
      slots[key]?.forEach(x => ownDeps.add(x));
    });
    hard.set(plugin, ownDeps);
    loose.set(plugin, ownLooseDeps);
  });

  return {hard, loose};
};
