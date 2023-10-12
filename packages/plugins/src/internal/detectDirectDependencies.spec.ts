import {createPlugin} from '../createPlugin';
import {data, slot} from '../utils';

import {detectDirectDependencies} from './detectDirectDependencies';
import {PluginState} from './types';

const emptyState = {
  externalSlots: {},
  externalData: {},
  data: {},
  slots: {},
  urls: {},
};

const d = (...names: string[]) =>
  names.reduce((acc, name) => ({...acc, data: {...acc.data, ...data()(name).data}}), {...emptyState, data: {}});
const s = (...names: string[]): PluginState =>
  names.reduce((acc, name) => ({...acc, slots: {...acc.slots, ...slot()(name).slots}}), {...emptyState, slots: {}});

describe('plugins', () => {
  describe('detectDirectDependencies', () => {
    it('should list direct dependencies for multiple plugins', () => {
      const plugins = [
        createPlugin('test-name-1').define(d('key1', 'key2')).define(s('slot1', 'slot2')).init(),
        createPlugin('test-name-1').needs(d('key1', 'key3')).needs(s('slot1', 'slot3')).init(),
        createPlugin('test-name-1').define(d('key4')).init(),
        createPlugin('test-name-1').define(d('key2')).init(),
        createPlugin('test-name-1').needs(d('key2')).init(),
        createPlugin('test-name-1').needs(s('slot2')).init(),
      ];
      expect(detectDirectDependencies(plugins)).toEqual({
        hard: new Map([
          [plugins[0], new Set([])],
          [plugins[1], new Set([plugins[0]])],
          [plugins[2], new Set([])],
          [plugins[3], new Set([])],
          [plugins[4], new Set([plugins[0], plugins[3]])],
          [plugins[5], new Set([plugins[0]])],
        ]),
        loose: new Map([
          [plugins[0], new Set([])],
          [plugins[1], new Set([plugins[0]])],
          [plugins[2], new Set([])],
          [plugins[3], new Set([])],
          [plugins[4], new Set([plugins[0], plugins[3]])],
          [plugins[5], new Set([])],
        ]),
      });
    });
  });
});
