import {useMemo} from 'react';

import {createPlugin, data, external} from '@testkube/plugins';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import type GeneralPlugin from '@plugins/general/plugin';
import type RtkPlugin from '@plugins/rtk/plugin';
import {RtkService} from '@plugins/rtk/plugin';

import {configApi, useGetClusterConfigQuery} from '@services/config';

import {safeRefetch} from '@utils/fetchUtils';

const generalStub = external<typeof GeneralPlugin>();
const rtkStub = external<typeof RtkPlugin>();

export default createPlugin('dashboard/cluster-status')
  .needs(generalStub.data('useApiEndpoint'))
  .needs(rtkStub.slots('rtkServices'))

  .define(data<boolean>()('isClusterAvailable', 'isSystemAvailable', 'isTelemetryEnabled'))

  .data({useSystemAccess, SystemAccess})

  .provider(({useData, scope}) => {
    const apiEndpoint = useData.select(x => x.useApiEndpoint)();
    const {currentData: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery(undefined, {
      skip: !apiEndpoint,
    });

    scope.data.isTelemetryEnabled = Boolean(clusterConfig?.enableTelemetry);
    scope.data.isClusterAvailable = Boolean(clusterConfig);
    scope.data.isSystemAvailable = Boolean(clusterConfig);

    // FIXME: Hack - for some reason, useEffect was not called on API endpoint change.
    useMemo(() => {
      setTimeout(() => safeRefetch(refetchClusterConfig));
    }, [apiEndpoint]);
  })

  .init(tk => {
    tk.slots.rtkServices.add(configApi, {}, (object: RtkService) => object.reducerPath === 'configApi');
  });
