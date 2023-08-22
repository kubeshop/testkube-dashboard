import type {SlotMetadata} from './types';

class PluginScope {
  private state: Record<string, any>;
  private slots: Record<string, any>;

  public constructor() {
    this.state = {};
    this.slots = {};
  }

  public getState<T>(name: string): T {
    return this.state[name];
  }

  public setState(name: string, value: any) {
    this.state[name] = value;
  }

  public getSlot(name: string) {
    return this.slots[name] || [];
  }

  public appendSlot(name: string, value: any, metadata: SlotMetadata = {}) {
    this.slots[name] = this.slots[name] || [];
    this.slots[name].push({value, metadata});
  }
}

export default PluginScope;
