import {PluginScope} from '../src/internal/PluginScope';
import {PluginSlot} from '../src/internal/PluginSlot';
import {PluginScopeState} from '../src/internal/types';

export interface EmptyPluginScopeState extends PluginScopeState {
  slots: {};
  inheritedSlots: {};
  optionalSlots: {};
  data: {};
  inheritedData: {};
  inheritedReadonlyData: {};
}

export interface MockPluginScopeConfig<T extends Record<string, any>, U extends Record<string, any[]>> {
  data?: T;
  slots?: U;
}

export interface MockPluginSlot<T> extends PluginSlot<T> {
  add: jest.MockedFunction<PluginSlot<T>['add']>;
  first: jest.MockedFunction<PluginSlot<T>['first']>;
  all: jest.MockedFunction<PluginSlot<T>['all']>;
  allRaw: jest.MockedFunction<PluginSlot<T>['allRaw']>;
}

export type MockPluginScopeSlotMap<T extends Record<string, any>, U = never> = {
  [K in keyof T]: MockPluginSlot<T[K]> | U;
};

export type MockPluginScopeSlotRecord<T extends PluginScopeState> = MockPluginScopeSlotMap<T['slots']> &
  MockPluginScopeSlotMap<T['inheritedSlots']> &
  MockPluginScopeSlotMap<T['optionalSlots'], undefined>;

export interface MockPluginScope<T extends PluginScopeState> extends PluginScope<T> {
  slots: MockPluginScopeSlotRecord<T>;
  render: jest.MockedFunction<PluginScope<T>['render']>;
  destroy: jest.MockedFunction<PluginScope<T>['destroy']>;
  children: jest.MockedFunction<PluginScope<T>['children']>;
  sync: jest.MockedFunction<PluginScope<T>['sync']>;
}

// TODO: Add spies for set/get
export const createPluginScopeMock = <T extends Record<string, any>, U extends Record<string, any[]>>({
  data = {} as any,
  slots = {} as any,
}: MockPluginScopeConfig<T, U> = {}): MockPluginScope<
  EmptyPluginScopeState & {
    data: T;
    slots: {[K in keyof U]: [U[K]] extends [never[]] ? any : U[K] extends Array<infer R> ? R : never};
  }
> => {
  const scope = new PluginScope(null, {
    data: Object.keys(data),
    slots: Object.keys(slots),
    inheritedData: [],
    inheritedSlots: [],
    inheritedReadonlyData: [],
    optionalSlots: [],
  });
  Object.entries(data).forEach(([key, value]) => {
    scope.data[key] = value;
  });
  Object.entries(slots).forEach(([key, items]) => {
    items.forEach(item => scope.slots[key].add(item));
    jest.spyOn(scope.slots[key], 'add');
    jest.spyOn(scope.slots[key], 'first');
    jest.spyOn(scope.slots[key], 'all');
    jest.spyOn(scope.slots[key], 'allRaw');
  });
  jest.spyOn(scope, 'render');
  jest.spyOn(scope, 'destroy');
  jest.spyOn(scope, 'children');
  jest.spyOn(scope, 'sync');
  return scope as any;
};
