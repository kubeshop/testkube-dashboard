import {render} from '@testing-library/react';

import {createPlugin} from '../createPlugin';

import {PluginLocalProvider} from './PluginLocalProvider';
import {PluginRootScope} from './PluginRootScope';
import {PluginRootContext} from './PluginRootScopeProvider';
import {PluginScopeCallSync} from './symbols';

describe('plugins', () => {
  describe('PluginLocalProvider', () => {
    it('should synchronize data on root scope children', () => {
      const plugin = createPlugin('plugin').init();
      const root = new PluginRootScope([]);
      const child = root.children(plugin);
      const syncSpy = jest.spyOn(child, PluginScopeCallSync as any);

      render(
        <PluginRootContext.Provider value={{root}}>
          <PluginLocalProvider plugin={plugin} />
        </PluginRootContext.Provider>
      );

      expect(syncSpy).toHaveBeenCalledTimes(1);
    });

    it('should synchronize on each render', () => {
      const plugin = createPlugin('plugin').init();
      const root = new PluginRootScope([]);
      const child = root.children(plugin);
      const syncSpy = jest.spyOn(child, PluginScopeCallSync as any);

      const result = render(
        <PluginRootContext.Provider value={{root}}>
          <PluginLocalProvider plugin={plugin} />
        </PluginRootContext.Provider>
      );

      result.rerender(
        <PluginRootContext.Provider value={{root}}>
          <PluginLocalProvider plugin={plugin} />
        </PluginRootContext.Provider>
      );

      expect(syncSpy).toHaveBeenCalledTimes(2);
    });
  });
});
