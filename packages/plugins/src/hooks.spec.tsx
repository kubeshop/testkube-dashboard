import {renderHook} from '@testing-library/react';

import {createUseData, createUseSlot, createUseSlotFirst} from './hooks';
import {PluginScopeContext} from './internal/PluginScopeProvider';

describe('plugins', () => {
  describe('hooks', () => {
    describe('useData', () => {
      const useData = createUseData();

      it('should return the whole data object', () => {
        const root: any = {data: {key1: 'def'}};
        const {result} = renderHook(() => useData(), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual(root.data);
      });
    });

    describe('useSlot', () => {
      const useSlot = createUseSlot();

      it('should return all items from the slot', () => {
        const root: any = {slots: {slot1: {allRaw: jest.fn(() => [{value: 'value1'}, {value: 'value2'}])}}};
        const {result} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual(['value1', 'value2']);
      });

      it('should memoize the array', () => {
        const items = [{value: 'value1'}, {value: 'value2'}];
        const root: any = {slots: {slot1: {allRaw: jest.fn(() => [...items])}}};
        const {result, rerender} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        const prevResult = result.current;
        rerender();
        expect(result.current).toBe(prevResult);
      });

      it('should change the array if the values count is changed', () => {
        const items = [{value: 'value1'}, {value: 'value2'}];
        const root: any = {slots: {slot1: {allRaw: jest.fn(() => [...items])}}};
        const {result, rerender} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        const prevResult = result.current;
        items.push({value: 'value3'});
        rerender();
        expect(result.current).not.toBe(prevResult);
        expect(result.current).toEqual(['value1', 'value2', 'value3']);
      });

      it('should change the array if some item is changed', () => {
        const items = [{value: 'value1'}, {value: 'value2'}];
        const root: any = {slots: {slot1: {allRaw: jest.fn(() => [...items])}}};
        const {result, rerender} = renderHook(() => useSlot('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        const prevResult = result.current;
        items[0] = {value: 'value3'};
        rerender();
        expect(result.current).not.toBe(prevResult);
        expect(result.current).toEqual(['value3', 'value2']);
      });

      it('should return empty list for unknown slot', () => {
        const root: any = {slots: {slot1: {allRaw: jest.fn(() => [{value: 'value1'}, {value: 'value2'}])}}};
        const {result} = renderHook(() => useSlot('slotUnknown'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual([]);
      });
    });

    describe('useSlotFirst', () => {
      const useSlotFirst = createUseSlotFirst();

      it('should return the first item from the slot', () => {
        const root: any = {slots: {slot1: {first: jest.fn(() => 'value1')}}};
        const {result} = renderHook(() => useSlotFirst('slot1'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual('value1');
      });

      it('should return nothing from unknown slot', () => {
        const root: any = {slots: {slot1: {first: jest.fn(() => 'value1')}}};
        const {result} = renderHook(() => useSlotFirst('slotUnknown'), {
          wrapper: ({children}) => <PluginScopeContext.Provider value={{root}}>{children}</PluginScopeContext.Provider>,
        });
        expect(result.current).toEqual(undefined);
      });
    });
  });
});
