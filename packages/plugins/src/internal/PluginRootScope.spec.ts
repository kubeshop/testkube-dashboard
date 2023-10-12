import {PluginRootScope} from './PluginRootScope';
import {PluginSlot} from './PluginSlot';
import {PluginScopeCallSync} from './symbols';

describe('plugins', () => {
  describe('PluginRootScope', () => {
    it('should have empty data initially', () => {
      expect(new PluginRootScope([]).data).toEqual({});
    });

    it('should have empty slots when none provided', () => {
      expect(new PluginRootScope([]).slots).toEqual({});
    });

    it('should create slots when provided', () => {
      expect(new PluginRootScope(['slot1', 'slot2']).slots).toEqual({
        slot1: expect.any(PluginSlot),
        slot2: expect.any(PluginSlot),
      });
    });

    it('should allow setting data', () => {
      const scope = new PluginRootScope([]);
      scope.data.abc = 'xyz';
      expect(scope.data.abc).toBe('xyz');
    });

    it('should return default value before synchronization', () => {
      const scope = new PluginRootScope([]);
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
      const scope = new PluginRootScope([]);
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
      const scope = new PluginRootScope([]);
      const fn = jest.fn(() => Math.random());
      const fnSync = scope.sync(fn);
      scope[PluginScopeCallSync]();
      scope[PluginScopeCallSync]();
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fnSync()).toBe(fn.mock.results[1].value);
    });
  });
});
