import {FC, PropsWithChildren, createContext, useContext, useMemo} from 'react';

import {StateCreator, StoreApi, UseBoundStore, create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

export const createStoreFactory =
  <T,>(name: string, createSlice: StateCreator<T>) =>
  () =>
    create<T>()(
      devtools((...a) => createSlice(...a), {
        name: `${name} - Zustand Store`,
        enabled: process.env.NODE_ENV === 'development',
      })
    );

export const connectStore = <T,>(createStore: () => UseBoundStore<StoreApi<T>>) => {
  type ShallowComponent = FC<PropsWithChildren<{}>>;
  type StoreSelector = <U>(selector: (state: T) => U) => U;
  const StoreContext = createContext<{use?: StoreSelector}>(undefined!);

  const useStore: StoreSelector = selector => {
    const context = useContext(StoreContext);
    if (!context?.use) {
      throw new Error('Store was not injected.');
    }
    return context.use(selector);
  };

  const useNewStore = (): [ShallowComponent, StoreSelector] => {
    // Ensure that this store is not created yet in this place
    const context = useContext(StoreContext);
    if (context?.use) {
      throw new Error('The store was already injected.');
    }

    // Build the store
    const store = useMemo(() => createStore(), []);
    const use: StoreSelector = selector => store(selector, shallow);
    const Provider: ShallowComponent = useMemo(
      () =>
        ({children}) =>
          <StoreContext.Provider value={{use}}>{children}</StoreContext.Provider>,
      []
    );

    return [Provider, store];
  };

  return {
    use: useStore,
    init: useNewStore,
  };
};
