import {PluginKeys, Plugins} from '@src/contexts/PluginsContext';

export class PluginManager {
  private plugins: Plugins;

  public constructor(plugins?: Plugins) {
    plugins ? (this.plugins = plugins) : (this.plugins = initDefaultPlugins());
  }

  public get<T>(key: PluginKeys): T[] {
    return this.plugins[key];
  }

  public getAll(): Plugins {
    return this.plugins;
  }

  public add<T>(key: PluginKeys, plugin: T): void {
    this.plugins[key].push(plugin);
  }

  public addAtIndex<T>(key: PluginKeys, plugin: T, index: number): void {
    this.plugins[key].splice(index, 0, plugin);
  }
}

const createPluginManager = (plugins?: Plugins) => new PluginManager(plugins);

export const initDefaultPlugins = () => {
  return {
    executionDetailTabs: [],
  };
};

export default createPluginManager;
