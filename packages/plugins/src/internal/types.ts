import type {ReactElement} from 'react';

import {PluginScope} from './PluginScope';
import type {PluginSlot} from './PluginSlot';
import {PluginScopeProducer} from './symbols';

export interface PluginRouteMetadata {
  readonly order?: number;
}

export interface PluginSlotMetadata {
  readonly enabled?: (() => boolean | null | undefined) | boolean;
  readonly order?: number;
}

export interface PluginProviderMetadata<T extends PluginState> {
  readonly enabled?: (plugin: PluginScope<PluginScopeStateFor<T>>) => boolean | null | undefined;
}

export interface PluginSlotContainer<T> {
  value: T;
  metadata: PluginSlotMetadata;
  readonly [PluginScopeProducer]?: any;
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

export interface PluginProviderContainer<T, U extends PluginState> {
  provider: PluginProvider<T>;
  metadata: PluginProviderMetadata<U>;
}

export interface PluginState {
  // Dependencies
  readonly externalData: Record<string, any>;
  readonly externalSlots: Record<string, any>;

  // Optional dependencies (may be used for data from the parent scope of the own root scope)
  readonly outerData: Record<string, any>;
  readonly outerSlots: Record<string, any>;

  // Public interface
  readonly data: Record<string, any>;
  readonly slots: Record<string, any>;

  // Routing
  readonly urls: Record<string, true>;
}

export interface EmptyPluginState extends PluginState {
  readonly externalData: {};
  readonly externalSlots: {};
  readonly outerData: {};
  readonly outerSlots: {};
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
  readonly providers: readonly PluginProviderContainer<any, T>[];

  // Keep the state
  readonly externalData: T['externalData'];
  readonly externalSlots: T['externalSlots'];
  readonly data: T['data'];
  readonly slots: T['slots'];
  readonly urls: T['urls'];
}

export type GetData<T extends PluginState> = T['data'];
export type GetExternalData<T extends PluginState> = T['externalData'];
export type GetOuterData<T extends PluginState> = T['outerData'];
export type GetSlots<T extends PluginState> = T['slots'];
export type GetOuterSlots<T extends PluginState> = T['outerSlots'];

export type AppendRoute<T extends PluginState, U extends string> = T & {urls: Record<U, true>};
export type AppendData<T extends PluginState, U extends Record<string, any>> = T & {data: U};
export type AppendSlots<T extends PluginState, U extends Record<string, any>> = T & {slots: U};
export type AppendExternalData<T extends PluginState, U extends Record<string, any>> = T & {externalData: U};
export type AppendExternalSlots<T extends PluginState, U extends Record<string, any>> = T & {externalSlots: U};
export type AppendOuterData<T extends PluginState, U extends Record<string, any>> = T & {outerData: U};
export type AppendOuterSlots<T extends PluginState, U extends Record<string, any>> = T & {outerSlots: U};
export type JoinState<T extends PluginState, U extends PluginState> = AppendData<
  AppendSlots<T, GetSlots<U>>,
  GetData<U>
>;
export type JoinExternalState<T extends PluginState, U extends PluginState> = AppendExternalData<
  AppendExternalSlots<T, GetSlots<U>>,
  GetData<U>
>;
export type JoinOuterState<T extends PluginState, U extends PluginState> = AppendOuterData<
  AppendOuterSlots<T, GetSlots<U>>,
  GetData<U>
>;

export interface PluginScopeState {
  slots: Record<string, any>;
  inheritedSlots: Record<string, any>;
  outerSlots: Record<string, any>;
  data: Record<string, any>;
  inheritedData: Record<string, any>;
  inheritedReadonlyData: Record<string, any>;
}

export type PluginScopeStateFor<T extends PluginState> = {
  slots: T['slots'];
  inheritedSlots: T['externalSlots'];
  outerSlots: T['outerSlots'];
  data: {};
  inheritedData: T['data'];
  inheritedReadonlyData: T['externalData'] & Partial<T['outerData']>;
};

export interface PluginScopeConfig<T extends PluginScopeState> {
  slots: (keyof T['slots'])[];
  inheritedSlots: (keyof T['inheritedSlots'])[];
  outerSlots: (keyof T['outerSlots'])[];
  data: (keyof T['data'])[];
  inheritedData: (keyof T['inheritedData'])[];
  inheritedReadonlyData: (keyof T['inheritedReadonlyData'])[];
}

type PluginScopeSlotMap<T extends Record<string, any>, U = never> = {[K in keyof T]: PluginSlot<T[K]> | U};

export type PluginScopeSlotRecord<T extends PluginScopeState> = PluginScopeSlotMap<T['slots']> &
  PluginScopeSlotMap<T['inheritedSlots']> &
  PluginScopeSlotMap<T['outerSlots'], undefined>;

type PluginScopeDataMap<T extends Record<string, any>> = {[K in keyof T]: T[K]};

export type PluginScopeDataRecord<T extends PluginScopeState> = PluginScopeDataMap<T['data']> &
  PluginScopeDataMap<T['inheritedData']> &
  Readonly<PluginScopeDataMap<T['inheritedReadonlyData']>>;
