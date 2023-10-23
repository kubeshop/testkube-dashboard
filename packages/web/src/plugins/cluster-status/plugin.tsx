import {useMemo} from 'react';

import {createPlugin, data, external} from '@testkube/plugins';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import type GeneralPlugin from '@plugins/general/plugin';
import type RtkPlugin from '@plugins/rtk/plugin';

import {configApi, useGetClusterConfigQuery} from '@services/config';

import {safeRefetch} from '@utils/fetchUtils';

const generalStub = external<typeof GeneralPlugin>();
const rtkStub = external<typeof RtkPlugin>();

export default createPlugin('oss/cluster-status')
  .needs(generalStub.data('useApiEndpoint'))
  .needs(rtkStub.slots('rtkServices'))

  .define(data<boolean>()('isClusterAvailable', 'isSystemAvailable', 'isTelemetryEnabled'))

  .data({useSystemAccess, SystemAccess})

  .init(tk => {
    tk.slots.rtkServices.add(configApi);

    // TODO: Move to provider?
    tk.sync(() => {
      const apiEndpoint = tk.data.useApiEndpoint();
      const {currentData: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery(undefined, {
        skip: !apiEndpoint,
      });

      tk.data.isTelemetryEnabled = Boolean(clusterConfig?.enableTelemetry);
      tk.data.isClusterAvailable = Boolean(clusterConfig);
      tk.data.isSystemAvailable = Boolean(clusterConfig);

      // FIXME: Hack - for some reason, useEffect was not called on API endpoint change.
      useMemo(() => {
        setTimeout(() => safeRefetch(refetchClusterConfig));
      }, [apiEndpoint]);
    });
  });
