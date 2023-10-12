import {PluginSlot} from './PluginSlot';

describe('plugins', () => {
  describe('PluginSlot', () => {
    it('should correctly order added elements', () => {
      const storage: any = {};
      const slot = new PluginSlot('key1', storage);
      slot.add('item500', {order: 500, enabled: () => true});
      slot.add('item0');
      slot.add('item-300', {order: -300});
      slot.add('item-Infinity', {order: -Infinity, enabled: false});
      slot.add('itemInfinity', {order: Infinity});
      expect(Object.keys(storage)).toEqual(['key1']);
      expect(storage.key1).toEqual([
        {value: 'item-Infinity', metadata: {order: -Infinity, enabled: false}},
        {value: 'item-300', metadata: {order: -300}},
        {value: 'item0', metadata: {order: 0}},
        {value: 'item500', metadata: {order: 500, enabled: expect.any(Function)}},
        {value: 'itemInfinity', metadata: {order: Infinity}},
      ]);
    });

    it('should return correct empty values when nothing set', () => {
      const storage: any = {};
      const slot = new PluginSlot('key1', storage);
      expect(slot.all()).toEqual([]);
      expect(slot.first()).toBe(undefined);
    });

    it('should return correct empty values', () => {
      const storage: any = {};
      const slot = new PluginSlot('key1', storage);
      slot.add('itemInfinity', {order: Infinity, enabled: false});
      expect(slot.all()).toEqual([]);
      expect(slot.first()).toBe(undefined);
    });

    it('should get items correctly based on static filters', () => {
      const storage: any = {};
      const slot = new PluginSlot('key1', storage);
      slot.add('item500', {order: 500, enabled: () => true});
      slot.add('item0');
      slot.add('item-300', {order: -300, enabled: () => false});
      slot.add('item-Infinity', {order: -Infinity, enabled: () => undefined});
      slot.add('itemInfinity', {order: Infinity, enabled: false});
      expect(slot.all()).toEqual(['item0', 'item500']);
      expect(slot.first()).toEqual('item0');
    });

    it('should get items correctly based on dynamic filters', () => {
      const storage: any = {};
      const slot = new PluginSlot('key1', storage);
      let conditional = true;
      slot.add('item500', {order: 500, enabled: () => conditional});
      slot.add('item0');
      slot.add('item-300', {order: -300, enabled: () => !conditional});
      slot.add('item-Infinity', {order: -Infinity, enabled: () => undefined});
      slot.add('itemInfinity', {order: Infinity, enabled: false});
      const beforeAll = slot.all();
      const beforeFirst = slot.first();
      conditional = false;
      const afterAll = slot.all();
      const afterFirst = slot.first();
      expect(beforeAll).toEqual(['item0', 'item500']);
      expect(beforeFirst).toEqual('item0');
      expect(afterAll).toEqual(['item-300', 'item0']);
      expect(afterFirst).toEqual('item-300');
    });
  });
});
