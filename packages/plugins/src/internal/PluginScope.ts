import {FC, ReactElement, ReactNode, createElement} from 'react';

import type {GetPluginState, Plugin} from './Plugin';
import {PluginSlot} from './PluginSlot';
import {
  PluginDetails,
  PluginScopeAttachProducer,
  PluginScopeCallSync,
  PluginScopeChildrenPluginMapScope,
  PluginScopeChildrenScope,
  PluginScopeData,
  PluginScopeDestroy,
  PluginScopeDisableNewSync,
  PluginScopeDisableNewSyncStatus,
  PluginScopeEmitChange,
  PluginScopeListeners,
  PluginScopeParentScope,
  PluginScopeRegisterChildrenScope,
  PluginScopeScheduleUpdate,
  PluginScopeSlotData,
  PluginScopeSubscribeChange,
  PluginScopeSyncData,
  PluginScopeUnregisterChildrenScope,
} from './symbols';
import type {
  PluginScopeConfig,
  PluginScopeDataRecord,
  PluginScopeSlotRecord,
  PluginScopeState,
  PluginScopeStateFor,
} from './types';

// TODO: Keep current route information here
// TODO: Optimize types by passing just a resolved subset down
export class PluginScope<T extends PluginScopeState> {
  private readonly [PluginScopeParentScope]: PluginScope<T> | null;
  private readonly [PluginScopeData]: PluginScopeDataRecord<T>;
  private readonly [PluginScopeSlotData]: Map<string, any> = new Map();
  private readonly [PluginScopeSyncData]: Map<Function, any> = new Map();
  private readonly [PluginScopeChildrenPluginMapScope]: Map<Plugin<any>, PluginScope<any>> = new Map();
  private readonly [PluginScopeChildrenScope]: Set<PluginScope<any>> = new Set();
  private readonly [PluginScopeListeners]: Set<() => void> = new Set();
  private [PluginScopeDisableNewSyncStatus] = false;
  public readonly slots: PluginScopeSlotRecord<T>;
  public readonly data: PluginScopeDataRecord<T>;
  private updateHandler: number = 0;

  public constructor(parent: PluginScope<T> | null, config: PluginScopeConfig<T>) {
    this[PluginScopeParentScope] = parent;
    if (parent) {
      parent[PluginScopeRegisterChildrenScope](this);
    }

    // FIXME Hack to watch for slot changes
    const originalSet = this[PluginScopeSlotData].set.bind(this[PluginScopeSlotData]);
    this[PluginScopeSlotData].set = (...args) => {
      this[PluginScopeEmitChange]();
      return originalSet(...args);
    };

    const ownData: any = {};
    const data: any = {};
    config.data.forEach(key => {
      ownData[key] = undefined;
      Object.defineProperty(data, key, {
        enumerable: true,
        get: () => this[PluginScopeData][key],
        set: (value: any) => {
          if (this[PluginScopeData][key] !== value) {
            this[PluginScopeData][key] = value;
            this[PluginScopeEmitChange]();
          }
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
    config.inheritedSlots.concat(config.optionalSlots).forEach(key => {
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

  public [PluginScopeRegisterChildrenScope](child: PluginScope<any>): void {
    this[PluginScopeChildrenScope].add(child);
  }

  public [PluginScopeUnregisterChildrenScope](child: PluginScope<any>): void {
    this[PluginScopeChildrenScope].delete(child);
  }

  public [PluginScopeCallSync](): void {
    Array.from(this[PluginScopeSyncData].keys()).forEach(fn => {
      this[PluginScopeSyncData].set(fn, fn(this[PluginScopeSyncData].get(fn)));
    });
  }

  public [PluginScopeDisableNewSync](): void {
    this[PluginScopeDisableNewSyncStatus] = true;
  }

  // TODO: Optimize this mechanism
  private [PluginScopeScheduleUpdate](): void {
    if (!this.updateHandler) {
      this.updateHandler = requestAnimationFrame(() => {
        this[PluginScopeListeners].forEach(listener => listener());
        this.updateHandler = 0;
      });
    }
  }

  public [PluginScopeEmitChange](): void {
    this[PluginScopeScheduleUpdate]();
    this[PluginScopeChildrenScope].forEach(child => child[PluginScopeEmitChange]());
  }

  public [PluginScopeSubscribeChange](listener: () => void): () => void {
    const wrappedFn = () => listener();
    this[PluginScopeListeners].add(wrappedFn);
    return () => this[PluginScopeListeners].delete(wrappedFn);
  }

  /**
   * Destroy slot data produced through this scope.
   */
  public destroy(): void {
    cancelAnimationFrame(this.updateHandler);
    this[PluginScopeListeners].clear();

    if (this[PluginScopeParentScope]) {
      this[PluginScopeParentScope][PluginScopeUnregisterChildrenScope](this);
    }
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (let key in this.slots) {
      this.slots[key]?.[PluginScopeDestroy](this);
    }
    this[PluginScopeChildrenPluginMapScope].clear();
    const children = Array.from(this[PluginScopeChildrenScope]);
    this[PluginScopeChildrenScope].clear();
    children.forEach(child => child.destroy());
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

  /**
   * Transfer data from React to the plugin context.
   *
   * The difference from sync() is, that it will emit change in the scope when the value is different.
   * It's a bit slower, as it's trigger a change on the root scope afterward.
   *
   * TODO: Consider using Observables instead, that could be passed to Slot.enabled?
   */
  public syncSubscribe<U>(fn: () => U, defaultValue: U): () => U;
  public syncSubscribe<U>(fn: () => U, defaultValue?: undefined): () => U | undefined;
  public syncSubscribe<U>(fn: () => U, defaultValue?: U): () => U | undefined {
    if (this[PluginScopeDisableNewSyncStatus]) {
      throw new Error('The syncSubscribe() factory may be executed only during initialization.');
    }

    const wrappedFn = (prevValue: U | undefined = defaultValue) => {
      const nextValue = fn();
      let root: PluginScope<any> = this;
      while (root[PluginScopeParentScope]) {
        root = root[PluginScopeParentScope];
      }
      if (prevValue !== nextValue) {
        root[PluginScopeEmitChange]();
      }
      return nextValue;
    };
    this[PluginScopeSyncData].set(wrappedFn, undefined);
    return () => this[PluginScopeSyncData].get(wrappedFn) ?? defaultValue;
  }

  public children<U extends Plugin<any>>(plugin: U): PluginScope<PluginScopeStateFor<GetPluginState<U>>> {
    const scope = new PluginScope(this, {
      data: [],
      slots: [],
      inheritedSlots: Object.keys(plugin[PluginDetails].slots).concat(Object.keys(plugin[PluginDetails].externalSlots)),
      optionalSlots: Object.keys(plugin[PluginDetails].optionalSlots),
      inheritedData: Object.keys(plugin[PluginDetails].data),
      inheritedReadonlyData: Object.keys(plugin[PluginDetails].externalData).concat(
        Object.keys(plugin[PluginDetails].optionalData)
      ),
    });
    this[PluginScopeChildrenPluginMapScope].set(plugin, scope);
    return scope;
  }

  /**
   * Render React node based on the slot.
   * Remember, it is not optimized - each render() will return different <Component />.
   * It should be used only for static render.
   */
  public render(fn: () => ReactElement): ReactNode {
    const Component: FC = () => fn();
    return createElement(Component);
  }
}
