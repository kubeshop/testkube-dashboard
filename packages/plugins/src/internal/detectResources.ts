import {Plugin} from './Plugin';
import {PluginDetails} from './symbols';

export interface PluginResourcesMapping {
  slots: Record<string, Plugin<any>[]>;
  data: Record<string, Plugin<any>[]>;
}

export const detectResources = (plugins: Plugin<any>[]): PluginResourcesMapping => {
  const slots: Record<string, Plugin<any>[]> = {};
  const data: Record<string, Plugin<any>[]> = {};

  plugins.forEach(plugin => {
    Object.keys(plugin[PluginDetails].slots).forEach(key => {
      slots[key] = slots[key] || [];
      slots[key].push(plugin);
    });
    Object.keys(plugin[PluginDetails].data).forEach(key => {
      data[key] = data[key] || [];
      data[key].push(plugin);
    });
  });

  return {slots, data};
};
