import {PluginMetaData} from './interfaces';

class PluginScope {
  private state: Record<string, any>;
  private slots: Record<string, any>;

  public constructor() {
    this.state = {};
    this.slots = {};
  }

  getState<T>(name: string): T {
    return this.state[name];
  }

  setState(name: string, value: any) {
    this.state[name] = value;
  }

  getSlot(name: string) {
    return this.slots[name] || [];
  }

  appendSlot(name: string, value: any, metadata: PluginMetaData = {}) {
    this.slots[name] = this.slots[name] || [];
    this.slots[name].push({value, metadata});
  }
}

export default PluginScope;
