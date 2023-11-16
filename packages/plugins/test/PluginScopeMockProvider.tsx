import {FC, PropsWithChildren} from 'react';

import {PluginScopeProvider} from '../src/internal/PluginScopeProvider';

import {createPluginScopeMock} from './createPluginScopeMock';

export interface MockPluginScopeProviderProps {
  data?: Record<string, any>;
  slots?: Record<string, any[]>;
}

export const PluginScopeMockProvider: FC<PropsWithChildren<MockPluginScopeProviderProps>> = ({
  data,
  slots,
  children,
}) => {
  const scope = createPluginScopeMock({data, slots});
  return <PluginScopeProvider root={scope}>{children}</PluginScopeProvider>;
};
