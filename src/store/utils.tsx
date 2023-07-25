import {Context, FC, PropsWithChildren, createContext, useCallback, useContext, useMemo} from 'react';

import {capitalize} from 'lodash';
import {StateCreator, StoreApi, UseBoundStore, create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

import {Mark, OmitMark, UnmarkAllObject} from '@utils/typeMarkers';

type HasAnyKeys<T, K extends string | number | symbol, True, False> = keyof T extends Exclude<keyof T, K>
  ? False
  : True;

type Store<T> = UseBoundStore<StoreApi<T>>;
type BareStore<T> = <U>(selector: (state: T) => U, equals?: (a: U, b: U) => boolean) => U;

declare const internal: unique symbol;
type InternalMark = typeof internal;
export type Internal<T> = Mark<T, InternalMark>;

declare const nonPublic: unique symbol;
type NonPublicMark = typeof nonPublic;
export type NonPublic<T> = Mark<T, NonPublicMark>;

declare const nonPublicWrite: unique symbol;
type NonPublicWriteMark = typeof nonPublicWrite;
export type NonPublicWrite<T> = Mark<T, NonPublicWriteMark>;

type NonPublicState<T> = UnmarkAllObject<OmitMark<T, InternalMark>>;
type InitialState<T> = Partial<NonPublicState<T>>;
type PublicReadState<T> = UnmarkAllObject<OmitMark<T, InternalMark | NonPublicMark>>;
type PublicWriteState<T> = UnmarkAllObject<OmitMark<T, InternalMark | NonPublicMark | NonPublicWriteMark>>;

/**
 * In [magicSet] property, we will store a magic function,
 * to transparently update any property in store.
 */
const magicSet = Symbol('set data');

type MagicSetter<T> = <K extends keyof T>(key: K, value: T[K]) => void;
type MagicSetterSlice<T> = Record<typeof magicSet, MagicSetter<T>>;
type EnhancedState<T> = T & MagicSetterSlice<T>;
type BaseState<T> = Omit<T, typeof magicSet>;

type StoreFactory<T> = (initialState?: InitialState<T>) => Store<EnhancedState<T>>;
type StoreContext<T> = Context<{store: BareStore<T>}>;

type StoreSelector<T> = <U>(selector: (state: T) => U) => U;
type StoreSync<T> = (data: Partial<BaseState<T>>) => void;
type StoreSetFactory<T> = <K extends keyof T>(key: K) => (value: T[K]) => void;

declare const sliceMetadata: unique symbol;
type SliceMetadataSymbol = typeof sliceMetadata;
export type SliceFactory<T> = StateCreator<UnmarkAllObject<T>> & Record<SliceMetadataSymbol, T>;

export const createSliceFactory = <T,>(createSlice: StateCreator<UnmarkAllObject<T>>): StateCreator<T> => {
  return createSlice as StateCreator<T>;
};

export const createStoreFactory =
  <T,>(name: string, createSlice: StateCreator<T>): StoreFactory<T> =>
  (initialState?) =>
    create<EnhancedState<T>>()(
      devtools(
        (...a) => ({
          ...createSlice(...a),
          ...initialState,
          [magicSet]: (key, value) => {
            const [setData, , api] = a;
            const state = api.getState();
            const setter = `set${capitalize(key as string)}`;
            if (setter in state) {
              (state as any)[setter](value);
            } else {
              setData({[key]: value} as any);
            }
          },
        }),
        {
          name: `${name} - Zustand Store`,
          enabled: process.env.NODE_ENV === 'development',
        }
      )
    );

class StoreFactoryBuilder<T> {
  private name: string;
  private slice: StateCreator<T>;

  public constructor(name: string, slice: StateCreator<T>) {
    this.name = name;
    this.slice = slice;
  }

  public with<U>(
    next: HasAnyKeys<T, keyof U, never, StateCreator<U>>
  ): HasAnyKeys<T, keyof U, never, StoreFactoryBuilder<T & U>> {
    // @ts-ignore:
    return new StoreFactoryBuilder<T & U>(this.name, (...a) => ({...this.slice(...a), ...next(...a)}));
  }

  public end(): StoreFactory<T> {
    return createStoreFactory(this.name, this.slice);
  }
}

export const createStoreBuilder = (name: string) => new StoreFactoryBuilder(name, () => ({}));

const createStoreContext = <T,>() => createContext<{store: BareStore<T>}>(undefined!);

const internalSet = <T, K extends keyof T>(state: T, key: K, value: T[K]): void => {
  (state as EnhancedState<T>)[magicSet](key, value);
};

const createUseStoreHook =
  <T,>(StoreContext: StoreContext<T>): (() => BareStore<T> | undefined) =>
  () =>
    useContext(StoreContext)?.store;

const useStoreState = <T, U>(store: BareStore<T> | undefined, selector: (state: T) => U): U => {
  if (!store) {
    throw new Error('Store was not injected.');
  }
  return store(selector, shallow);
};

const createUseStoreStateHook = <T,>(StoreContext: StoreContext<T>): StoreSelector<T> => {
  const useStore = createUseStoreHook(StoreContext);
  return selector => useStoreState(useStore(), selector);
};

const useStoreSync = <T,>(store: BareStore<T> | undefined, data: Partial<BaseState<T>>) => {
  if (!store) {
    throw new Error('Store was not injected.');
  }
  store(state => {
    (Object.keys(data) as (keyof BaseState<T>)[]).forEach(key => {
      if (data[key] !== state[key]) {
        internalSet(state, key, data[key]);
      }
    });
  });
};

const useStoreSetter = <T, K extends keyof T>(store: BareStore<T> | undefined, key: K): ((value: T[K]) => void) => {
  if (!store) {
    throw new Error('Store was not injected.');
  }
  return useCallback(
    value => {
      store(state => internalSet(state, key, value));
    },
    [store, key]
  );
};

const createUseStoreSetterHook = <T,>(StoreContext: StoreContext<T>): StoreSetFactory<T> => {
  const useStore = createUseStoreHook(StoreContext);
  return key => useStoreSetter(useStore(), key);
};

const createUseStoreSyncHook = <T,>(StoreContext: StoreContext<T>): ((data: Partial<T>) => void) => {
  const useStore = createUseStoreHook(StoreContext);
  return (data: Partial<T>) => useStoreSync(useStore(), data);
};

export const connectStore = <T,>(createStore: StoreFactory<T>) => {
  type ShallowComponent = FC<PropsWithChildren<{}>>;
  type NonPublicSelector = StoreSelector<NonPublicState<T>>;
  type NonPublicSync = StoreSync<NonPublicState<T>>;
  type NonPublicSetFactory = StoreSetFactory<NonPublicState<T>>;

  const StoreContext = createStoreContext<PublicReadState<T>>();
  const useLocalStore = createUseStoreHook(StoreContext);
  const useLocalStoreState = createUseStoreStateHook(StoreContext);
  const useLocalStoreSync = createUseStoreSyncHook(StoreContext as StoreContext<PublicWriteState<T>>);
  const useLocalStoreSetter = createUseStoreSetterHook(StoreContext as StoreContext<PublicWriteState<T>>);

  const useNewStore = (
    initialState?: InitialState<T>
  ): [ShallowComponent, NonPublicSelector, NonPublicSync, NonPublicSetFactory] => {
    // Ensure that this store is not created yet in this place
    if (useLocalStore()) {
      throw new Error('The store was already injected.');
    }

    // Build the store
    const store = useMemo(() => createStore(initialState), []);
    const Provider: ShallowComponent = useMemo(
      () =>
        ({children}) =>
          <StoreContext.Provider value={{store}}>{children}</StoreContext.Provider>,
      []
    );

    return [
      Provider,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      selector => useStoreState(store, selector),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      data => useStoreSync(store as BareStore<NonPublicState<T>>, data),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      key => useStoreSetter(store as BareStore<NonPublicState<T>>, key),
    ];
  };

  return {
    use: useLocalStoreState,
    useSetter: useLocalStoreSetter,
    sync: useLocalStoreSync,
    init: useNewStore,
  };
};
