import {useRef} from 'react';

import {act, renderHook} from '@testing-library/react';

import {createPluginScopeMock} from '../test/createPluginScopeMock';

import {createUseData, createUseSlot, createUseSlotFirst} from './hooks';
import {PluginScopeContext} from './internal/PluginScopeProvider';
import {PluginScopeAttachProducer, PluginScopeDestroy} from './internal/symbols';

const useRenderCount = () => {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
};

const frame = () => new Promise(resolve => requestAnimationFrame(resolve));

describe('plugins', () => {
  describe('hooks', () => {
    describe('useData', () => {
      const useData = createUseData();

      it('should return the whole data object', () => {
        const root = createPluginScopeMock({data: {key1: 'def'}});
        const {result} = renderHook(() => useData(), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual(root.data);
      });

      it('should re-render when the data change', async () => {
        const root = createPluginScopeMock({data: {key1: 'def'}});
        const {result} = renderHook(() => `_${useData().key1}`, {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.data.key1 = 'xyz';
          await frame();
        });
        expect(result.current).toEqual('_xyz');
      });

      it('should re-render when even different data change', async () => {
        const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
        const {result} = renderHook(() => `${useRenderCount()}_${useData().key1}`, {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.data.key2 = 'abc';
          await frame();
        });
        expect(result.current).toEqual('2_def');
      });

      describe('useData.pick', () => {
        it('should take selected data only', () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz', key3: 'cde'}});
          const {result} = renderHook(() => useData.pick('key1', 'key2'), {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          expect(result.current).toEqual({key1: 'def', key2: 'xyz'});
        });

        it('should re-render when its values change', async () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => `${useRenderCount()}_${useData.pick('key1').key1}`, {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          await act(async () => {
            root.data.key1 = 'abc';
            await frame();
          });
          expect(result.current).toEqual('2_abc');
        });

        it('should not re-render when other values change', async () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => `${useRenderCount()}_${useData.pick('key1').key1}`, {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          await act(async () => {
            root.data.key2 = 'abc';
            await frame();
          });
          expect(result.current).toEqual('1_def');
        });

        it('should persist the same identity after re-render when data are not changed', () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result, rerender} = renderHook(() => useData.pick('key1'), {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          const prevValue = result.current;
          rerender();
          expect(result.current).toBe(prevValue);
        });
      });

      describe('useData.select', () => {
        it('should take selector value only', () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => useData.select(x => x.key1), {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          expect(result.current).toEqual('def');
        });

        it('should re-render when the selector value change', async () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => `${useRenderCount()}_${useData.select(x => x.key1)}`, {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          await act(async () => {
            root.data.key1 = 'abc';
            await frame();
          });
          expect(result.current).toEqual('2_abc');
        });

        it('should re-render when selector value is object and has different identity', async () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => [useRenderCount(), useData.select(x => ({a: x.key1}))], {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          const prevValue = result.current;
          await act(async () => {
            root.data.key2 = 'abc';
            await frame();
          });
          expect(result.current).toEqual([2, {a: 'def'}]);
          expect(result.current[1]).not.toBe(prevValue[1]);
        });

        it('should not re-render when selector value is object and has same identity', async () => {
          const root = createPluginScopeMock({data: {key1: {a: 'def'}, key2: 'xyz'}});
          const {result} = renderHook(() => [useRenderCount(), useData.select(x => x.key1)], {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          const prevValue = result.current;
          await act(async () => {
            root.data.key2 = 'abc';
            await frame();
          });
          expect(result.current).toBe(prevValue);
        });

        it('should not recompute on re-render', () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result, rerender} = renderHook(() => useData.select(x => ({a: x.key1})), {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          const prevValue = result.current;
          rerender();
          expect(result.current).toBe(prevValue);
        });
      });

      describe('useData.shallow', () => {
        it('should take selector value only', () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => useData.shallow(x => x.key1), {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          expect(result.current).toEqual('def');
        });

        it('should re-render when the selector value change', async () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => `${useRenderCount()}_${useData.shallow(x => x.key1)}`, {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          await act(async () => {
            root.data.key1 = 'abc';
            await frame();
          });
          expect(result.current).toEqual('2_abc');
        });

        it('should not re-render when selector value is object and has different identity, but same values', async () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result} = renderHook(() => [useRenderCount(), useData.shallow(x => ({a: x.key1}))], {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          const prevValue = result.current;
          await act(async () => {
            root.data.key2 = 'abc';
            await frame();
          });
          expect(result.current).toBe(prevValue);
        });

        it('should re-render when selector value is object and has different values', async () => {
          const root = createPluginScopeMock({data: {key1: 'abc', key2: 'xyz'}});
          const {result} = renderHook(() => [useRenderCount(), useData.shallow(x => ({a: x.key1}))], {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          await act(async () => {
            root.data.key1 = 'xxx';
            await frame();
          });
          expect(result.current).toEqual([2, {a: 'xxx'}]);
        });

        it('should not recompute on re-render', () => {
          const root = createPluginScopeMock({data: {key1: 'def', key2: 'xyz'}});
          const {result, rerender} = renderHook(() => useData.shallow(x => ({a: x.key1})), {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          });
          const prevValue = result.current;
          rerender();
          expect(result.current).toBe(prevValue);
        });
      });
    });

    describe('useSlot', () => {
      const useSlot = createUseSlot();

      it('should return all items from the slot', () => {
        const root = createPluginScopeMock({slots: {slot1: ['value1', 'value2']}});
        const {result} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual(['value1', 'value2']);
      });

      it('should memoize the array', () => {
        const items = ['value1', 'value2'];
        const root = createPluginScopeMock({slots: {slot1: [...items]}});
        const {result, rerender} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        const prevResult = result.current;
        rerender();
        expect(result.current).toBe(prevResult);
      });

      it('should change the array if the values count is changed', () => {
        const root = createPluginScopeMock({slots: {slot1: ['value1', 'value2']}});
        const {result, rerender} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        const prevResult = result.current;
        root.slots.slot1.add('value3');
        rerender();
        expect(result.current).not.toBe(prevResult);
        expect(result.current).toEqual(['value1', 'value2', 'value3']);
      });

      it('should change the array if some item is changed', () => {
        let enabled = true;
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1', {enabled: () => enabled});
        root.slots.slot1.add('value2');
        root.slots.slot1.add('value3', {enabled: () => !enabled});
        const {result, rerender} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        const prevResult = result.current;
        enabled = false;
        rerender();
        expect(result.current).not.toBe(prevResult);
        expect(result.current).toEqual(['value2', 'value3']);
      });

      it('should return empty list for unknown slot', () => {
        const root = createPluginScopeMock({slots: {slot1: ['value1', 'value2']}});
        const {result} = renderHook(() => useSlot('slotUnknown'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual([]);
      });

      it('should re-render when added a new item', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1');

        const {result} = renderHook(() => [useRenderCount(), useSlot('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1.add('value2');
          await frame();
        });
        expect(result.current).toEqual([2, ['value1', 'value2']]);
      });

      it('should re-render when deleted an item', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1');
        root.slots.slot1[PluginScopeAttachProducer]({}).add('value2');

        const {result} = renderHook(() => [useRenderCount(), useSlot('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1[PluginScopeDestroy](root);
          await frame();
        });
        expect(result.current).toEqual([2, ['value2']]);
      });

      it('should not re-render when deleted a disabled item', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1', {enabled: false});
        root.slots.slot1[PluginScopeAttachProducer]({}).add('value2');

        const {result} = renderHook(() => [useRenderCount(), useSlot('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1[PluginScopeDestroy](root);
          await frame();
        });
        expect(result.current).toEqual([1, ['value2']]);
      });

      it('should not re-render when adding a disabled item', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1');

        const {result} = renderHook(() => [useRenderCount(), useSlot('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1.add('value2', {enabled: false});
          await frame();
        });
        expect(result.current).toEqual([1, ['value1']]);
      });

      it('should use defaults', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1', {order: 30});

        const {result} = renderHook(
          () => [
            useRenderCount(),
            useSlot('slot1', [
              {value: 'value2', metadata: {order: 28, enabled: () => false}},
              {value: 'value3', metadata: {order: 29}},
              {value: 'value4', metadata: {order: 30}},
              {value: 'value5', metadata: {order: 31}},
            ]),
          ],
          {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          }
        );
        expect(result.current).toEqual([1, ['value3', 'value4', 'value1', 'value5']]);
      });
    });

    describe('useSlotFirst', () => {
      const useSlotFirst = createUseSlotFirst();

      it('should return the first item from the slot', () => {
        const root = createPluginScopeMock({slots: {slot1: ['value1']}});
        const {result} = renderHook(() => useSlotFirst('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual('value1');
      });

      it('should return nothing from unknown slot', () => {
        const root = createPluginScopeMock({slots: {slot1: ['value1']}});
        const {result} = renderHook(() => useSlotFirst('slotUnknown'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual(undefined);
      });

      it('should re-render when added a new first item', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1');

        const {result} = renderHook(() => [useRenderCount(), useSlotFirst('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1.add('value2', {order: -1});
          await frame();
        });
        expect(result.current).toEqual([2, 'value2']);
      });

      it('should re-render when deleted a first item', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1');
        root.slots.slot1[PluginScopeAttachProducer]({}).add('value2');

        const {result} = renderHook(() => [useRenderCount(), useSlotFirst('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1[PluginScopeDestroy](root);
          await frame();
        });
        expect(result.current).toEqual([2, 'value2']);
      });

      it('should not re-render when added a new item, but it is not first', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1');

        const {result} = renderHook(() => [useRenderCount(), useSlotFirst('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1.add('value2');
          await frame();
        });
        expect(result.current).toEqual([1, 'value1']);
      });

      it('should not re-render when deleted an item, but it is not first', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1[PluginScopeAttachProducer]({}).add('value1');
        root.slots.slot1.add('value2');

        const {result} = renderHook(() => [useRenderCount(), useSlotFirst('slot1')], {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        await act(async () => {
          root.slots.slot1[PluginScopeDestroy](root);
          await frame();
        });
        expect(result.current).toEqual([1, 'value1']);
      });

      it('should use defaults (first in default)', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1', {order: 30});

        const {result} = renderHook(
          () => [
            useRenderCount(),
            useSlotFirst('slot1', [
              {value: 'value3', metadata: {order: 31}},
              {value: 'value2', metadata: {order: 30}},
            ]),
          ],
          {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          }
        );
        expect(result.current).toEqual([1, 'value2']);
      });

      it('should use defaults (first in own)', async () => {
        const root = createPluginScopeMock({slots: {slot1: []}});
        root.slots.slot1.add('value1', {order: 30});

        const {result} = renderHook(
          () => [
            useRenderCount(),
            useSlotFirst('slot1', [
              {value: 'value2', metadata: {order: 31}},
              {value: 'value3', metadata: {order: 32}},
            ]),
          ],
          {
            wrapper: ({children}) => (
              <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>
            ),
          }
        );
        expect(result.current).toEqual([1, 'value1']);
      });
    });
  });
});
