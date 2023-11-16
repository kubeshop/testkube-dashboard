import React, {PropsWithChildren, ReactElement, createContext, useContext, useMemo, useRef} from 'react';

import {usePermissionsPlugin} from '../plugins/permissions/hooks';

// Interface

export enum Permissions {
  // Tests, Test suites, Executors, Sources
  createEntity = 'create-entity',
  deleteEntity = 'delete-entity',
  editEntity = 'edit-entity',
  runEntity = 'run-entity',
  manageEntityExecution = 'manage-entity-execution',
}

export interface PermissionsResolver<R, S extends Record<string, any> = {}> {
  has(permission: Permissions | R, scope?: S): boolean;
}

type PermissionsResolverFn<T> = T extends PermissionsResolver<infer R, infer S>
  ? (permission: Permissions | R, scope?: Partial<S>) => boolean
  : never;

// Base implementation

export class BasePermissionsResolver implements PermissionsResolver<Permissions> {
  // eslint-disable-next-line class-methods-use-this
  public has(permission: Permissions): boolean {
    return true;
  }
}

// React implementation

export const PermissionsContext = createContext<any>({});

interface PermissionsProviderProps<T extends PermissionsResolver<any, any>> {
  resolver: T;
}

export interface PermissionsContextData<T extends PermissionsResolver<any, any>> {
  resolver: T;
}

export function PermissionsProvider<T extends PermissionsResolver<any, any>>(
  props: PropsWithChildren<PermissionsProviderProps<T>>
): ReactElement | null {
  const {resolver, children} = props;
  const value = useMemo<PermissionsContextData<T>>(() => ({resolver}), [resolver]);

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
}

export function createUsePermissionHook<T extends PermissionsResolver<any, any>>(): PermissionsResolverFn<T> {
  // @ts-ignore: FIXME later
  return (permission, scope?): boolean => {
    const {resolver} = useContext<PermissionsContextData<T>>(PermissionsContext);
    const baseScope = usePermissionsPlugin.select(x => x.permissionsScope);

    // It's much more convenient to avoid caching the scope object in each component for comparison.
    // To simplify that, the scope will be cached based on identity of the properties.
    const localScopeRef = useRef<typeof scope>(undefined);
    // Avoid unnecessary re-render - use useMemo instead of useEffect
    const localScope = useMemo(() => {
      const prevScope = localScopeRef.current;

      // Speed up in case of empty local scope
      if (scope === undefined || prevScope === undefined) {
        localScopeRef.current = scope;
        return scope;
      }

      // for..in is faster than comparing Object.keys, even cached.
      // for a single property, check takes ~0.2μs, so it should be efficient enough.
      // eslint-disable-next-line no-restricted-syntax
      for (let k in prevScope) {
        if (prevScope[k] !== scope[k]) {
          localScopeRef.current = scope;
          return scope;
        }
      }
      // eslint-disable-next-line no-restricted-syntax
      for (let k in scope) {
        if (prevScope[k] !== scope[k]) {
          localScopeRef.current = scope;
          return scope;
        }
      }

      return localScopeRef.current;
    }, [scope]);

    return useMemo(
      () => resolver.has(permission, {...baseScope, ...localScope}),
      [permission, localScope, baseScope, resolver]
    );
  };
}

export const usePermission = createUsePermissionHook<BasePermissionsResolver>();
