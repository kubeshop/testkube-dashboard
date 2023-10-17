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

// Use WeakMap when it's possible, for older browsers use the Map at least.
const PseudoWeakMap = typeof WeakMap === 'undefined' ? Map : WeakMap;

export class PluginSlot<T> {
  private [PluginScopeProducerCache]: Map<any, PluginSlot<any>>;
  private [PluginScopeProducerDataCache]: WeakMap<PluginSlotContainer<T>, any>;
  private [PluginScopeProducer]: any;

  public constructor(
    private readonly key: string,
    private readonly storage: Record<string, PluginSlotContainer<T>[]>,
    producer?: any,
    producersCache: Map<any, PluginSlot<T>> = new Map(),
    producersDataCache: WeakMap<PluginSlotContainer<T>, any> = new PseudoWeakMap()
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
    this.storage[this.key] = (this.storage[this.key] || []).filter(
      item => this[PluginScopeProducerDataCache].get(item) !== producer
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
    this.storage[this.key] = this.storage[this.key] || [];
    this.storage[this.key] = this.storage[this.key].slice();

    // Append the new value
    const order = metadata.order || 0;
    const index = this.storage[this.key].findIndex(x => x.metadata.order! > order);
    const item = {value, metadata: {...metadata, order}};
    this[PluginScopeProducerDataCache].set(item, this[PluginScopeProducer]);
    this.storage[this.key].splice(index === -1 ? this.storage[this.key].length : index, 0, item);
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
