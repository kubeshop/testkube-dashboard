import {useContext} from 'react';

import {renderHook} from '@testing-library/react';

import {PluginScope} from './PluginScope';
import {PluginScopeContext, PluginScopeProvider} from './PluginScopeProvider';

describe('plugins', () => {
  describe('PluginScopeProvider', () => {
    it('should provide the root context down', () => {
      const root = new PluginScope(null, {
        data: [],
        slots: [],
        inheritedData: [],
        inheritedSlots: [],
        optionalSlots: [],
        inheritedReadonlyData: [],
      });
      const {result} = renderHook(() => useContext(PluginScopeContext), {
        wrapper: ({children}) => <PluginScopeProvider root={root}>{children}</PluginScopeProvider>,
      });
      expect(result.current.root).toBe(root);
    });
  });
});
