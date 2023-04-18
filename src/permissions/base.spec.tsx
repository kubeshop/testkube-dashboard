import {render} from '@testing-library/react';

import {BasePermissionsResolver, Permissions, PermissionsProvider, PermissionsResolver, usePermission} from './base';

// The original renderHook method from '@testing-library/react' doesn't allow passing props to wrapper,
// while it's needed for testing this feature completely.
type TestProps<T> = {permission: Permissions, scope?: T, local?: T, resolver: PermissionsResolver<any>};
const renderUsePermissionHook = (props: TestProps<any>) => {
  const result: {current: boolean} = {current: undefined};
  const update = (value) => {
    result.current = value;
  };

  const TestInner = ({permission, local}: TestProps<any>) => {
    update(usePermission(permission, local));
    return null;
  };

  const Test = ({scope, resolver, ...rest}: TestProps<any>) => (
    <PermissionsProvider scope={scope} resolver={resolver}>
      <TestInner scope={scope} resolver={resolver} {...rest} />
    </PermissionsProvider>
  );

  const x = render(<Test {...props} />);

  return {
    result,
    rerender: (nextProps: TestProps<any>) => x.rerender(<Test {...nextProps} />),
  };
};

describe('permissions', () => {
  describe('BasePermissionsResolver', () => {
    it('should always return true', () => {
      const resolver = new BasePermissionsResolver();
      expect(resolver.has(Permissions.runEntity)).toBe(true);
      expect(resolver.has('unknown_value' as any)).toBe(true);
    });
  });

  describe('usePermission', () => {
    const permission = Permissions.createEntity;

    it('should pass down the truthy result from the resolver', () => {
      const resolver = {has: () => true};
      const {result} = renderUsePermissionHook({resolver, permission});
      expect(result.current).toBe(true);
    });

    it('should pass down the falsy result from the resolver', () => {
      const resolver = {has: () => false};
      const initialProps = {resolver, scope: {}};
      const {result} = renderUsePermissionHook({resolver, permission});
      expect(result.current).toBe(false);
    });

    it('should correctly merge the scopes', () => {
      const resolver = {has: jest.fn()};
      const scope = {test1: 'test1', test2: 'test2', test3: {nested1: 'nested1'}};
      const localScope = {test2: undefined, test3: {nested2: 'nested2'}, test4: 'test4'};
      const {result} = renderUsePermissionHook({resolver, permission, local: localScope, scope});

      expect(resolver.has).toBeCalledTimes(1);
      expect(resolver.has).toBeCalledWith(Permissions.createEntity, {...scope, ...localScope});
    });

    it('should react to local scope update', () => {
      type Scope = {id?: string};
      const resolver = {has: (_, {id}: Scope) => (id === 'test-id')};
      const scope: Scope = {};
      const localScope = {id: 'test-id'};
      const initialProps = {resolver, permission, local: localScope, scope};
      const {result, rerender} = renderUsePermissionHook(initialProps);

      rerender({...initialProps, local: {id: 'test-id-unknown'}});
      expect(result.current).toBe(false);
    });

    it('should react to local scope creation', () => {
      type Scope = {id?: string};
      const resolver = {has: (_, {id}: Scope) => (id === 'test-id')};
      const scope: Scope = {};
      const localScope = {id: 'test-id'};
      const initialProps = {resolver, permission, local: localScope, scope};
      const {result, rerender} = renderUsePermissionHook(initialProps);

      rerender({...initialProps, local: {id: 'test-id'}});
      expect(result.current).toBe(true);
    });

    it('should react to local scope deletion', () => {
      type Scope = {id?: string};
      const resolver = {has: (_, {id}: Scope) => (id === 'test-id')};
      const scope: Scope = {};
      const localScope = {id: 'test-id'};
      const initialProps = {resolver, permission, local: localScope, scope};
      const {result, rerender} = renderUsePermissionHook(initialProps);
      rerender({...initialProps, local: undefined});
      expect(result.current).toBe(false);
    });

    it('should react to global scope update', () => {
      type Scope = {id?: string};
      const resolver = {has: (_, {id}: Scope) => (id === 'test-id')};
      const scope: Scope = {id: 'test-id'};
      const initialProps = {resolver, permission, scope};
      const {result, rerender} = renderUsePermissionHook(initialProps);
      rerender({...initialProps, scope: {id: 'test-id-unknown'}});
      expect(result.current).toBe(false);
    });
  });
});
