import {
  PluginScopeAttachProducer,
  PluginScopeDestroy,
  PluginScopeProducer,
  PluginScopeProducerCache,
  PluginScopeProducerDataCache,
} from './symbols';
import type {PluginSlotContainer, PluginSlotMetadata} from './types';

const isSlotEnabled = (metadata: PluginSlotMetadata): boolean =>
  typeof metadata.enabled === 'function' ? Boolean(metadata.enabled()) : metadata.enabled == null || metadata.enabled;

export class PluginSlot<T> {
  private [PluginScopeProducerCache]: Map<any, PluginSlot<any>>;
  private [PluginScopeProducerDataCache]: WeakMap<PluginSlotContainer<T>, any>;
  private [PluginScopeProducer]: any;

  public constructor(
    private readonly key: string,
    private readonly storage: Map<string, PluginSlotContainer<T>[]>,
    producer?: any,
    producersCache: Map<any, PluginSlot<T>> = new Map(),
    producersDataCache: WeakMap<PluginSlotContainer<T>, any> = new WeakMap()
  ) {
    this[PluginScopeProducer] = producer;
    this[PluginScopeProducerCache] = producersCache;
    this[PluginScopeProducerDataCache] = producersDataCache;

    // Hide the internal containers
    Object.defineProperty(this, PluginScopeProducer, {enumerable: false});
    Object.defineProperty(this, PluginScopeProducerCache, {enumerable: false});
    Object.defineProperty(this, PluginScopeProducerDataCache, {enumerable: false});
  }

  public [PluginScopeDestroy](producer: any): void {
    this.storage.set(
      this.key,
      (this.storage.get(this.key) || []).filter(item => this[PluginScopeProducerDataCache].get(item) !== producer)
    );
  }

  public [PluginScopeAttachProducer](producer: any): PluginSlot<T> {
    const cached = this[PluginScopeProducerCache].get(producer);
    if (cached) {
      return cached;
    }
    const slot = new PluginSlot<T>(this.key, this.storage, producer, this[PluginScopeProducerCache]);
    this[PluginScopeProducerCache].set(producer, slot);
    return slot;
  }

  public add(value: T, metadata: PluginSlotMetadata = {}): void {
    // Ensure new identity of slot in the storage
    const slot = (this.storage.get(this.key) || []).slice();

    // Append the new value
    const order = metadata.order || 0;
    const index = slot.findIndex(x => x.metadata.order! > order);
    const item = {value, metadata: {...metadata, order}};
    this[PluginScopeProducerDataCache].set(item, this[PluginScopeProducer]);
    slot.splice(index === -1 ? slot.length : index, 0, item);
    this.storage.set(this.key, slot);
  }

  public allRaw(defaults: PluginSlotContainer<T>[] = []): PluginSlotContainer<T>[] {
    const all = this.storage.get(this.key) || [];
    const filtered = all.filter(item => isSlotEnabled(item.metadata));
    defaults.forEach(item => {
      if (isSlotEnabled(item.metadata || {})) {
        const order = item.metadata.order || 0;
        const index = filtered.findIndex(x => x.metadata.order! >= order);
        filtered.splice(index === -1 ? filtered.length : index, 0, item);
      }
    });
    return filtered;
  }

  public all(): T[] {
    return this.allRaw().map(item => item.value);
  }

  public first(defaults: PluginSlotContainer<T>[] = []): T | undefined {
    return this.allRaw(defaults)[0]?.value;
  }
}
