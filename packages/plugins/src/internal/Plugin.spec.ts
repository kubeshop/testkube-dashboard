import {Plugin} from './Plugin';
import {PluginScope} from './PluginScope';
import {PluginDetails as PluginDetailsSymbol, PluginInit} from './symbols';
import {PluginDetails} from './types';

describe('plugins', () => {
  describe('Plugin', () => {
    it('should expose initialization function', () => {
      const config = {} as PluginDetails<any>;
      const scope = {} as PluginScope<any>;
      const init = jest.fn();
      const plugin = new Plugin(config, init);
      plugin[PluginInit](scope, {});
      expect(init).toHaveBeenCalledTimes(1);
      expect(init).toHaveBeenCalledWith(scope, {});
    });

    it('should expose details', () => {
      const config = {} as PluginDetails<any>;
      const init = jest.fn();
      const plugin = new Plugin(config, init);
      expect(plugin[PluginDetailsSymbol]).toBe(config);
    });
  });
});
