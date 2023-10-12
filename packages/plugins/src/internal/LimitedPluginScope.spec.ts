import {LimitedPluginScope} from './LimitedPluginScope';
import {PluginSlot} from './PluginSlot';
import {PluginScope, PluginScopeConfig} from './types';

const dummyStorage = {};

const createSlot = (name: string) => new PluginSlot(name, dummyStorage);

const createScope = (
  scope: Partial<PluginScope<any>>
): PluginScope<any> & {sync: jest.SpiedFunction<PluginScope<any>['sync']>} => ({
  data: {},
  slots: {},
  sync: jest.fn(fn => () => fn()) as any,
  ...scope,
});

const createConfig = (config: Partial<PluginScopeConfig<any>>): PluginScopeConfig<any> => ({
  slots: [],
  externalSlots: [],
  data: [],
  externalData: [],
  ...config,
});

describe('plugins', () => {
  describe('LimitedPluginScope', () => {
    it('should correctly expose getters for internal data', () => {
      const root = createScope({data: {value: 'abc', value2: 'def'}});
      const config = createConfig({data: ['value']});
      const scope = new LimitedPluginScope(root, config);
      root.data.value = 'xyz';
      expect(scope.data.value).toEqual('xyz');
      expect(scope.data.value2).toBe(undefined);
      expect(scope.data).not.toHaveProperty('value2');
    });

    it('should correctly expose setters for internal data', () => {
      const root = createScope({data: {value: 'abc', value2: 'def'}});
      const config = createConfig({data: ['value']});
      const scope = new LimitedPluginScope(root, config);
      scope.data.value = 'xyz';
      scope.data.value2 = 'abrakadabra';
      expect(root.data.value).toEqual('xyz');
      expect(root.data.value2).toEqual('def');
      expect(scope.data.value2).toEqual('abrakadabra');
    });

    it('should correctly expose getters for external data', () => {
      const root = createScope({data: {value: 'abc', value2: 'def'}});
      const config = createConfig({externalData: ['value']});
      const scope = new LimitedPluginScope(root, config);
      root.data.value = 'xyz';
      expect(scope.data.value).toEqual('xyz');
      expect(scope.data.value2).toBe(undefined);
      expect(scope.data).not.toHaveProperty('value2');
    });

    it('should correctly block setters for external data', () => {
      const root = createScope({data: {value: 'abc', value2: 'def'}});
      const config = createConfig({externalData: ['value']});
      const scope = new LimitedPluginScope(root, config);
      expect(() => {
        scope.data.value = 'xyz';
      }).toThrow();
      expect(root.data.value).toEqual('abc');
    });

    it('should correctly expose slots for internal data', () => {
      const root = createScope({slots: {slot1: createSlot('slot1'), slot2: createSlot('slot2')}});
      const config = createConfig({slots: ['slot1']});
      const scope = new LimitedPluginScope(root, config);
      expect(scope.slots.slot1).toBe(root.slots.slot1);
      expect(scope.slots.slot2).toBe(undefined);
      expect(scope.slots).not.toHaveProperty('slot2');
    });

    it('should correctly expose slots for external data', () => {
      const root = createScope({slots: {slot1: createSlot('slot1'), slot2: createSlot('slot2')}});
      const config = createConfig({externalSlots: ['slot1']});
      const scope = new LimitedPluginScope(root, config);
      expect(scope.slots.slot1).toBe(root.slots.slot1);
      expect(scope.slots.slot2).toBe(undefined);
      expect(scope.slots).not.toHaveProperty('slot2');
    });

    it('should correctly pass down request for synchronizing data', () => {
      const root = createScope({});
      const config = createConfig({});
      const scope = new LimitedPluginScope(root, config);
      const syncFn = () => 1;
      const result = scope.sync(syncFn, 123);
      expect(root.sync.mock.calls).toEqual([[syncFn, 123]]);
      expect(result).toBe(root.sync.mock.results[0].value);
    });

    it('should not copy root scope storages', () => {
      const root = createScope({data: {value1: 123}, slots: {slot1: createSlot('slot1')}});
      const config = createConfig({data: ['value1'], slots: ['slot1']});
      const scope = new LimitedPluginScope(root, config);
      expect(scope.data).not.toBe(root.data);
      expect(scope.slots).not.toBe(root.slots);
    });
  });
});
