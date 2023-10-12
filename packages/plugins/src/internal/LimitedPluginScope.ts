import {PluginScopeCallSync, PluginScopeRootScope, PluginScopeSyncData} from './symbols';
import type {GetAccessibleData, PluginScope, PluginScopeConfig, PluginSlotRecord, PluginState} from './types';

export class LimitedPluginScope<T extends PluginState> implements PluginScope<T> {
  private readonly [PluginScopeRootScope]: PluginScope<T>; // TODO: Check if root is needed here
  private readonly [PluginScopeSyncData]: Map<any, any> = new Map();
  public readonly slots: PluginSlotRecord<T>;
  public readonly data: GetAccessibleData<T>;

  public constructor(root: PluginScope<T>, config: PluginScopeConfig<T>) {
    this[PluginScopeRootScope] = root;

    // Setup scoped data
    const data: Partial<GetAccessibleData<T>> = {};
    config.data.forEach(key => {
      Object.defineProperty(data, key, {
        enumerable: true,
        get: () => root.data[key],
        set: (value: any) => {
          root.data[key] = value;
        },
      });
    });
    config.externalData.forEach(key => {
      Object.defineProperty(data, key, {
        enumerable: true,
        get: () => root.data[key],
      });
    });
    this.data = data as GetAccessibleData<T>;

    // Setup scoped slots
    const slots: Partial<PluginSlotRecord<T>> = {};
    config.slots.forEach(key => {
      slots[key] = root.slots[key];
    });
    config.externalSlots.forEach(key => {
      slots[key] = root.slots[key];
    });
    this.slots = slots as PluginSlotRecord<T>;
  }

  public [PluginScopeCallSync](): void {
    Array.from(this[PluginScopeSyncData].keys()).forEach(fn => {
      this[PluginScopeSyncData].set(fn, fn());
    });
  }

  /**
   * Transfer data from React to the plugin context.
   */
  public sync<U>(fn: () => U, defaultValue: U): () => U;
  public sync<U>(fn: () => U, defaultValue?: undefined): () => U | undefined;
  public sync<U>(fn: () => U, defaultValue?: U): () => U | undefined {
    const wrappedFn = () => fn();
    this[PluginScopeSyncData].set(wrappedFn, undefined);
    return () => this[PluginScopeSyncData].get(wrappedFn) ?? defaultValue;
  }
}
