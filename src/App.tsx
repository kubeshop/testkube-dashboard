import React, {Suspense, useContext, useEffect, useMemo} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {useUpdate} from 'react-use';

import {config} from '@constants/config';

import {DashboardContext, MainContext} from '@contexts';

import {useModal} from '@modal/hooks';

import {EndpointModal, MessagePanel, notificationCall} from '@molecules';

import {
  EndpointProcessing,
  Executors,
  GlobalSettings,
  Loading,
  NotFound,
  Sources,
  TestSuites,
  Tests,
  Triggers,
  Webhooks,
} from '@pages';

import PluginsContext from '@plugins/context';
import createPluginManager from '@plugins/manager';
import {Plugin} from '@plugins/types';

import {getApiDetails, getApiEndpoint, isApiEndpointLocked, useApiEndpoint} from '@services/apiEndpoint';
import {useGetExecutorsQuery} from '@services/executors';
import {useGetSourcesQuery} from '@services/sources';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useExecutorsSync} from '@store/executors';
import {initializeLogOutputStore} from '@store/logOutput';
import {useSourcesSync} from '@store/sources';

import {composeProviders} from '@utils/composeProviders';
import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

import {MessagePanelWrapper} from './App.styled';

export interface AppProps {
  plugins: Plugin[];
}

const App: React.FC<AppProps> = ({plugins}) => {
  const location = useLocation();
  const apiEndpoint = useApiEndpoint();
  const {isClusterAvailable} = useContext(MainContext);
  const {showTestkubeCloudBanner} = useContext(DashboardContext);

  const [LogOutputProvider] = initializeLogOutputStore(undefined, [location.pathname]);

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

  const {open: openEndpointModal, close: closeEndpointModal} = useModal({
    title: 'Testkube API endpoint',
    width: 693,
    content: <EndpointModal />,
    dataTestCloseBtn: 'endpoint-modal-close-button',
    dataTestModalRoot: 'endpoint-modal',
  });

  const isTestkubeCloudLaunchBannerHidden = localStorage.getItem(config.isTestkubeCloudLaunchBannerHidden);

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

  const scope = useMemo(() => {
    const pluginManager = createPluginManager();
    plugins.forEach(plugin => pluginManager.add(plugin));
    return pluginManager.setup();
  }, [plugins]);

  return composeProviders()
    .append(Suspense, {fallback: <Loading />})
    .append(LogOutputProvider, {})
    .append(PluginsContext.Provider, {
      value: {
        scope,
      },
    })
    .render(
      <Suspense fallback={<Loading />}>
        {!isTestkubeCloudLaunchBannerHidden && showTestkubeCloudBanner ? (
          <MessagePanelWrapper>
            <MessagePanel
              buttons={[
                {
                  type: 'secondary',
                  text: 'Learn more',
                  isLink: true,
                  linkConfig: {
                    href: 'https://testkube.io/get-started',
                    target: '_blank',
                  },
                },
                {
                  type: 'primary',
                  text: 'Connect to Testkube Cloud',
                  isLink: true,
                  linkConfig: {
                    href: 'https://cloud.testkube.io/system-init?cloudMigrate=true',
                    target: '_blank',
                  },
                },
              ]}
              onClose={() => {
                localStorage.setItem(config.isTestkubeCloudLaunchBannerHidden, 'true');
                update();
              }}
              position="fullscreen"
              type="default"
              title="🎉 We have just launched Testkube Cloud! 🎉"
              description="One centralized place for all your local Testkube instances. Fully integrated users, roles and permissions - and much more...."
            />
          </MessagePanelWrapper>
        ) : null}
        <Routes>
          <Route path="tests/*" element={<Tests />} />
          <Route path="test-suites/*" element={<TestSuites />} />
          <Route path="executors/*" element={<Executors />} />
          <Route path="sources/*" element={<Sources />} />
          <Route path="triggers/*" element={<Triggers />} />
          <Route path="webhooks/*" element={<Webhooks />} />
          <Route path="settings" element={<GlobalSettings />} />
          <Route
            path="/apiEndpoint"
            element={isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />}
          />
          <Route path="/" element={<Navigate to="/tests" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div id="log-output-container" />
      </Suspense>
    );
};

export default App;
