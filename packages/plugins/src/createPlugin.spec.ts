import {createPlugin} from './createPlugin';
import {PluginBuilder} from './internal/PluginBuilder';
import {PluginDetails} from './internal/symbols';

describe('plugins', () => {
  describe('createPlugin', () => {
    it('should return empty PluginBuilder', () => {
      const builder = createPlugin('test-name', 'test-version');
      const plugin = builder.init();
      expect(builder).toBeInstanceOf(PluginBuilder);
      expect(plugin[PluginDetails]).toEqual({
        name: 'test-name',
        version: 'test-version',
        order: 0,
        data: {},
        slots: {},
        externalData: {},
        externalSlots: {},
        outerData: {},
        outerSlots: {},
        urls: {},
        routes: [],
        providers: [],
      });
    });
  });
});
