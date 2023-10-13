import type {GetPluginState, Plugin} from './Plugin';
import {PluginSlot} from './PluginSlot';
import {
  PluginDetails,
  PluginScopeAttachProducer,
  PluginScopeCallSync,
  PluginScopeChildrenScope,
  PluginScopeData,
  PluginScopeDestroy,
  PluginScopeDisableNewSync,
  PluginScopeDisableNewSyncStatus,
  PluginScopeParentScope,
  PluginScopeSlotData,
  PluginScopeSyncData,
} from './symbols';
import type {
  PluginScopeConfig,
  PluginScopeDataRecord,
  PluginScopeSlotRecord,
  PluginScopeState,
  PluginScopeStateFor,
} from './types';

// TODO: Keep current route information here
export class PluginScope<T extends PluginScopeState> {
  private readonly [PluginScopeParentScope]: PluginScope<T> | null;
  private readonly [PluginScopeData]: PluginScopeDataRecord<T>;
  private readonly [PluginScopeSlotData]: Record<string, any> = {};
  private readonly [PluginScopeSyncData]: Map<Function, any> = new Map();
  private readonly [PluginScopeChildrenScope]: Map<Plugin<any>, PluginScope<any>> = new Map();
  private [PluginScopeDisableNewSyncStatus] = false;
  public readonly slots: PluginScopeSlotRecord<T>;
  public readonly data: PluginScopeDataRecord<T>;

  public constructor(parent: PluginScope<T> | null, config: PluginScopeConfig<T>) {
    this[PluginScopeParentScope] = parent;

    const ownData: any = {};
    const data: any = {};
    config.data.forEach(key => {
      ownData[key] = undefined;
      Object.defineProperty(data, key, {
        enumerable: true,
        get: () => this[PluginScopeData][key],
        set: (value: any) => {
          this[PluginScopeData][key] = value;
        },
      });
    });
    config.inheritedData.forEach(key => {
      Object.defineProperty(data, key, {
        enumerable: true,
        get: () => this[PluginScopeParentScope]?.data[key],
        set: (value: any) => {
          if (!this[PluginScopeParentScope]) {
            throw new Error('Cannot update the parent value without the parent scope.');
          }
          this[PluginScopeParentScope].data[key] = value;
        },
      });
    });
    config.inheritedReadonlyData.forEach(key => {
      Object.defineProperty(data, key, {
        enumerable: true,
        get: () => this[PluginScopeParentScope]?.data[key],
        set: () => {
          throw new Error(`The "${key as string}" value is read-only.`);
        },
      });
    });
    this[PluginScopeData] = ownData;
    this.data = data;

    const slots: any = {};
    config.slots.forEach(key => {
      slots[key] = new PluginSlot(key as string, this[PluginScopeSlotData])[PluginScopeAttachProducer](this);
    });
    config.inheritedSlots.concat(config.outerSlots).forEach(key => {
      Object.defineProperty(slots, key, {
        enumerable: true,
        get: () => this[PluginScopeParentScope]?.slots[key]?.[PluginScopeAttachProducer](this),
      });
    });
    this.slots = slots;

    if (parent) {
      Object.setPrototypeOf(this[PluginScopeData], parent?.data);
      Object.setPrototypeOf(this.slots, parent?.slots);
    }
  }

  public [PluginScopeCallSync](): void {
    Array.from(this[PluginScopeSyncData].keys()).forEach(fn => {
      this[PluginScopeSyncData].set(fn, fn());
    });
  }

  public [PluginScopeDisableNewSync](): void {
    this[PluginScopeDisableNewSyncStatus] = true;
  }

  /**
   * Destroy slot data produced through this scope.
   */
  public destroy(): void {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (let key in this.slots) {
      this.slots[key]?.[PluginScopeDestroy](this);
    }
    Array.from(this[PluginScopeChildrenScope].values()).forEach(child => child.destroy());
  }

  /**
   * Transfer data from React to the plugin context.
   */
  public sync<U>(fn: () => U, defaultValue: U): () => U;
  public sync<U>(fn: () => U, defaultValue?: undefined): () => U | undefined;
  public sync<U>(fn: () => U, defaultValue?: U): () => U | undefined {
    if (this[PluginScopeDisableNewSyncStatus]) {
      throw new Error('The sync() factory may be executed only during initialization.');
    }

    const wrappedFn = () => fn();
    this[PluginScopeSyncData].set(wrappedFn, undefined);
    return () => this[PluginScopeSyncData].get(wrappedFn) ?? defaultValue;
  }

  public children<U extends Plugin<any>>(plugin: U): PluginScope<PluginScopeStateFor<GetPluginState<U>>> {
    const scope = new PluginScope(this, {
      data: [],
      slots: [],
      inheritedSlots: Object.keys(plugin[PluginDetails].slots).concat(Object.keys(plugin[PluginDetails].externalSlots)),
      outerSlots: Object.keys(plugin[PluginDetails].outerSlots),
      inheritedData: Object.keys(plugin[PluginDetails].data),
      inheritedReadonlyData: Object.keys(plugin[PluginDetails].externalData).concat(
        Object.keys(plugin[PluginDetails].outerData)
      ),
    });
    this[PluginScopeChildrenScope].set(plugin, scope);
    return scope;
  }
}
