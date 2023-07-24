import PluginScope from './PluginScope';
import {Plugin} from './types';

export class PluginManager {
  private plugins: Plugin[];

  public constructor() {
    this.plugins = [];
  }

  public add(plugin: Plugin): void {
    const order = plugin.order ?? -Infinity;
    const index = this.plugins.findIndex(item => (item.order ?? -Infinity) < order);
    if (index === -1) {
      this.plugins = [...this.plugins, plugin];
    } else {
      this.plugins = [...this.plugins.slice(0, index), plugin, ...this.plugins.slice(index)];
    }
  }

  setup() {
    const scope = new PluginScope();
    this.plugins.forEach(plugin => plugin.setup(scope));
    return scope;
  }
}

const createPluginManager = () => new PluginManager();

export default createPluginManager;
