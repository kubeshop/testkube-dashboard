import {useMemo} from 'react';

import {createPlugin, data, external} from '@testkube/plugins';

import type GeneralPlugin from '@plugins/general/plugin';

import {useGetClusterConfigQuery} from '@services/config';

import {safeRefetch} from '@utils/fetchUtils';

const generalStub = external<typeof GeneralPlugin>();

export default createPlugin('oss/cluster-status')
  .needs(generalStub.data('useApiEndpoint'))

  .define(data<boolean>()('isClusterAvailable', 'isSystemAvailable', 'isTelemetryEnabled'))

  .init(tk => {
    // TODO: Move to provider?
    tk.sync(() => {
      const apiEndpoint = tk.data.useApiEndpoint();
      const {currentData: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery(undefined, {
        skip: !apiEndpoint,
      });

      // TODO: IMPORTANT - TRIGGER UPDATE AFTER CHANGING PLUGIN DATA!
      tk.data.isTelemetryEnabled = Boolean(clusterConfig?.enableTelemetry);
      tk.data.isClusterAvailable = Boolean(clusterConfig);
      tk.data.isSystemAvailable = Boolean(clusterConfig);

      // FIXME: Hack - for some reason, useEffect was not called on API endpoint change.
      useMemo(() => {
        setTimeout(() => safeRefetch(refetchClusterConfig));
      }, [apiEndpoint]);
    });
  });
