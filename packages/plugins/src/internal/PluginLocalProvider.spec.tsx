import {render} from '@testing-library/react';

import {createPlugin} from '../createPlugin';

import {PluginLocalProvider} from './PluginLocalProvider';
import {PluginScope} from './PluginScope';
import {PluginScopeContext} from './PluginScopeProvider';
import {PluginScopeCallSync} from './symbols';

describe('plugins', () => {
  describe('PluginLocalProvider', () => {
    it('should synchronize data on root scope children', () => {
      const plugin = createPlugin('plugin').init();
      const root = new PluginScope(null, {
        slots: [],
        data: [],
        inheritedData: [],
        inheritedSlots: [],
        outerSlots: [],
        inheritedReadonlyData: [],
      });
      const child = root.children(plugin);
      const syncSpy = jest.spyOn(child, PluginScopeCallSync as any);

      render(
        <PluginScopeContext.Provider value={{root}}>
          <PluginLocalProvider plugin={plugin} />
        </PluginScopeContext.Provider>
      );

      expect(syncSpy).toHaveBeenCalledTimes(1);
    });

    it('should synchronize on each render', () => {
      const plugin = createPlugin('plugin').init();
      const root = new PluginScope(null, {
        slots: [],
        data: [],
        inheritedData: [],
        outerSlots: [],
        inheritedSlots: [],
        inheritedReadonlyData: [],
      });
      const child = root.children(plugin);
      const syncSpy = jest.spyOn(child, PluginScopeCallSync as any);

      const result = render(
        <PluginScopeContext.Provider value={{root}}>
          <PluginLocalProvider plugin={plugin} />
        </PluginScopeContext.Provider>
      );

      result.rerender(
        <PluginScopeContext.Provider value={{root}}>
          <PluginLocalProvider plugin={plugin} />
        </PluginScopeContext.Provider>
      );

      expect(syncSpy).toHaveBeenCalledTimes(2);
    });
  });
});
