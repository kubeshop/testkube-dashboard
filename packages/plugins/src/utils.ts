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

type PluginDataName<T extends Plugin<any>> = keyof GetData<GetPluginState<T>>;
type PluginSlotName<T extends Plugin<any>> = keyof GetSlots<GetPluginState<T>>;
type ArrayElement<T> = T extends Array<infer V> ? V : never;

export const external = <T extends Plugin<any>>() => ({
  slots: <U extends PluginSlotName<T>[]>(
    ...names: U
  ): AppendSlots<EmptyPluginState, Pick<GetSlots<GetPluginState<T>>, ArrayElement<U>>> => ({
    ...empty,
    slots: pick({} as Record<ArrayElement<U>, any>, names as any),
  }),
  data: <U extends PluginDataName<T>[]>(
    ...names: U
  ): AppendData<EmptyPluginState, Pick<GetData<GetPluginState<T>>, ArrayElement<U>>> => ({
    ...empty,
    data: pick({} as Record<ArrayElement<U>, any>, names as any),
  }),
});

export const slot =
  <T = any>() =>
  <K extends string>(...names: K[]): AppendSlots<EmptyPluginState, Record<K, T>> => ({
    ...empty,
    slots: pick({} as Record<K, any>, names) as any,
  });
export const data =
  <T = any>() =>
  <K extends string>(...names: K[]): AppendData<EmptyPluginState, Record<K, T>> => ({
    ...empty,
    data: pick({} as Record<K, any>, names) as any,
  });
