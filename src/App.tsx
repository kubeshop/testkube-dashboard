import React, {Suspense, lazy, useContext, useEffect, useRef, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import {useUpdate} from 'react-use';

import {config} from '@constants/config';

import {DashboardContext, MainContext} from '@contexts';

import {EndpointModal, MessagePanel, notificationCall} from '@molecules';
import FullScreenLogOutput from '@molecules/LogOutput/FullscreenLogOutput';
import LogOutputHeader from '@molecules/LogOutput/LogOutputHeader';

import {EndpointProcessing, Loading, NotFound} from '@pages';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setIsFullScreenLogOutput} from '@redux/reducers/configSlice';
import {setExecutors} from '@redux/reducers/executorsSlice';
import {setSources} from '@redux/reducers/sourcesSlice';

import {getApiDetails, getApiEndpoint, isApiEndpointLocked, useApiEndpoint} from '@services/apiEndpoint';
import {useGetExecutorsQuery} from '@services/executors';
import {useGetSourcesQuery} from '@services/sources';

import {initializeStore} from '@store';

import {composeProviders} from '@utils/composeProviders';
import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

import {MessagePanelWrapper} from './App.styled';

const Tests = lazy(() => import('@pages').then(module => ({default: module.Tests})));
const TestSuites = lazy(() => import('@pages').then(module => ({default: module.TestSuites})));
const Executors = lazy(() => import('@pages').then(module => ({default: module.Executors})));
const Sources = lazy(() => import('@pages').then(module => ({default: module.Sources})));
const Triggers = lazy(() => import('@pages').then(module => ({default: module.Triggers})));
const GlobalSettings = lazy(() => import('@pages').then(module => ({default: module.GlobalSettings})));

const App: React.FC = () => {
  const [StoreProvider] = initializeStore();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const apiEndpoint = useApiEndpoint();
  const {isClusterAvailable} = useContext(MainContext);
  const {showTestkubeCloudBanner} = useContext(DashboardContext);

  const {isFullScreenLogOutput, logOutput} = useAppSelector(selectFullScreenLogOutput);
  const logRef = useRef<HTMLDivElement>(null);

  const {data: executors, refetch: refetchExecutors} = useGetExecutorsQuery(null, {
    pollingInterval: PollingIntervals.long,
    skip: !isClusterAvailable,
  });
  const {data: sources, refetch: refetchSources} = useGetSourcesQuery(null, {
    pollingInterval: PollingIntervals.long,
    skip: !isClusterAvailable,
  });

  const [isEndpointModalVisible, setEndpointModalState] = useState(false);

  const update = useUpdate();

  const isTestkubeCloudLaunchBannerHidden = localStorage.getItem(config.isTestkubeCloudLaunchBannerHidden);

  useEffect(() => {
    dispatch(setIsFullScreenLogOutput(false));
  }, [location.pathname]);

  useEffect(() => {
    dispatch(setExecutors(executors || []));
  }, [executors]);

  useEffect(() => {
    dispatch(setSources(sources || []));
  }, [sources]);

  useEffect(() => {
    safeRefetch(refetchExecutors);
    safeRefetch(refetchSources);
  }, [apiEndpoint]);

  useEffect(() => {
    // Do not fire the effect if new endpoint is just being set up,
    // or it can't be changed.
    if (location.pathname === '/apiEndpoint' || isApiEndpointLocked()) {
      return;
    }

    if (!apiEndpoint) {
      setEndpointModalState(true);
      return;
    }

    getApiDetails(apiEndpoint).catch(() => {
      // Handle race condition
      if (getApiEndpoint() !== apiEndpoint) {
        return;
      }

      // Display popup
      notificationCall('failed', 'Could not receive data from the specified API endpoint');
      setEndpointModalState(true);
    });
  }, [apiEndpoint]);

  return composeProviders()
    .append(Suspense, {fallback: <Loading />})
    .append(StoreProvider, {})
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
              isClosable
              type="default"
              title="🎉 We have just launched Testkube Cloud! 🎉"
              description="One centralised place for all your local Testkube instances. Fully integrated users, roles and permissions - and much more...."
            />
          </MessagePanelWrapper>
        ) : null}
        <EndpointModal visible={isEndpointModalVisible} setModalState={setEndpointModalState} />
        <Routes>
          <Route path="tests/*" element={<Tests />} />
          <Route path="test-suites/*" element={<TestSuites />} />
          <Route path="executors/*" element={<Executors />} />
          <Route path="sources/*" element={<Sources />} />
          <Route path="triggers/*" element={<Triggers />} />
          <Route path="settings" element={<GlobalSettings />} />
          <Route
            path="/apiEndpoint"
            element={isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />}
          />
          <Route path="/" element={<Navigate to="/tests" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isFullScreenLogOutput ? <LogOutputHeader logOutput={logOutput} isFullScreen /> : null}
        <CSSTransition
          nodeRef={logRef}
          in={isFullScreenLogOutput}
          timeout={1000}
          classNames="full-screen-log-output"
          unmountOnExit
        >
          <FullScreenLogOutput ref={logRef} logOutput={logOutput} />
        </CSSTransition>
      </Suspense>
    );
};

export default App;
