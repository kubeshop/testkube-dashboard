import {createPlugin} from '../createPlugin';
import {data, slot} from '../utils';

import {detectDirectDependencies} from './detectDirectDependencies';

describe('plugins', () => {
  describe('detectDirectDependencies', () => {
    it('should list direct dependencies for multiple plugins', () => {
      const plugins = [
        createPlugin('test-name-1').define(data()('key1', 'key2')).define(slot()('slot1', 'slot2')).init(),
        createPlugin('test-name-1').needs(data()('key1', 'key3')).needs(slot()('slot1', 'slot3')).init(),
        createPlugin('test-name-1').define(data()('key4')).init(),
        createPlugin('test-name-1').define(data()('key2')).init(),
        createPlugin('test-name-1').needs(data()('key2')).init(),
        createPlugin('test-name-1').needs(slot()('slot2')).init(),
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
