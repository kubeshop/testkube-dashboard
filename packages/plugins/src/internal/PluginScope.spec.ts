import {createPlugin} from '../createPlugin';
import {data, slot} from '../utils';

import {PluginScope} from './PluginScope';
import {PluginSlot} from './PluginSlot';
import {PluginScopeCallSync, PluginScopeChildrenScope, PluginScopeDisableNewSync} from './symbols';
import {PluginScopeConfig} from './types';

const create = (config: Partial<PluginScopeConfig<any>>, parent: PluginScope<any> | null = null) =>
  new PluginScope(parent, {
    data: [],
    slots: [],
    inheritedData: [],
    inheritedSlots: [],
    inheritedReadonlyData: [],
    outerSlots: [],
    ...config,
  });

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
      expect(create({outerSlots: ['slot1', 'slot2']}).slots).toEqual({
        slot1: undefined,
        slot2: undefined,
      });
    });

    it('should make inherited slots accessible', () => {
      const parent = create({slots: ['slot1', 'slot2']});
      const child = create({inheritedSlots: ['slot1', 'slot2']}, parent);
      expect(Object.keys(child.slots)).toEqual(['slot1', 'slot2']);
      expect(child.slots.slot1).toBe(parent.slots.slot1);
      expect(child.slots.slot2).toBe(parent.slots.slot2);
    });

    it('should make inherited slots accessible few levels down', () => {
      const root = create({slots: ['slot1']});
      const parent = create({inheritedSlots: ['slot1']}, root);
      const child = create({inheritedSlots: ['slot1']}, parent);
      expect(Object.keys(parent.slots)).toEqual(['slot1']);
      expect(Object.keys(child.slots)).toEqual(['slot1']);
      expect(child.slots.slot1).toBe(root.slots.slot1);
    });

    it('should make outer slots accessible', () => {
      const parent = create({slots: ['slot1', 'slot2']});
      const child = create({outerSlots: ['slot1', 'slot2']}, parent);
      expect(Object.keys(child.slots)).toEqual(['slot1', 'slot2']);
      expect(child.slots.slot1).toBe(parent.slots.slot1);
      expect(child.slots.slot2).toBe(parent.slots.slot2);
    });

    it('should make outer slots accessible few levels down', () => {
      const root = create({slots: ['slot1']});
      const parent = create({outerSlots: ['slot1']}, root);
      const child = create({outerSlots: ['slot1']}, parent);
      expect(Object.keys(parent.slots)).toEqual(['slot1']);
      expect(Object.keys(child.slots)).toEqual(['slot1']);
      expect(child.slots.slot1).toBe(root.slots.slot1);
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
        .outer(data<string>()('key3'))
        .outer(slot<string>()('slot3'))
        .outer(slot<string>()('slotUnknown'))
        .init();
      const root = create({slots: ['slot1', 'slot2', 'slot3', 'slot4'], data: ['key1', 'key2', 'key3', 'key4']});
      root.data.key1 = 'value1';
      root.data.key2 = 'value2';
      root.data.key3 = 'value3';
      const child = root.children(plugin);
      root.data.key2 = 'next';

      child.data.key1 = 'own';

      expect(Object.keys(child.slots)).toEqual(['slot1', 'slot2', 'slot3', 'slotUnknown']);
      expect(child.slots.slot1).toBe(root.slots.slot1);
      expect(child.slots.slot2).toBe(root.slots.slot2);
      expect(child.slots.slot3).toBe(root.slots.slot3);
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
      expect(parent[PluginScopeChildrenScope].get(plugin)).toBe(child);
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
  });
});
