import {Plugin} from './Plugin';
import {PluginDetails} from './symbols';

export interface PluginResourcesMapping {
  slots: Record<string, Plugin<any>[]>;
  data: Record<string, Plugin<any>[]>;
  outerSlots: string[];
  outerData: string[];
}

export const detectResources = (plugins: Plugin<any>[]): PluginResourcesMapping => {
  const slots: Record<string, Plugin<any>[]> = {};
  const data: Record<string, Plugin<any>[]> = {};
  const outerSlots: string[] = [];
  const outerData: string[] = [];

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
    Object.keys(plugin[PluginDetails].outerSlots).forEach(key => {
      if (!slots[key] && !outerSlots.includes(key)) {
        outerSlots.push(key);
      }
    });
    Object.keys(plugin[PluginDetails].outerData).forEach(key => {
      if (!data[key] && !outerData.includes(key)) {
        outerData.push(key);
      }
    });
  });

  return {slots, data, outerSlots, outerData};
};
