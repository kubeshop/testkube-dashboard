import {useEffect} from 'react';

import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as SourcesIcon} from '@assets/sources.svg';

import SourceDetails from '@pages/Sources/SourceDetails';
import SourcesList from '@pages/Sources/SourcesList/SourcesList';

import type ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import type GeneralPlugin from '@plugins/general/plugin';

import {useGetSourcesQuery} from '@services/sources';

import {initializeSourcesStore, useSources, useSourcesField, useSourcesPick, useSourcesSync} from '@store/sources';

import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

const generalStub = external<typeof GeneralPlugin>();
const clusterStatusStub = external<typeof ClusterStatusPlugin>();

export default createPlugin('oss/test-sources')
  .needs(clusterStatusStub.data('useSystemAccess', 'SystemAccess'))
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))

  .route('/sources', <SourcesList />)
  .route('/sources/:id', <SourceDetails />)
  .route('/sources/:id/settings/:settingsTab', <SourceDetails />)

  .provider(tk => <StoreProvider store={initializeSourcesStore} dependencies={[tk.data.useApiEndpoint()]} />)
  .data({useSources, useSourcesPick, useSourcesField, useSourcesSync})

  .init(tk => {
    tk.slots.siderItems.add({path: '/sources', icon: SourcesIcon, title: 'Sources'}, {order: -20});

    // TODO: Move as provider?
    tk.sync(() => {
      const {useApiEndpoint, useSystemAccess, SystemAccess} = tk.data;
      const {data: sources, refetch} = useGetSourcesQuery(null, {
        pollingInterval: PollingIntervals.long,
        skip: !useSystemAccess(SystemAccess.agent),
      });
      useSourcesSync({sources});
      useEffect(() => {
        safeRefetch(refetch);
      }, [useApiEndpoint()]);
    });
  });
