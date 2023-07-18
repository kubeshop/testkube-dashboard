import {Plugin, PluginSlots} from '@plugins/PluginsContext';

export class PluginManager {
  private plugins: Plugin[];

  public constructor() {
    this.plugins = [];
  }

  public add(plugin: Plugin): void {
    plugin.order ? this.plugins.splice(plugin.order, 0, plugin) : this.plugins.push(plugin);
  }

  public setup(): PluginSlots {
    const pluginSlots: PluginSlots = {
      executionDetailsTabs: [],
    };
    this.plugins.forEach(plugin => {
      plugin.setup(pluginSlots);
    });

    return pluginSlots;
  }
}

const createPluginManager = () => new PluginManager();

export default createPluginManager;
