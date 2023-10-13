import {useContext} from 'react';

import type {GetPluginState, Plugin} from './internal/Plugin';
import {PluginScopeContext} from './internal/PluginScopeProvider';
import type {GetSlots, PluginScopeDataRecord, PluginScopeStateFor} from './internal/types';

export const createUseData =
  <T extends Plugin<any>>() =>
  (): PluginScopeDataRecord<PluginScopeStateFor<GetPluginState<T>>> =>
    useContext(PluginScopeContext).root.data as any;
export const createUseSlot =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K][] =>
    useContext(PluginScopeContext).root.slots[key]?.all() || [];
export const createUseSlotFirst =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K] | undefined =>
    useContext(PluginScopeContext).root.slots[key]?.first();
// TODO: createUseRoute
