import {useContext} from 'react';

import type {GetPluginState, Plugin} from './internal/Plugin';
import {PluginScope} from './internal/PluginScope';
import {PluginScopeContext} from './internal/PluginScopeProvider';
import type {GetSlots, PluginScopeDataRecord, PluginScopeStateFor} from './internal/types';

export const usePluginScope = <T extends Plugin<any>>(): PluginScope<PluginScopeStateFor<GetPluginState<T>>> =>
  useContext(PluginScopeContext).root as any;

export const createUseData =
  <T extends Plugin<any>>() =>
  (): PluginScopeDataRecord<PluginScopeStateFor<GetPluginState<T>>> =>
    usePluginScope<T>().data as any;
export const createUseSlot =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K][] =>
    usePluginScope<T>().slots[key]?.all() || [];
export const createUseSlotFirst =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K] | undefined =>
    usePluginScope<T>().slots[key]?.first();
// TODO: createUseRoute
