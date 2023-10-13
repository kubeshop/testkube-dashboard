import {createPlugin} from '../createPlugin';
import {data, slot} from '../utils';

import {detectResources} from './detectResources';
import {PluginState} from './types';

const emptyState = {
  externalSlots: {},
  externalData: {},
  outerSlots: {},
  outerData: {},
  data: {},
  slots: {},
  urls: {},
};

const d = (...names: string[]) =>
  names.reduce((acc, name) => ({...acc, data: {...acc.data, ...data()(name).data}}), {...emptyState, data: {}});
const s = (...names: string[]): PluginState =>
  names.reduce((acc, name) => ({...acc, slots: {...acc.slots, ...slot()(name).slots}}), {...emptyState, slots: {}});

describe('plugins', () => {
  describe('detectResources', () => {
    it('should detect resources from multiple plugins', () => {
      const plugins = [
        createPlugin('test-name-1').define(d('key1', 'key2')).define(s('slot1', 'slot2')).init(),
        createPlugin('test-name-2').define(d('key1', 'key3')).define(s('slot1', 'slot3')).init(),
        createPlugin('test-name-3').define(d('key4')).init(),
        createPlugin('test-name-4').define(s('slot4')).init(),
      ];
      expect(detectResources(plugins)).toEqual({
        slots: {slot1: [plugins[0], plugins[1]], slot2: [plugins[0]], slot3: [plugins[1]], slot4: [plugins[3]]},
        data: {key1: [plugins[0], plugins[1]], key2: [plugins[0]], key3: [plugins[1]], key4: [plugins[2]]},
        outerSlots: [],
        outerData: [],
      });
    });

    it('should detect resources from multiple plugins, including optional', () => {
      const plugins = [
        createPlugin('test-name-1').define(d('key1', 'key2')).define(s('slot1', 'slot2')).init(),
        createPlugin('test-name-2').define(d('key1', 'key3')).define(s('slot1', 'slot3')).init(),
        createPlugin('test-name-3').define(d('key4')).init(),
        createPlugin('test-name-4').define(s('slot4')).outer(d('key3', 'key5')).outer(s('slot3', 'slot5')).init(),
      ];
      expect(detectResources(plugins)).toEqual({
        slots: {slot1: [plugins[0], plugins[1]], slot2: [plugins[0]], slot3: [plugins[1]], slot4: [plugins[3]]},
        data: {key1: [plugins[0], plugins[1]], key2: [plugins[0]], key3: [plugins[1]], key4: [plugins[2]]},
        // Ignore existing `key3`/`slot3` and expose unknown `key5`/`slot5`
        outerSlots: ['slot5'],
        outerData: ['key5'],
      });
    });
  });
});
