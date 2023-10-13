import type {ReactElement} from 'react';

import type {PluginSlot} from './PluginSlot';

export interface PluginRouteMetadata {
  readonly order?: number;
}

export interface PluginSlotMetadata {
  readonly enabled?: (() => boolean | null | undefined) | boolean;
  readonly order?: number;
}

export interface PluginSlotContainer<T> {
  value: T;
  metadata: PluginSlotMetadata;
}

export interface PluginRoute {
  readonly path: string;
  readonly element: ReactElement;
  readonly metadata: PluginRouteMetadata;
}

export interface PluginProvider<T> {
  type: (props: T) => ReactElement | null;
  props: T;
}

export interface PluginState {
  // Dependencies
  readonly externalData: Record<string, any>;
  readonly externalSlots: Record<string, any>;

  // Public interface
  readonly data: Record<string, any>;
  readonly slots: Record<string, any>;

  // Routing
  readonly urls: Record<string, true>;
}

export interface EmptyPluginState extends PluginState {
  readonly externalData: {};
  readonly externalSlots: {};
  readonly data: {};
  readonly slots: {};
  readonly urls: {};
}

export interface PluginDetails<T extends PluginState> extends PluginState {
  // Keep the metadata
  readonly name: string;
  readonly version: string | null;
  readonly order: number;

  // Keep the data
  readonly routes: readonly PluginRoute[];
  readonly providers: readonly PluginProvider<any>[];

  // Keep the state
  readonly externalData: T['externalData'];
  readonly externalSlots: T['externalSlots'];
  readonly data: T['data'];
  readonly slots: T['slots'];
  readonly urls: T['urls'];
}

export type GetData<T extends PluginState> = T['data'];
export type GetExternalData<T extends PluginState> = T['externalData'];
export type GetSlots<T extends PluginState> = T['slots'];
export type GetAccessibleData<T extends PluginState> = Readonly<T['externalData']> & T['data'];
export type GetAccessibleSlots<T extends PluginState> = T['externalSlots'] & T['slots'];

export type AppendRoute<T extends PluginState, U extends string> = T & {urls: Record<U, true>};
export type AppendData<T extends PluginState, U extends Record<string, any>> = T & {data: U};
export type AppendSlots<T extends PluginState, U extends Record<string, any>> = T & {slots: U};
export type AppendExternalData<T extends PluginState, U extends Record<string, any>> = T & {externalData: U};
export type AppendExternalSlots<T extends PluginState, U extends Record<string, any>> = T & {externalSlots: U};
export type JoinState<T extends PluginState, U extends PluginState> = AppendData<
  AppendSlots<T, GetSlots<U>>,
  GetData<U>
>;
export type JoinExternalState<T extends PluginState, U extends PluginState> = AppendExternalData<
  AppendExternalSlots<T, GetSlots<U>>,
  GetData<U>
>;

export interface PluginScopeState {
  slots: Record<string, any>;
  inheritedSlots: Record<string, any>;
  data: Record<string, any>;
  inheritedData: Record<string, any>;
  inheritedReadonlyData: Record<string, any>;
}

export type PluginScopeStateFor<T extends PluginState> = {
  slots: {};
  inheritedSlots: T['slots'] & T['externalSlots'];
  data: {};
  inheritedData: T['data'] & T['externalData'];
  inheritedReadonlyData: {};
};

export interface PluginScopeConfig<T extends PluginScopeState> {
  slots: (keyof T['slots'])[];
  inheritedSlots: (keyof T['inheritedSlots'])[];
  data: (keyof T['data'])[];
  inheritedData: (keyof T['inheritedData'])[];
  inheritedReadonlyData: (keyof T['inheritedReadonlyData'])[];
}

export type PluginScopeSlotRecord<T extends PluginScopeState> = {
  [K in keyof T['slots'] | keyof T['inheritedSlots']]: T['slots'] extends Record<K, any>
    ? PluginSlot<T['slots'][K]>
    : PluginSlot<T['inheritedSlots'][K]>;
};

export type PluginScopeDataRecord<T extends PluginScopeState> = {
  readonly [K in keyof T['inheritedReadonlyData']]: T['inheritedReadonlyData'][K];
} & {
  [K in keyof T['data'] | keyof T['inheritedData']]: T['data'] extends Record<K, any>
    ? T['data'][K]
    : T['inheritedData'][K];
};
