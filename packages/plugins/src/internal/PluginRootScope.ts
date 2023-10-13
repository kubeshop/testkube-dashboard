import {LocalPluginScope} from './LocalPluginScope';
import type {Plugin} from './Plugin';
import {PluginSlot} from './PluginSlot';
import {PluginDetails, PluginScopeChildrenScope, PluginScopeSlotData} from './symbols';
import type {GetAccessibleData, GetAccessibleSlots, PluginScope, PluginSlotRecord, PluginState} from './types';

// TODO: Keep current route information here
// TODO: Allow scope inheritance (parent scope)
export class PluginRootScope<T extends PluginState> implements PluginScope<T> {
  public readonly slots: PluginSlotRecord<T>;
  public readonly data: GetAccessibleData<T>;
  public [PluginScopeChildrenScope]: Map<Plugin<any>, LocalPluginScope<any>> = new Map();
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
  // eslint-disable-next-line class-methods-use-this
  public sync<U>(fn: () => U, defaultValue?: U): () => U | undefined {
    return () => defaultValue;
  }

  /**
   * Create child context, that will have access only to part of the scope.
   */
  public children<U extends PluginState>(plugin: Plugin<U>): LocalPluginScope<U> {
    const childScope = new LocalPluginScope(this, {
      externalSlots: Object.keys(plugin[PluginDetails].externalSlots),
      slots: Object.keys(plugin[PluginDetails].slots),
      externalData: Object.keys(plugin[PluginDetails].externalData),
      data: Object.keys(plugin[PluginDetails].data),
    });

    this[PluginScopeChildrenScope].set(plugin, childScope);

    return childScope;
  }
}
