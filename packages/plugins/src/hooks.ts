import {useContext, useMemo, useRef} from 'react';

import type {GetPluginState, Plugin} from './internal/Plugin';
import {PluginScope} from './internal/PluginScope';
import {PluginScopeContext} from './internal/PluginScopeProvider';
import type {GetSlots, PluginScopeDataRecord, PluginScopeStateFor, PluginSlotContainer} from './internal/types';

export const usePluginScope = <T extends Plugin<any>>(): PluginScope<PluginScopeStateFor<GetPluginState<T>>> =>
  useContext(PluginScopeContext).root as any;

export const createUseData =
  <T extends Plugin<any>>() =>
  (): PluginScopeDataRecord<PluginScopeStateFor<GetPluginState<T>>> =>
    usePluginScope<T>().data as any;
export const createUseSlot =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K][] => {
    const results = usePluginScope<T>().slots[key]?.allRaw();
    const resultsRef = useRef<PluginSlotContainer<T>[]>();
    if (results?.length !== resultsRef.current?.length || resultsRef.current?.some((x, i) => results![i] !== x)) {
      resultsRef.current = results;
    }
    return useMemo(() => resultsRef.current?.map(x => x.value) || [], [resultsRef.current]);
  };
export const createUseSlotFirst =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K] | undefined =>
    usePluginScope<T>().slots[key]?.first();
// TODO: createUseRoute
