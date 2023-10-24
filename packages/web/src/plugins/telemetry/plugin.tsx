import {useEffect} from 'react';
import {useAsync} from 'react-use';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

import {createPlugin, external} from '@testkube/plugins';

import type ClusterStatusPlugin from '@plugins/cluster-status/plugin';

import {useTelemetry, useTelemetryValue} from '@telemetry/hooks';

import anonymizeQueryString from '@utils/anonymizeQueryString';

const clusterStatusStub = external<typeof ClusterStatusPlugin>();

// TODO: Inject the provider?
export default createPlugin('oss/telemetry')
  .needs(clusterStatusStub.data('isTelemetryEnabled'))

  .data({useTelemetry})

  .init(tk => {
    // TODO: Move to provider?
    // Pause/resume telemetry based on the cluster settings
    tk.sync(() => {
      const telemetry = tk.data.useTelemetry();
      useEffect(() => {
        if (tk.data.isTelemetryEnabled) {
          telemetry.resume();
        } else {
          telemetry.pause();
        }
      }, [tk.data.isTelemetryEnabled]);
    });

    // TODO: Consider if it shouldn't be separate plugin
    tk.sync(() => {
      const telemetry = tk.data.useTelemetry();

      // TODO: Consider separate plugin and avoiding useAsync
      const {value: visitorId} = useAsync(async () => {
        const fp = await FingerprintJS.load();
        const value = await fp.get();
        return value.visitorId;
      });

      useTelemetryValue('userID', visitorId, true);
      useTelemetryValue('browserName', window.navigator.userAgent);

      const {pathname, search} = window.location;
      useEffect(() => {
        telemetry.pageView(`${pathname}${anonymizeQueryString(search)}`);
      }, [pathname, tk.data.isTelemetryEnabled]);
    });
  });
