import type {PluginSlotContainer, PluginSlotMetadata} from './types';

const isSlotEnabled = (metadata: PluginSlotMetadata): boolean =>
  typeof metadata.enabled === 'function' ? Boolean(metadata.enabled()) : metadata.enabled == null || metadata.enabled;

export class PluginSlot<T> {
  public constructor(
    private readonly key: string,
    private readonly storage: Record<string, PluginSlotContainer<T>[]>
  ) {}

  public add(value: T, metadata: PluginSlotMetadata = {}): void {
    // Ensure new identity of slot in the storage
    this.storage[this.key] = this.storage[this.key] || [];
    this.storage[this.key] = this.storage[this.key].slice();

    // Append the new value
    const order = metadata.order || 0;
    const index = this.storage[this.key].findIndex(x => x.metadata.order! > order);
    this.storage[this.key].splice(index === -1 ? this.storage[this.key].length : index, 0, {
      value,
      metadata: {...metadata, order},
    });
  }

  public all(): T[] {
    const all = this.storage[this.key] || [];
    return all.filter(item => isSlotEnabled(item.metadata)).map(item => item.value);
  }

  public first(): T | undefined {
    const all = this.storage[this.key] || [];
    return all.find(item => isSlotEnabled(item.metadata))?.value;
  }
}
