import type {GetPluginState, Plugin} from './internal/Plugin';
import type {EmptyPluginState} from './internal/types';
import {pick} from './internal/utils';

const empty: EmptyPluginState = {
  config: {},
  externalSlots: {},
  externalData: {},
  outerSlots: {},
  outerData: {},
  data: {},
  slots: {},
  urls: {},
};

type ArrayElement<T> = T extends Array<infer V> ? V : never;

export const externalSlots =
  <T extends Record<string, any>>() =>
  <K extends (keyof T)[]>(...names: K): EmptyPluginState & {slots: Pick<T, ArrayElement<K>>} =>
    ({
      ...empty,
      slots: pick({} as any, names as any),
    } as any);
export const externalData =
  <T extends Record<string, any>>() =>
  <K extends (keyof T)[]>(...names: K): EmptyPluginState & {data: Pick<T, ArrayElement<K>>} =>
    ({...empty, data: pick({}, names as any)} as any);

export const external = <T extends Plugin<any>>() => ({
  slots: externalSlots<GetPluginState<T>['slots']>(),
  data: externalData<GetPluginState<T>['data']>(),
});

export const slot =
  <T = any>() =>
  <K extends string>(...names: K[]): EmptyPluginState & {slots: Record<K, T>} => ({
    ...empty,
    slots: pick({} as Record<K, any>, names) as any,
  });
export const data =
  <T = any>() =>
  <K extends string>(...names: K[]): EmptyPluginState & {data: Record<K, T>} => ({
    ...empty,
    data: pick({} as Record<K, any>, names) as any,
  });
export const config =
  <T = any>() =>
  <K extends string, U extends T | undefined>(
    name: K,
    defaultValue?: U
  ): EmptyPluginState & {config: Record<K, T | U>} => ({
    ...empty,
    config: {[name]: defaultValue} as any,
  });
