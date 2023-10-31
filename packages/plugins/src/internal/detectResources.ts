import {Plugin} from './Plugin';
import {PluginDetails} from './symbols';

export interface PluginResourcesMapping {
  slots: Record<string, Plugin<any>[]>;
  data: Record<string, Plugin<any>[]>;
  optionalSlots: string[];
  optionalData: string[];
}

export const detectResources = (plugins: Plugin<any>[]): PluginResourcesMapping => {
  const slots: Record<string, Plugin<any>[]> = {};
  const data: Record<string, Plugin<any>[]> = {};
  const optionalSlots: string[] = [];
  const optionalData: string[] = [];

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

  plugins.forEach(plugin => {
    Object.keys(plugin[PluginDetails].optionalSlots).forEach(key => {
      if (!slots[key] && !optionalSlots.includes(key)) {
        optionalSlots.push(key);
      }
    });
    Object.keys(plugin[PluginDetails].optionalData).forEach(key => {
      if (!data[key] && !optionalData.includes(key)) {
        optionalData.push(key);
      }
    });
  });

  return {slots, data, optionalSlots, optionalData};
};
