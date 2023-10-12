import {PluginRootScope} from './PluginRootScope';
import {PluginSlot} from './PluginSlot';

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

    it('should return default value for synchronization', () => {
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
  });
});
