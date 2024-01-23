import {createPlugin} from '../createPlugin';
import {data, slot} from '../utils';

import {PluginScope} from './PluginScope';
import {PluginSlot} from './PluginSlot';
import {
  PluginScopeCallSync,
  PluginScopeChildrenPluginMapScope,
  PluginScopeChildrenScope,
  PluginScopeDisableNewSync,
  PluginScopeSubscribeChange,
} from './symbols';
import {PluginScopeConfig} from './types';

const create = (config: Partial<PluginScopeConfig<any>>, parent: PluginScope<any> | null = null) =>
  new PluginScope(parent, {
    data: [],
    slots: [],
    inheritedData: [],
    inheritedSlots: [],
    inheritedReadonlyData: [],
    optionalSlots: [],
    ...config,
  });

const frame = () => new Promise(resolve => requestAnimationFrame(resolve));

describe('plugins', () => {
  describe('PluginScope', () => {
    it('should have empty slots when none provided', () => {
      expect(create({}).slots).toEqual({});
    });

    it('should create slots when provided', () => {
      expect(create({slots: ['slot1', 'slot2']}).slots).toEqual({
        slot1: expect.any(PluginSlot),
        slot2: expect.any(PluginSlot),
      });
    });

    it('should not create slots for inherited slots', () => {
      expect(create({inheritedSlots: ['slot1', 'slot2']}).slots).toEqual({
        slot1: undefined,
        slot2: undefined,
      });
    });

    it('should not create slots for inherited slots', () => {
      expect(create({optionalSlots: ['slot1', 'slot2']}).slots).toEqual({
        slot1: undefined,
        slot2: undefined,
      });
    });

    it('should make inherited slots accessible', () => {
      const parent = create({slots: ['slot1', 'slot2']});
      const child = create({inheritedSlots: ['slot1', 'slot2']}, parent);

      parent.slots.slot1?.add('value1');
      child.slots.slot1?.add('value1');

      expect(Object.keys(child.slots)).toEqual(['slot1', 'slot2']);
      expect(child.slots.slot1?.all()).toEqual(parent.slots.slot1?.all());
      expect(child.slots.slot2?.all()).toEqual(parent.slots.slot2?.all());
    });

    it('should make inherited slots accessible few levels down', () => {
      const root = create({slots: ['slot1']});
      const parent = create({inheritedSlots: ['slot1']}, root);
      const child = create({inheritedSlots: ['slot1']}, parent);

      root.slots.slot1?.add('value1');
      parent.slots.slot1?.add('value2');
      child.slots.slot1?.add('value3');

      expect(Object.keys(parent.slots)).toEqual(['slot1']);
      expect(Object.keys(child.slots)).toEqual(['slot1']);
      expect(child.slots.slot1?.all()).toEqual(root.slots.slot1?.all());
    });

    it('should make outer slots accessible', () => {
      const parent = create({slots: ['slot1', 'slot2']});
      const child = create({optionalSlots: ['slot1', 'slot2']}, parent);

      parent.slots.slot1?.add('value2');
      child.slots.slot1?.add('value3');

      expect(Object.keys(child.slots)).toEqual(['slot1', 'slot2']);
      expect(child.slots.slot1?.all()).toEqual(parent.slots.slot1?.all());
      expect(child.slots.slot2?.all()).toEqual(parent.slots.slot2?.all());
    });

    it('should make outer slots accessible few levels down', () => {
      const root = create({slots: ['slot1']});
      const parent = create({optionalSlots: ['slot1']}, root);
      const child = create({optionalSlots: ['slot1']}, parent);

      root.slots.slot1?.add('value1');
      parent.slots.slot1?.add('value2');
      child.slots.slot1?.add('value3');

      expect(Object.keys(parent.slots)).toEqual(['slot1']);
      expect(Object.keys(child.slots)).toEqual(['slot1']);
      expect(child.slots.slot1?.all()).toEqual(root.slots.slot1?.all());
    });

    it('should allow accessing parent slots even if not specified (optional)', () => {
      const root = create({slots: ['slot1']});
      const parent = create({inheritedSlots: []}, root);
      const child = create({inheritedSlots: []}, parent);
      expect(Object.keys(parent.slots)).toEqual([]);
      expect(Object.keys(child.slots)).toEqual([]);
      expect(child.slots.slot1).toBe(root.slots.slot1);
    });

    it('should have empty data initially', () => {
      expect(create({}).data).toEqual({});
    });

    it('should create data when provided', () => {
      const scope = create({data: ['key1', 'key2']});
      expect(Object.keys(scope.data)).toEqual(['key1', 'key2']);
      expect(scope.data).toEqual({key1: undefined, key2: undefined});
    });

    it('should allow reading/setting own data', () => {
      const scope = create({data: ['key1']});
      scope.data.key1 = 'value1';
      expect(scope.data.key1).toBe('value1');
    });

    it('should allow reading/setting root data from child level', () => {
      const root = create({data: ['key1']});
      const parent = create({inheritedData: ['key1']}, root);
      const child = create({inheritedData: ['key1']}, parent);
      child.data.key1 = 'value1';
      expect(root.data.key1).toBe('value1');
      expect(parent.data.key1).toBe('value1');
      expect(child.data.key1).toBe('value1');
    });

    it('should allow reading/setting root data from root level', () => {
      const root = create({data: ['key1']});
      const parent = create({inheritedData: ['key1']}, root);
      const child = create({inheritedData: ['key1']}, parent);
      root.data.key1 = 'value1';
      expect(root.data.key1).toBe('value1');
      expect(parent.data.key1).toBe('value1');
      expect(child.data.key1).toBe('value1');
    });

    it('should block setting data on child level when read-only', () => {
      const parent = create({data: ['key1']});
      const child = create({inheritedReadonlyData: ['key1']}, parent);
      expect(() => {
        child.data.key1 = 'value';
      }).toThrow(new Error('The "key1" value is read-only.'));
      expect(parent.data.key1).toBe(undefined);
      expect(child.data.key1).toBe(undefined);
    });

    it('should allow reading data on child level when read-only', () => {
      const parent = create({data: ['key1']});
      const child = create({inheritedReadonlyData: ['key1']}, parent);
      parent.data.key1 = 'value1';
      expect(parent.data.key1).toBe('value1');
      expect(child.data.key1).toBe('value1');
    });

    it('should correctly create children scope for plugin', () => {
      const plugin = createPlugin('test')
        .define(slot<string>()('slot1'))
        .needs(slot<string>()('slot2'))
        .define(data<string>()('key1'))
        .needs(data<string>()('key2'))
        .optional(data<string>()('key3'))
        .optional(slot<string>()('slot3'))
        .optional(slot<string>()('slotUnknown'))
        .init();
      const root = create({slots: ['slot1', 'slot2', 'slot3', 'slot4'], data: ['key1', 'key2', 'key3', 'key4']});
      root.data.key1 = 'value1';
      root.data.key2 = 'value2';
      root.data.key3 = 'value3';
      const child = root.children(plugin);
      root.data.key2 = 'next';

      child.data.key1 = 'own';

      root.slots.slot1?.add('slot1');
      root.slots.slot2?.add('slot2');
      root.slots.slot3?.add('slot3');
      root.slots.slot4?.add('slot4');

      child.slots.slot1?.add('cslot1');
      child.slots.slot2?.add('cslot2');
      child.slots.slot3?.add('cslot3');

      expect(Object.keys(child.slots)).toEqual(['slot1', 'slot2', 'slot3', 'slotUnknown']);
      expect(child.slots.slot1.all()).toEqual(root.slots.slot1!.all());
      expect(child.slots.slot2.all()).toEqual(root.slots.slot2!.all());
      expect(child.slots.slot3!.all()).toEqual(root.slots.slot3!.all());
      expect(child.slots.slotUnknown).toBe(undefined);

      expect(Object.keys(child.data)).toEqual(['key1', 'key2', 'key3']);
      expect(child.data.key1).toBe('own');
      expect(child.data.key1).toBe(root.data.key1);
      expect(child.data.key2).toBe(root.data.key2);
      expect(() => {
        (child.data as any).key2 = 'abc';
      }).toThrow(new Error('The "key2" value is read-only.'));
      expect(child.data.key2).toBe(root.data.key2);
      expect(() => {
        (child.data as any).key3 = 'abc';
      }).toThrow(new Error('The "key3" value is read-only.'));
      expect(child.data.key3).toBe(root.data.key3);
    });

    it('should keep children scope for plugin in parent scope', () => {
      const plugin = createPlugin('test').init();
      const parent = create({});
      const child = parent.children(plugin);
      expect(parent[PluginScopeChildrenPluginMapScope].get(plugin)).toBe(child);
    });

    it('should return default value before synchronization', () => {
      const scope = create({});
      const fn1 = jest.fn(() => Math.random());
      const fn2 = jest.fn(() => Math.random());
      const fnSync1 = scope.sync(fn1);
      const fnSync2 = scope.sync(fn2, 1.5);
      expect(fn1).not.toHaveBeenCalled();
      expect(fn2).not.toHaveBeenCalled();
      expect(fnSync1()).toBe(undefined);
      expect(fnSync2()).toBe(1.5);
    });

    it('should return cached value after synchronization', () => {
      const scope = create({});
      const fn1 = jest.fn(() => Math.random());
      const fn2 = jest.fn(() => Math.random());
      const fnSync1 = scope.sync(fn1);
      const fnSync2 = scope.sync(fn2, 1.5);
      scope[PluginScopeCallSync]();
      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
      expect(fnSync1()).toBe(fn1.mock.results[0].value);
      expect(fnSync2()).toBe(fn2.mock.results[0].value);
    });

    it('should replace value after multiple synchronizations', () => {
      const scope = create({});
      const fn = jest.fn(() => Math.random());
      const fnSync = scope.sync(fn);
      scope[PluginScopeCallSync]();
      scope[PluginScopeCallSync]();
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fnSync()).toBe(fn.mock.results[1].value);
    });

    it('should not allow synchronization after plugin initialization', () => {
      const scope = create({});
      scope[PluginScopeDisableNewSync]();
      expect(() => scope.sync(() => {})).toThrow(
        new Error('The sync() factory may be executed only during initialization.')
      );
    });

    it('should return default value before synchronization (syncSubscribe)', () => {
      const scope = create({});
      const fn1 = jest.fn(() => Math.random());
      const fn2 = jest.fn(() => Math.random());
      const fnSync1 = scope.syncSubscribe(fn1);
      const fnSync2 = scope.syncSubscribe(fn2, 1.5);
      expect(fn1).not.toHaveBeenCalled();
      expect(fn2).not.toHaveBeenCalled();
      expect(fnSync1()).toBe(undefined);
      expect(fnSync2()).toBe(1.5);
    });

    it('should return cached value after synchronization (syncSubscribe)', () => {
      const scope = create({});
      const fn1 = jest.fn(() => Math.random());
      const fn2 = jest.fn(() => Math.random());
      const fnSync1 = scope.syncSubscribe(fn1);
      const fnSync2 = scope.syncSubscribe(fn2, 1.5);
      scope[PluginScopeCallSync]();
      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
      expect(fnSync1()).toBe(fn1.mock.results[0].value);
      expect(fnSync2()).toBe(fn2.mock.results[0].value);
    });

    it('should replace value after multiple synchronizations (syncSubscribe)', () => {
      const scope = create({});
      const fn = jest.fn(() => Math.random());
      const fnSync = scope.syncSubscribe(fn);
      scope[PluginScopeCallSync]();
      scope[PluginScopeCallSync]();
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fnSync()).toBe(fn.mock.results[1].value);
    });

    it('should emit change in root scope on initial run when its different than default (syncSubscribe)', async () => {
      const root = create({});
      const middle = create({}, root);
      const scope = create({}, middle);
      const listener = jest.fn();
      root[PluginScopeSubscribeChange](listener);
      scope.syncSubscribe(() => 10);
      scope[PluginScopeCallSync]();
      await frame();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not emit change in root scope on initial run when its same as default (syncSubscribe)', async () => {
      const root = create({});
      const middle = create({}, root);
      const scope = create({}, middle);
      const listener = jest.fn();
      root[PluginScopeSubscribeChange](listener);
      scope.syncSubscribe(() => 10, 10);
      scope[PluginScopeCallSync]();
      await frame();
      expect(listener).toHaveBeenCalledTimes(0);
    });

    it('should not emit change in root scope when there is no change (syncSubscribe)', async () => {
      const root = create({});
      const middle = create({}, root);
      const scope = create({}, middle);
      const listener = jest.fn();
      root[PluginScopeSubscribeChange](listener);
      const value = 10;
      const fn = jest.fn(() => value);
      scope.syncSubscribe(fn, value);
      scope[PluginScopeCallSync]();
      scope[PluginScopeCallSync]();
      await frame();
      expect(listener).toHaveBeenCalledTimes(0);
    });

    it('should emit change in root scope when there is a change (syncSubscribe)', async () => {
      const root = create({});
      const middle = create({}, root);
      const scope = create({}, middle);
      const listener = jest.fn();
      root[PluginScopeSubscribeChange](listener);
      let value = 10;
      scope.syncSubscribe(() => value, value);
      scope[PluginScopeCallSync]();
      value = 123;
      scope[PluginScopeCallSync]();
      await frame();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not allow synchronization after plugin initialization (syncSubscribe)', () => {
      const scope = create({});
      scope[PluginScopeDisableNewSync]();
      expect(() => scope.syncSubscribe(() => {})).toThrow(
        new Error('The syncSubscribe() factory may be executed only during initialization.')
      );
    });

    it('should allow destroying items produced by specific scope or its children', () => {
      const root = create({slots: ['slot1']});
      const separate = create({inheritedSlots: ['slot1']}, root);
      const parent = create({slots: ['slot2'], inheritedSlots: ['slot1']}, root);
      const directChild = create({inheritedSlots: ['slot1', 'slot2']}, parent);
      const child = parent.children(createPlugin('test').needs(slot()('slot1')).needs(slot()('slot2')).init());

      root.slots.slot1?.add('root');
      separate.slots.slot1?.add('separate');
      parent.slots.slot1?.add('parent');
      directChild.slots.slot1?.add('directChild');
      child.slots.slot1?.add('child');
      parent.slots.slot2?.add('parent');
      directChild.slots.slot2?.add('directChild');
      child.slots.slot2?.add('child');

      parent.destroy();

      expect(root[PluginScopeChildrenScope]).toEqual(new Set([separate]));
      expect(root.slots.slot1?.all()).toEqual(['root', 'separate']);
      expect(parent.slots.slot2?.all()).toEqual([]);
    });

    it('should emit information about scope change', async () => {
      const root = create({data: ['key1']});
      const parent = create({inheritedData: ['key1']}, root);
      const child = create({inheritedData: ['key1']}, parent);
      const listener = jest.fn();
      child[PluginScopeSubscribeChange](listener);
      child.data.key1 = 'value1';
      await frame();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit information about parent scope change', async () => {
      const root = create({data: ['key1']});
      const parent = create({inheritedData: ['key1']}, root);
      const child = create({inheritedData: ['key1']}, parent);
      const listener = jest.fn();
      child[PluginScopeSubscribeChange](listener);
      parent.data.key1 = 'value1';
      await frame();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit information about (nested) children scope change', async () => {
      const root = create({data: ['key1']});
      const parent = create({inheritedData: ['key1']}, root);
      const child = create({inheritedData: ['key1']}, parent);
      const listener = jest.fn();
      root[PluginScopeSubscribeChange](listener);
      parent[PluginScopeSubscribeChange](listener);
      child.data.key1 = 'value1';
      await frame();
      expect(listener).toHaveBeenCalledTimes(2);
    });

    it('should unregister listener', async () => {
      const root = create({data: ['key1']});
      const parent = create({inheritedData: ['key1']}, root);
      const child = create({inheritedData: ['key1']}, parent);
      const listener = jest.fn();
      const unsubscribe = child[PluginScopeSubscribeChange](listener);
      unsubscribe();
      parent.data.key1 = 'value1';
      await frame();
      expect(listener).not.toHaveBeenCalled();
    });

    it('should emit information about slots change', async () => {
      const root = create({slots: ['key1']});
      const parent = create({inheritedSlots: ['key1']}, root);
      const child = create({inheritedSlots: ['key1']}, parent);
      const listener = jest.fn();
      root[PluginScopeSubscribeChange](listener);
      root.slots.key1.add('value1');
      await frame();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit information about slots change in parent', async () => {
      const root = create({slots: ['key1']});
      const parent = create({inheritedSlots: ['key1']}, root);
      const child = create({inheritedSlots: ['key1']}, parent);
      const listener = jest.fn();
      parent[PluginScopeSubscribeChange](listener);
      root.slots.key1.add('value1');
      await frame();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit information about slots change in parent (nested)', async () => {
      const root = create({slots: ['key1']});
      const parent = create({inheritedSlots: ['key1']}, root);
      const child = create({inheritedSlots: ['key1']}, parent);
      const listener = jest.fn();
      child[PluginScopeSubscribeChange](listener);
      root.slots.key1.add('value1');
      await frame();
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
