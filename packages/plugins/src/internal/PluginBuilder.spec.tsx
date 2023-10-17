import {FC, PropsWithChildren} from 'react';

import {data, external, slot} from '../utils';

import {Plugin} from './Plugin';
import {PluginBuilder} from './PluginBuilder';
import {PluginDetails as PluginDetailsSymbol, PluginInit} from './symbols';

const readDetails = (plugin: Plugin<any>) => plugin[PluginDetailsSymbol];

const empty = () =>
  ({
    name: 'test-name',
    order: 0,
    version: null,
    slots: {},
    data: {},
    externalData: {},
    externalSlots: {},
    outerData: {},
    outerSlots: {},
    urls: {},
    routes: [],
    providers: [],
  } as const);

const create = () => new PluginBuilder<ReturnType<typeof empty>>(empty());

describe('plugins', () => {
  describe('PluginBuilder', () => {
    it('should pass the order', () => {
      const plugin = create().order(500).init();
      expect(readDetails(plugin)).toEqual(
        expect.objectContaining({
          order: 500,
        })
      );
    });

    it('should pass routes', () => {
      const element1 = <div />;
      const element2 = <ul />;
      const plugin = create().route('/test1', element1, {order: 300}).route('/test2', element2, {order: 111}).init();
      expect(readDetails(plugin)).toEqual(
        expect.objectContaining({
          urls: {
            '/test1': true,
            '/test2': true,
          },
          routes: [
            {path: '/test1', element: element1, metadata: {order: 300}},
            {path: '/test2', element: element2, metadata: {order: 111}},
          ],
        })
      );
    });

    it('should pass provider', () => {
      const Provider: FC<PropsWithChildren<{value: string}>> = () => <div />;
      const plugin = create()
        .provider(<Provider value="text1" />)
        .provider({type: Provider, props: {value: 'text2'}})
        .init();
      expect(readDetails(plugin)).toEqual(
        expect.objectContaining({
          providers: [
            {provider: <Provider value="text1" />, metadata: {}},
            {provider: {type: Provider, props: {value: 'text2'}}, metadata: {}},
          ],
        })
      );
    });

    it('should pass static data', () => {
      const plugin = create()
        .data({key1: {x: 'value1'}, key2: {x: 'value2'}})
        .data({key3: 'value3'})
        .init();
      expect(readDetails(plugin)).toEqual(
        expect.objectContaining({
          data: {
            key1: {x: 'value1'},
            key2: {x: 'value2'},
            key3: 'value3',
          },
        })
      );
    });

    it('should pass dynamic definition', () => {
      const plugin = create()
        .define(slot()('slot1'))
        .define(slot()('slot2'))
        .define(data()('key1'))
        .define(data()('key2'))
        .init();
      expect(readDetails(plugin)).toEqual(
        expect.objectContaining({
          data: {key1: undefined, key2: undefined},
          slots: {slot1: undefined, slot2: undefined},
          externalData: {},
          externalSlots: {},
        })
      );
      expect(Object.keys(readDetails(plugin).data)).toEqual(['key1', 'key2']);
      expect(Object.keys(readDetails(plugin).slots)).toEqual(['slot1', 'slot2']);
      expect(Object.keys(readDetails(plugin).externalData)).toEqual([]);
      expect(Object.keys(readDetails(plugin).externalSlots)).toEqual([]);
    });

    it('should pass requirements', () => {
      const parent = create()
        .data({key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4'})
        .define(slot()('slot1'))
        .define(slot()('slot2'))
        .define(slot()('slot3'))
        .define(slot()('slot4'))
        .init();
      const stub = external<typeof parent>();
      const plugin = create()
        .needs(stub.slots('slot1', 'slot2'))
        .needs(stub.slots('slot3'))
        .needs(stub.data('key1', 'key2'))
        .needs(stub.data('key3'))
        .init();
      expect(readDetails(plugin)).toEqual(
        expect.objectContaining({
          data: {},
          slots: {},
          externalData: {key1: undefined, key2: undefined, key3: undefined},
          externalSlots: {slot1: undefined, slot2: undefined, slot3: undefined},
        })
      );
      expect(Object.keys(readDetails(plugin).data)).toEqual([]);
      expect(Object.keys(readDetails(plugin).slots)).toEqual([]);
      expect(Object.keys(readDetails(plugin).externalData)).toEqual(['key1', 'key2', 'key3']);
      expect(Object.keys(readDetails(plugin).externalSlots)).toEqual(['slot1', 'slot2', 'slot3']);
    });

    it('should pass initialization function', () => {
      const init = jest.fn();
      const plugin = create().init(init);
      expect(plugin[PluginInit]).toBe(init);
    });

    it('should not lose track of any assigned props', () => {
      const Provider: FC<PropsWithChildren<{value: string}>> = () => <div />;
      const element = <div />;
      const parent = create()
        .data({key1: 'value1'})
        .data({key3: 'value3'})
        .define(slot()('slot1'))
        .define(slot()('slot3'))
        .init();
      const stub = external<typeof parent>();
      const plugin = create()
        .order(500)
        .needs(stub.data('key1'))
        .needs(stub.slots('slot1'))
        .outer(stub.data('key3'))
        .outer(stub.slots('slot3'))
        .define(slot()('slot2'))
        .define(data()('data2'))
        .data({data3: 'value'})
        .route('/path1', element)
        .provider(<Provider value="text" />)
        .init();
      expect(readDetails(plugin)).toEqual({
        name: empty().name,
        version: empty().version,
        order: 500,
        externalData: {key1: undefined},
        externalSlots: {slot1: undefined},
        outerData: {key3: undefined},
        outerSlots: {slot3: undefined},
        data: {data2: undefined, data3: 'value'},
        slots: {slot2: undefined},
        urls: {'/path1': true},
        providers: [{provider: <Provider value="text" />, metadata: {}}],
        routes: [{path: '/path1', element, metadata: {}}],
      });
      expect(Object.keys(readDetails(plugin).externalData)).toEqual(['key1']);
      expect(Object.keys(readDetails(plugin).externalSlots)).toEqual(['slot1']);
      expect(Object.keys(readDetails(plugin).outerData)).toEqual(['key3']);
      expect(Object.keys(readDetails(plugin).outerSlots)).toEqual(['slot3']);
      expect(Object.keys(readDetails(plugin).data)).toEqual(['data2', 'data3']);
      expect(Object.keys(readDetails(plugin).slots)).toEqual(['slot2']);
    });
  });
});
