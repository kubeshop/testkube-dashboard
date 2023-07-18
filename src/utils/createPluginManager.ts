import {PluginData, PluginKeys, Plugins} from '@contexts/PluginsContext';

export class PluginManager {
  private plugins: Plugins;

  public constructor(plugins?: Plugins) {
    plugins ? (this.plugins = plugins) : (this.plugins = initDefaultPlugins());
  }

  public get(key: PluginKeys): PluginData[] {
    return this.plugins[key];
  }

  public getAll(): Plugins {
    return this.plugins;
  }

  public add(key: PluginKeys, plugin: PluginData): void {
    this.plugins[key].push(plugin);
  }

  public insertPluginsToArray<T>(key: PluginKeys, array: T[]): T[] {
    const components = [...array];
    this.plugins[key].forEach(plugin => {
      plugin.index ? components.splice(plugin.index, 0, plugin.data) : components.push(plugin.data);
    });
    return components;
  }
}

const createPluginManager = (plugins?: Plugins) => new PluginManager(plugins);

export const initDefaultPlugins = () => {
  return {
    executionDetailTabs: [],
  };
};

export default createPluginManager;
