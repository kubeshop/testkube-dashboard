import {useContext, useEffect, useMemo, useRef, useState} from 'react';

import type {GetPluginState, Plugin} from './internal/Plugin';
import {PluginScope} from './internal/PluginScope';
import {PluginScopeContext} from './internal/PluginScopeProvider';
import {PluginScopeSubscribeChange} from './internal/symbols';
import type {GetSlots, PluginScopeDataRecord, PluginScopeStateFor, PluginSlotContainer} from './internal/types';
import {pick, shallowEqual} from './internal/utils';

type ScopeStateFor<T extends Plugin<any>> = PluginScopeStateFor<GetPluginState<T>>;
type ScopeFor<T extends Plugin<any>> = PluginScope<ScopeStateFor<T>>;

export const usePluginScope = <T extends Plugin<any>>(): ScopeFor<T> => useContext(PluginScopeContext).root as any;

export const createUseSubscription =
  <T extends Plugin<any>>() =>
  (listener: (tk: ScopeFor<T>) => void = () => {}): void => {
    const scope = usePluginScope<T>();
    const listenerRef = useRef(listener);
    listenerRef.current = listener;
    useEffect(() => scope[PluginScopeSubscribeChange](() => listenerRef.current(scope)), [scope]);
  };

export const createUseData = <T extends Plugin<any>>() => {
  const useSubscription = createUseSubscription();
  const useData = (): PluginScopeDataRecord<ScopeStateFor<T>> => {
    const [incr, setIncr] = useState(0);
    const scope = usePluginScope<T>();
    useSubscription(() => setIncr((incr + 1) % 10000));
    return scope.data;
  };

  const useDataSelector = <U>(
    select: (data: PluginScopeDataRecord<ScopeStateFor<T>>) => U = x => x,
    equalityFn: (prev: U, next: U) => boolean = (prev, next) => prev === next
  ): U => {
    const scope = usePluginScope<T>();
    const prevScope = useRef<ScopeFor<T>>();
    const [incr, setIncr] = useState(0);
    const value = useRef<U>();

    const updateRef = useRef<() => void>();
    updateRef.current = () => {
      const nextValue = select(scope.data);
      if (prevScope.current !== scope || !equalityFn(value.current!, nextValue)) {
        prevScope.current = scope;
        value.current = nextValue;
      }
    };

    if (prevScope.current !== scope) {
      updateRef.current();
    }

    useSubscription(() => {
      const prev = value.current;
      updateRef.current!();
      if (prev !== value.current) {
        setIncr((incr + 1) % 10000);
      }
    });

    return value.current!;
  };

  const useDataShallow = <U>(select: (data: PluginScopeDataRecord<ScopeStateFor<T>>) => U = x => x): U =>
    useDataSelector(select, shallowEqual);

  const useDataPick = <K extends keyof PluginScopeDataRecord<ScopeStateFor<T>>>(
    ...keys: K[]
  ): Pick<PluginScopeDataRecord<ScopeStateFor<T>>, K> => useDataShallow(x => pick(x, keys) as any);

  return Object.assign(useData, {
    select: useDataSelector,
    shallow: useDataShallow,
    pick: useDataPick,
  });
};

export const createUseSlot = <T extends Plugin<any>>() => {
  const useSubscription = createUseSubscription();
  return <K extends keyof GetSlots<GetPluginState<T>>>(
    key: K,
    defaults: PluginSlotContainer<GetSlots<GetPluginState<T>>[K]>[] = []
  ): GetSlots<GetPluginState<T>>[K][] => {
    const [incr, setIncr] = useState(0);
    const scope = usePluginScope<T>();
    const resultsRef = useRef<PluginSlotContainer<T>[]>();
    const updateResults = () => {
      // @ts-ignore: FIXME something is wrong with types
      const results = scope.slots[key]?.allRaw(defaults);
      if (results?.length !== resultsRef.current?.length || resultsRef.current?.some((x, i) => results![i] !== x)) {
        resultsRef.current = results;
      }
    };
    updateResults();
    useSubscription(() => {
      const prevResults = resultsRef.current;
      updateResults();
      if (prevResults !== resultsRef.current) {
        setIncr((incr + 1) % 10000);
      }
    });

    return useMemo(() => resultsRef.current?.map(x => x.value) || [], [resultsRef.current]);
  };
};

export const createUseSlotFirst = <T extends Plugin<any>>() => {
  const useSubscription = createUseSubscription();
  return <K extends keyof GetSlots<GetPluginState<T>>>(
    key: K,
    defaults: PluginSlotContainer<GetSlots<GetPluginState<T>>[K]>[] = []
  ): GetSlots<GetPluginState<T>>[K] | undefined => {
    const [incr, setIncr] = useState(0);
    const prevRef = useRef<GetSlots<GetPluginState<T>>[K] | undefined>();
    const scope = usePluginScope<T>();
    // @ts-ignore: FIXME something is wrong with types
    prevRef.current = scope.slots[key]?.first(defaults);
    useSubscription(() => {
      // @ts-ignore: FIXME something is wrong with types
      const nextValue = scope.slots[key]?.first(defaults);
      if (nextValue !== prevRef.current) {
        prevRef.current = nextValue;
        setIncr((incr + 1) % 10000);
      }
    });
    return prevRef.current;
  };
};
// TODO: createUseRoute
