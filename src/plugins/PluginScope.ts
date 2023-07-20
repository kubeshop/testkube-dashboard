import {PluginData} from './PluginsContext';

class PluginScope {
  private data: Record<string, any>;
  private slots: Record<string, any>;

  public constructor() {
    this.data = {};
    this.slots = {};
  }

  getData<T>(name: string): T {
    return this.data[name];
  }

  setData(name: string, value: any) {
    this.data[name] = value;
  }

  getSlot(name: string): PluginData[] {
    return this.slots[name] || [];
  }

  appendSlot(name: string, {component, metaData}: PluginData) {
    this.slots[name] = this.slots[name] || [];
    this.slots[name].push({component, metaData});
  }
}

export default PluginScope;
