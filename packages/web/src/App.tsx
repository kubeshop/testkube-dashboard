import React, {Suspense, useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {useUpdate} from 'react-use';

import {PluginRoute} from '@testkube/plugins/src/internal/types';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {useModal} from '@modal/hooks';

import {EndpointModal, notificationCall} from '@molecules';

import {Loading, NotFound} from '@pages';

import {useGeneralSlot} from '@plugins/general/hooks';

import {getApiDetails, getApiEndpoint, isApiEndpointLocked, useApiEndpoint} from '@services/apiEndpoint';
import {useGetExecutorsQuery} from '@services/executors';
import {useGetSourcesQuery} from '@services/sources';

import {BannerList} from '@src/App.styled';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useExecutorsSync} from '@store/executors';
import {useSourcesSync} from '@store/sources';

import {composeProviders} from '@utils/composeProviders';
import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

interface AppProps {
  routes: PluginRoute[];
}

const App: React.FC<AppProps> = ({routes}) => {
  const location = useLocation();
  const apiEndpoint = useApiEndpoint();
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  const {data: executors, refetch: refetchExecutors} = useGetExecutorsQuery(null, {
    pollingInterval: PollingIntervals.long,
    skip: !isClusterAvailable,
  });
  useExecutorsSync({executors});

  const {data: sources, refetch: refetchSources} = useGetSourcesQuery(null, {
    pollingInterval: PollingIntervals.long,
    skip: !isClusterAvailable,
  });
  useSourcesSync({sources});

  const {setClusterDetails} = useClusterDetailsPick('setClusterDetails');

  const update = useUpdate();

  const {open: openEndpointModal} = useModal({
    title: 'Testkube API endpoint',
    width: 693,
    content: <EndpointModal />,
    dataTestCloseBtn: 'endpoint-modal-close-button',
    dataTestModalRoot: 'endpoint-modal',
  });

  useEffect(() => {
    safeRefetch(refetchExecutors);
    safeRefetch(refetchSources);
  }, [apiEndpoint]);

  useEffect(() => {
    // Do not fire the effect if new endpoint is just being set up.
    if (location.pathname === '/apiEndpoint') {
      return;
    }

    if (!apiEndpoint && !isApiEndpointLocked()) {
      openEndpointModal();
      return;
    }

    // Avoid loading API details when we know the cluster is not available.
    if (!isClusterAvailable) {
      return;
    }

    getApiDetails(apiEndpoint!)
      .then(setClusterDetails)
      .catch(() => {
        // Handle race condition
        if (getApiEndpoint() !== apiEndpoint) {
          return;
        }

        // Display popup
        notificationCall('failed', 'Could not receive data from the specified API endpoint');
        if (!isApiEndpointLocked()) {
          openEndpointModal();
        }
      });
  }, [apiEndpoint, isClusterAvailable]);

  return composeProviders()
    .append(Suspense, {fallback: <Loading />})

    .render(
      <Suspense fallback={<Loading />}>
        <BannerList items={useGeneralSlot('banners')} onClose={update} />
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div id="log-output-container" />
      </Suspense>
    );
};

export default App;
