import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import type GeneralPlugin from '@plugins/general/plugin';

import {
  initializeClusterDetailsStore,
  useClusterDetails,
  useClusterDetailsField,
  useClusterDetailsPick,
  useClusterDetailsSync,
} from '@store/clusterDetails';

const generalStub = external<typeof GeneralPlugin>();

// TODO: Add provider for loading the Cluster Details automatically
export default createPlugin('oss/cluster')
  .needs(generalStub.data('useApiEndpoint'))

  .provider(tk => <StoreProvider store={initializeClusterDetailsStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useClusterDetails, useClusterDetailsPick, useClusterDetailsField, useClusterDetailsSync})

  .init();
