import {FC, ReactNode} from 'react';

import {usePluginScope} from '../hooks';

import {PluginProviderContainer} from './types';

export interface ConditionalProviderProps {
  provider: PluginProviderContainer<any, any>;
  children?: ReactNode | undefined;
}

export const ConditionalProvider: FC<ConditionalProviderProps> = ({provider: {provider, metadata}, children}) => {
  const scope = usePluginScope();
  const enabled = metadata?.enabled?.(scope);
  const Provider = provider.type;
  return enabled ? <Provider {...provider.props}>{children}</Provider> : <>{children}</>;
};
