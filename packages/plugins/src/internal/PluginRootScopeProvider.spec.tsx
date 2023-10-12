import {useContext} from 'react';

import {renderHook} from '@testing-library/react';

import {PluginRootScope} from './PluginRootScope';
import {PluginRootContext, PluginRootScopeProvider} from './PluginRootScopeProvider';

describe('plugins', () => {
  describe('PluginRootScopeProvider', () => {
    it('should provide the root context down', () => {
      const root = new PluginRootScope([]);
      const {result} = renderHook(() => useContext(PluginRootContext), {
        wrapper: ({children}) => <PluginRootScopeProvider root={root}>{children}</PluginRootScopeProvider>,
      });
      expect(result.current.root).toBe(root);
    });
  });
});
