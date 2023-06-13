import {FC, PropsWithChildren, createContext, useContext, useMemo} from 'react';

import {StateCreator, StoreApi, UseBoundStore, create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

import {HasMark, Mark, UnmarkAll, UnmarkAllObject, UnmarkObject} from '@utils/typeMarkers';

type Fn = (...args: any) => any;

// Customizable<Function> allows to store a function that could be replaced
declare const customizableSymbol: unique symbol;
export type Customizable<T> = Mark<T, typeof customizableSymbol>;
type IsCustomizable<T> = T extends HasMark<T, typeof customizableSymbol> ? T : UnmarkAll<T> extends Fn ? never : T;
type CustomizableObject<T> = UnmarkObject<
  Pick<T, {[K in keyof T]: T[K] extends IsCustomizable<T[K]> ? K : never}[keyof T]>,
  typeof customizableSymbol
>;
export const makeCustomizable = <T,>(value: T) => value as Customizable<T>;

// Private<T> makes the value not available for children
declare const privateSymbol: unique symbol;
export type Private<T> = Mark<T, typeof privateSymbol>;
type IsPrivate<T> = HasMark<T, typeof privateSymbol>;
type PublicObject<T> = Pick<T, {[K in keyof T]: T[K] extends IsPrivate<T[K]> ? never : K}[keyof T]>;

export const makePrivate = <T,>(value: T) => value as Private<T>;

type HasAnyKeys<T, K extends string | number | symbol, True, False> = keyof T extends Exclude<keyof T, K>
  ? False
  : True;

type InitialState<T> = Partial<UnmarkAllObject<CustomizableObject<T>>>;
type PublicState<T> = UnmarkAllObject<PublicObject<T>>;
type StoreFactory<T> = (initialState?: InitialState<T>) => UseBoundStore<StoreApi<T>>;

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

export const connectStore = <T,>(createStore: StoreFactory<T>) => {
  type ShallowComponent = FC<PropsWithChildren<{}>>;
  type StoreSelector = <U>(selector: (state: UnmarkAllObject<T>) => U) => U;
  type PublicStoreSelector = <U>(selector: (state: PublicState<T>) => U) => U;
  const StoreContext = createContext<{use?: StoreSelector}>(undefined!);

  const useStore: PublicStoreSelector = selector => {
    const context = useContext(StoreContext);
    if (!context?.use) {
      throw new Error('Store was not injected.');
    }
    return context.use(selector);
  };

  const useNewStore = (initialState?: InitialState<T>, deps: any[] = []): [ShallowComponent, StoreSelector] => {
    // Ensure that this store is not created yet in this place
    const context = useContext(StoreContext);
    if (context?.use) {
      throw new Error('The store was already injected.');
    }

    // Build the store
    const store = useMemo(() => createStore(initialState), deps);
    const use: StoreSelector = selector => store(selector as any, shallow);
    const Provider: ShallowComponent = useMemo(
      () =>
        ({children}) =>
          <StoreContext.Provider value={{use}}>{children}</StoreContext.Provider>,
      deps
    );

    return [Provider, use];
  };

  return {
    use: useStore,
    init: useNewStore,
  };
};
