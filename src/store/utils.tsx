import {Context, FC, PropsWithChildren, createContext, useContext, useMemo} from 'react';

import {StateCreator, StoreApi, UseBoundStore, create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

import {ExcludeMark, Mark, UnmarkAllObject} from '@utils/typeMarkers';

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

type NonPublicState<T> = UnmarkAllObject<ExcludeMark<T, InternalMark>>;
type InitialState<T> = Partial<NonPublicState<T>>;
type PublicState<T> = UnmarkAllObject<ExcludeMark<T, InternalMark | NonPublicMark>>;

type StoreFactory<T> = (initialState?: InitialState<T>) => Store<T>;

type StoreSelector<T> = <U>(selector: (state: T) => U) => U;

declare const sliceMetadata: unique symbol;
type SliceMetadataSymbol = typeof sliceMetadata;
export type SliceFactory<T> = StateCreator<UnmarkAllObject<T>> & Record<SliceMetadataSymbol, T>;

export const createSliceFactory = <T,>(createSlice: StateCreator<UnmarkAllObject<T>>): StateCreator<T> => {
  return createSlice as StateCreator<T>;
};

export const createStoreFactory =
  <T,>(name: string, createSlice: StateCreator<T>): StoreFactory<T> =>
  (initialState?) =>
    create<T>()(
      devtools(
        (...a) => ({
          ...createSlice(...a),
          ...initialState,
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

const createUseStoreHook =
  <T,>(StoreContext: Context<{store: BareStore<T>}>): (() => BareStore<T> | undefined) =>
  () =>
    useContext(StoreContext)?.store;

const useStoreShallow = <T, U>(store: BareStore<T> | undefined, selector: (state: T) => U): U => {
  if (!store) {
    throw new Error('Store was not injected.');
  }
  return store(selector, shallow);
};

const createUseStoreShallowHook = <T,>(StoreContext: Context<{store: BareStore<T>}>): StoreSelector<T> => {
  const useStore = createUseStoreHook(StoreContext);
  return selector => useStoreShallow(useStore(), selector);
};

export const connectStore = <T,>(createStore: StoreFactory<T>) => {
  type ShallowComponent = FC<PropsWithChildren<{}>>;
  type NonPublicSelector = StoreSelector<NonPublicState<T>>;

  const StoreContext = createStoreContext<PublicState<T>>();
  const useStore = createUseStoreHook(StoreContext);
  const useStoreSelector = createUseStoreShallowHook(StoreContext);

  const useNewStore = (initialState?: InitialState<T>): [ShallowComponent, NonPublicSelector] => {
    // Ensure that this store is not created yet in this place
    if (useStore()) {
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return [Provider, selector => useStoreShallow(store, selector)];
  };

  return {
    use: useStoreSelector,
    init: useNewStore,
  };
};
