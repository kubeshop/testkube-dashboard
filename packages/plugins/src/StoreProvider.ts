import {FC, PropsWithChildren, ReactElement, createElement} from 'react';

interface StoreProviderProps<T> {
  store: (initialState?: Partial<T>, deps?: any[]) => readonly [FC<PropsWithChildren<{}>>, any];
  initialState?: (() => Partial<T>) | Partial<T>;
  dependencies?: (() => any[]) | any[];
}

export const StoreProvider = <T>({
  store,
  initialState,
  dependencies,
  children,
}: PropsWithChildren<StoreProviderProps<T>>): ReactElement => {
  const state = typeof initialState === 'function' ? initialState() : initialState;
  const deps = typeof dependencies === 'function' ? dependencies() : dependencies;
  const [Provider] = store(state, deps);
  return createElement(Provider, null, children);
};
