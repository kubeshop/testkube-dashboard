import type {GetPluginState, Plugin} from './internal/Plugin';
import type {AppendData, AppendSlots, EmptyPluginState, GetData, GetSlots} from './internal/types';
import {pick} from './internal/utils';

const empty: EmptyPluginState = {
  externalSlots: {},
  externalData: {},
  outerSlots: {},
  outerData: {},
  data: {},
  slots: {},
  urls: {},
};

export const external = <T extends Plugin<any>>() => ({
  slots: <K extends keyof GetSlots<GetPluginState<T>>>(
    ...names: K[]
  ): AppendSlots<EmptyPluginState, Pick<GetSlots<GetPluginState<T>>, K>> => ({
    ...empty,
    slots: pick({} as Record<K, any>, names),
  }),
  data: <K extends keyof GetPluginState<T>['data']>(
    ...names: K[]
  ): AppendData<EmptyPluginState, Pick<GetData<GetPluginState<T>>, K>> => ({
    ...empty,
    data: pick({} as Record<K, any>, names),
  }),
});

export const slot =
  <T = any>() =>
  <K extends string>(name: K): AppendSlots<EmptyPluginState, Record<K, T>> => ({
    ...empty,
    slots: {[name]: undefined} as any,
  });
export const data =
  <T = any>() =>
  <K extends string>(name: K): AppendData<EmptyPluginState, Record<K, T>> => ({
    ...empty,
    data: {[name]: undefined} as any,
  });
