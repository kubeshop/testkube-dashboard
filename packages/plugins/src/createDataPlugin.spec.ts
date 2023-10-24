import {PluginResolver} from './PluginResolver';
import {createDataPlugin} from './createDataPlugin';
import {PluginDetails} from './internal/symbols';

describe('plugins', () => {
  describe('createDataPlugin', () => {
    it('should build a data plugin properly', () => {
      const plugin = createDataPlugin('example')({
        value1: undefined,
        value2: 'defaultValue2',
        value3: 'defaultValue3',
        value4: 'defaultValue4',
      });
      const [, {initialize}] = PluginResolver.of(
        plugin.configure({value1: 'test1', value2: 'test2', value3: undefined})
      ).resolve();
      expect(plugin[PluginDetails].config).toEqual({
        value1: undefined,
        value2: 'defaultValue2',
        value3: 'defaultValue3',
        value4: 'defaultValue4',
      });
      expect(Object.keys(plugin[PluginDetails].data)).toEqual(['value1', 'value2', 'value3', 'value4']);
      expect(initialize().data).toEqual({
        value1: 'test1',
        value2: 'test2',
        value3: 'defaultValue3',
        value4: 'defaultValue4',
      });
    });
  });
});
