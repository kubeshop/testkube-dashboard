import {LimitedPluginScope} from './LimitedPluginScope';
import {PluginSlot} from './PluginSlot';
import {PluginScopeCallSync, PluginScopeSlotData, PluginScopeSyncData} from './symbols';
import type {
  GetAccessibleData,
  GetAccessibleSlots,
  PluginScope,
  PluginScopeConfig,
  PluginSlotRecord,
  PluginState,
} from './types';

// TODO: Keep current route information here
// TODO: Allow scope inheritance (parent scope)
export class PluginRootScope<T extends PluginState> implements PluginScope<T> {
  public readonly slots: PluginSlotRecord<T>;
  public readonly data: GetAccessibleData<T>;
  private [PluginScopeSyncData]: Map<any, any> = new Map();
  private [PluginScopeSlotData]: Record<string, any> = {};

  public constructor(slots: (keyof GetAccessibleSlots<T>)[]) {
    this.data = {} as any;
    this.slots = {} as any;
    slots.forEach(name => {
      this[PluginScopeSlotData] = [];
      (this.slots as any)[name] = new PluginSlot(name as string, this[PluginScopeSlotData]);
    });
  }

  // TODO: Throw error when `sync` called outside of plugin initialization
  public sync<U>(fn: () => U, defaultValue: U): () => U;
  public sync<U>(fn: () => U, defaultValue?: undefined): () => U | undefined;
  public sync<U>(fn: () => U, defaultValue?: U): () => U | undefined {
    const wrappedFn = () => fn();
    this[PluginScopeSyncData].set(wrappedFn, undefined);
    return () => this[PluginScopeSyncData].get(wrappedFn) ?? defaultValue;
  }

  // TODO: Consider running that on children level instead
  public [PluginScopeCallSync](): void {
    Array.from(this[PluginScopeSyncData].keys()).forEach(fn => {
      this[PluginScopeSyncData].set(fn, fn());
    });
  }

  /**
   * Create child context, that will have access only to part of the scope.
   */
  public children<U extends PluginState>(config: PluginScopeConfig<U>): LimitedPluginScope<U> {
    return new LimitedPluginScope(this, config);
  }
}
