import React, {createContext, PropsWithChildren, ReactElement, useContext, useEffect, useMemo, useRef} from 'react';

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
  scope: T extends PermissionsResolver<any, infer S> ? S : never;
  resolver: T;
}

export interface PermissionsContextData<T extends PermissionsResolver<any, any>> {
  scope: T extends PermissionsResolver<any, infer S> ? S : never;
  resolver: T;
}

export function PermissionsProvider<T extends PermissionsResolver<any, any>>(props: PropsWithChildren<PermissionsProviderProps<T>>): ReactElement | null {
  const {scope, resolver, children} = props;
  const value = useMemo<PermissionsContextData<T>>(() => ({scope, resolver}), [scope, resolver]);

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function createUsePermissionHook<T extends PermissionsResolver<any, any>>(): PermissionsResolverFn<T> {
  // @ts-ignore: FIXME later
  return (permission, scope?): boolean => {
    const {scope: baseScope, resolver} = useContext<PermissionsContextData<T>>(PermissionsContext);

    // It's much more convenient to avoid caching the scope object in each component for comparison.
    // To simplify that, the scope will be cached based on identity of the properties.
    const localScope = useRef<typeof scope>(undefined);
    useEffect(() => {
      const prevScope = localScope.current;

      // Speed up in case of empty local scope
      if (scope === undefined || prevScope === undefined) {
        localScope.current = scope;
        return;
      }

      // for..in is faster than comparing Object.keys, even cached.
      // for a single property, check takes ~0.2μs, so it should be efficient enough.
      // eslint-disable-next-line no-restricted-syntax
      for (let k in prevScope) {
        if (prevScope[k] !== scope[k]) {
          localScope.current = scope;
          return;
        }
      }
      // eslint-disable-next-line no-restricted-syntax
      for (let k in scope) {
        if (prevScope[k] !== scope[k]) {
          localScope.current = scope;
          return;
        }
      }
    }, [scope]);

    return useMemo(
      () => resolver.has(permission, {...baseScope, ...localScope.current}),
      [permission, localScope.current, baseScope, resolver],
    );
  };
}

export const usePermission = createUsePermissionHook<BasePermissionsResolver>();
