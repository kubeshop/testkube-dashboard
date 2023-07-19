import {Plugin, PluginItems} from '@plugins/PluginsContext';

export class PluginManager {
  private plugins: Plugin[];

  public constructor() {
    this.plugins = [];
  }

  public add(plugin: Plugin): void {
    const order = plugin.order ?? -Infinity;
    const index = this.plugins.findIndex(item => item.order && item.order < order);
    if (index === -1) {
      this.plugins = [...this.plugins, plugin];
    } else {
      this.plugins = [...this.plugins.slice(0, index), plugin, ...this.plugins.slice(index)];
    }
  }

  public setup(): PluginItems {
    const pluginItems: PluginItems = {
      executionDetailsTabs: [],
      executionDetailsBanner: [],
    };
    this.plugins.forEach(plugin => {
      plugin.setup(pluginItems);
    });

    return pluginItems;
  }
}

const createPluginManager = () => new PluginManager();

export default createPluginManager;
