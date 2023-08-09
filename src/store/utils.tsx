import {Context, FC, PropsWithChildren, createContext, useCallback, useContext, useLayoutEffect, useMemo} from 'react';
import {useLatest} from 'react-use';

import {capitalize, pick} from 'lodash';
import {StateCreator, StoreApi, createStore as create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';
import {useStoreWithEqualityFn as useSelector} from 'zustand/traditional';

export enum ZustandSlices {
  Webhooks = 'webhooks',
}

type HasAnyKeys<T, K extends string | number | symbol, True, False> = keyof T extends Exclude<keyof T, K>
  ? False
  : True;

type Store<T> = StoreApi<T>;
type StoreFn<T> = () => Store<T>;

type StoreFactory<T> = (initialState?: Partial<T>) => Store<T>;
type StoreContext<T> = Context<{store: Store<T>}>;
type StoreContextProvider = FC<PropsWithChildren<{}>>;

type StoreGet<T> = <U>(selector: (state: T) => U) => U;
type StoreSync<T> = (data: Partial<T>) => boolean;
type StoreSetValue<T, K extends keyof T> = (value: T[K] | ((prev: T[K], state: T) => T[K])) => void;
type StoreSetFactory<T> = <K extends keyof T>(key: K) => StoreSetValue<T, K>;
type StoreField<T, K extends keyof T> = [T[K], StoreSetValue<T, K>];
type StoreFieldFactory<T> = <K extends keyof T>(key: K) => StoreField<T, K>;
type StorePick<T> = <K extends keyof T = never>(...keys: K[]) => Pick<T, K>;

const internalSet = <T, K extends keyof T>(api: StoreApi<T>, state: T, key: K, value: T[K]) => {
  const setter = `set${capitalize(key as string)}`;
  if (setter in (state as any)) {
    (state as any)[setter](value);
  } else {
    api.setState({[key]: value} as any);
  }
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
  private readonly name: string;
  private readonly slice: StateCreator<T>;

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

const createStoreContext = <T,>() => createContext<{store: Store<T>}>(undefined!);

const createUseStore =
  <T,>(StoreContext: StoreContext<T>): StoreFn<T> =>
  () => {
    const store = useContext(StoreContext)?.store;
    if (!store) {
      throw new Error('Store was not injected.');
    }
    return store;
  };

const createUseStoreGet =
  <T,>(useStore: StoreFn<T>): StoreGet<T> =>
  selector =>
    useSelector(useStore(), selector, shallow);

const createUseStorePick =
  <T,>(useStore: StoreFn<T>): StorePick<T> =>
  <K extends keyof T>(...keys: K[]) =>
    createUseStoreGet(useStore)(state => pick(state, keys) as Pick<T, K>);

const createUseStoreSync =
  <T,>(useStore: StoreFn<T>): StoreSync<T> =>
  data => {
    const store = useStore();
    let state = store.getState();
    useLayoutEffect(() => {
      state = store.getState();
      (Object.keys(data) as (keyof T)[]).forEach(key => {
        if (data[key] !== state[key]) {
          internalSet(store, state, key, data[key]);
        }
      });
    }, [store, data]);
    return (Object.keys(data) as (keyof T)[]).some(key => data[key] !== state[key]);
  };

const createUseStoreSetter =
  <T,>(useStore: StoreFn<T>): StoreSetFactory<T> =>
  key => {
    const store = useStore();
    return useCallback(
      value => {
        const state = store.getState();
        const nextValue = typeof value === 'function' ? (value as any)(state[key], state) : value;
        internalSet(store, state, key, nextValue);
      },
      [store, key]
    );
  };

const createUseStoreField =
  <T,>(useStore: StoreFn<T>): StoreFieldFactory<T> =>
  key =>
    [createUseStoreGet(useStore)(state => state[key]), createUseStoreSetter(useStore)(key)];

const createStoreHooks = <T,>(useStore: StoreFn<T>) => ({
  use: createUseStoreGet(useStore),
  useField: createUseStoreField(useStore),
  pick: createUseStorePick(useStore),
  sync: createUseStoreSync(useStore),
});

export const connectStore = <T,>(createStore: StoreFactory<T>) => {
  const StoreContext = createStoreContext<T>();

  const useInitializeStore = (initialState?: Partial<T>, deps: any[] = []) => {
    // Build the store
    const store = useMemo(() => createStore(initialState), deps);
    const storeRef = useLatest(store);

    const Provider: StoreContextProvider = useMemo(
      () =>
        ({children}) => {
          // Ensure that this store is not created yet in this place
          // eslint-disable-next-line react-hooks/rules-of-hooks
          if ((useContext(StoreContext) as any)?.store) {
            throw new Error('The store was already injected.');
          }
          return <StoreContext.Provider value={{store: storeRef.current}}>{children}</StoreContext.Provider>;
        },
      []
    );

    return [Provider, useMemo(() => createStoreHooks(() => store), [store])] as const;
  };

  return {
    ...createStoreHooks(createUseStore(StoreContext)),
    init: useInitializeStore,
  };
};
