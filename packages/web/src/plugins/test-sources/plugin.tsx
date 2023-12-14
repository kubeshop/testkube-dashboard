import {useEffect} from 'react';

import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as SourcesIcon} from '@assets/sources.svg';

import SourceDetails from '@pages/Sources/SourceDetails';
import SourcesList from '@pages/Sources/SourcesList/SourcesList';

import type ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import type GeneralPlugin from '@plugins/general/plugin';
import type RtkPlugin from '@plugins/rtk/plugin';

import {repositoryApi} from '@services/repository';
import {secretsApi} from '@services/secrets';
import {sourcesApi, useGetSourcesQuery} from '@services/sources';

import {initializeSourcesStore, useSources, useSourcesField, useSourcesPick, useSourcesSync} from '@store/sources';

import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

const generalStub = external<typeof GeneralPlugin>();
const clusterStatusStub = external<typeof ClusterStatusPlugin>();
const rtkStub = external<typeof RtkPlugin>();

export default createPlugin('oss/test-sources')
  .needs(clusterStatusStub.data('useSystemAccess', 'SystemAccess'))
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))
  .needs(rtkStub.slots('rtkServices'))

  .route('/sources', <SourcesList />)
  .route('/sources/:id', <SourceDetails />)
  .route('/sources/:id/settings/:settingsTab', <SourceDetails />)

  .provider(({useData}) => (
    <StoreProvider store={initializeSourcesStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useSources, useSourcesPick, useSourcesField, useSourcesSync})

  .provider(({useData}) => {
    const {useApiEndpoint, useSystemAccess, SystemAccess} = useData.pick(
      'useApiEndpoint',
      'useSystemAccess',
      'SystemAccess'
    );
    const {data: sources, refetch} = useGetSourcesQuery(null, {
      pollingInterval: PollingIntervals.long,
      skip: !useSystemAccess(SystemAccess.agent),
    });
    useSourcesSync({sources});
    useEffect(() => {
      safeRefetch(refetch);
    }, [useApiEndpoint()]);
  })

  .init(tk => {
    tk.slots.rtkServices.add(sourcesApi);
    tk.slots.rtkServices.add(secretsApi);
    tk.slots.rtkServices.add(repositoryApi);

    tk.slots.siderItems.add({path: '/sources', icon: SourcesIcon, title: 'Sources'}, {order: -20});
  });
