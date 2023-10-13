import {useContext} from 'react';

import type {LocalPluginScope} from './internal/LocalPluginScope';
import type {GetPluginState, Plugin} from './internal/Plugin';
import {PluginRootContext} from './internal/PluginRootScopeProvider';
import type {GetSlots} from './internal/types';

export const createUseData =
  <T extends Plugin<any>>() =>
  (): LocalPluginScope<GetPluginState<T>>['data'] =>
    useContext(PluginRootContext).root.data;
export const createUseSlot =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K][] =>
    useContext(PluginRootContext).root.slots[key]?.all() || [];
export const createUseSlotFirst =
  <T extends Plugin<any>>() =>
  <K extends keyof GetSlots<GetPluginState<T>>>(key: K): GetSlots<GetPluginState<T>>[K] | undefined =>
    useContext(PluginRootContext).root.slots[key]?.first();
// TODO: createUseRoute
