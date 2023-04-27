import React, {lazy, Suspense, useContext, useEffect, useRef, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setIsFullScreenLogOutput} from '@redux/reducers/configSlice';
import {setExecutors} from '@redux/reducers/executorsSlice';
import {setSources} from '@redux/reducers/sourcesSlice';

import {useGetExecutorsQuery} from '@services/executors';
import {useGetSourcesQuery} from '@services/sources';
import {getApiDetails, getApiEndpoint, isApiEndpointLocked, useApiEndpoint} from '@services/apiEndpoint';

import {PollingIntervals} from '@utils/numbers';

import {MainContext} from '@contexts';

import {EndpointProcessing, Loading, NotFound} from '@pages';

import {EndpointModal} from '@molecules';
import LogOutputHeader from '@molecules/LogOutput/LogOutputHeader';
import FullScreenLogOutput from '@molecules/LogOutput/FullscreenLogOutput';
import notificationCall from '@molecules/Notification';

const Tests = lazy(() => import('@pages').then(module => ({default: module.Tests})));
const TestSuites = lazy(() => import('@pages').then(module => ({default: module.TestSuites})));
const Executors = lazy(() => import('@pages').then(module => ({default: module.Executors})));
const Sources = lazy(() => import('@pages').then(module => ({default: module.Sources})));
const Triggers = lazy(() => import('@pages').then(module => ({default: module.Triggers})));
const GlobalSettings = lazy(() => import('@pages').then(module => ({default: module.GlobalSettings})));

const App: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const apiEndpoint = useApiEndpoint();
  const {isClusterAvailable} = useContext(MainContext);

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
    refetchExecutors();
    refetchSources();
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

    getApiDetails(apiEndpoint).catch((error) => {
      // Handle race condition
      if (getApiEndpoint() !== apiEndpoint) {
        return;
      }

      // Display popup
      notificationCall('failed', 'Could not receive data from the specified API endpoint');
      setEndpointModalState(true);
    });
  }, [apiEndpoint]);

  return <Suspense fallback={<Loading />}>
    <EndpointModal visible={isEndpointModalVisible} setModalState={setEndpointModalState} />
    <Routes>
      <Route path="tests/*" element={<Tests />} />
      <Route path="test-suites/*" element={<TestSuites />} />
      <Route path="executors/*" element={<Executors />} />
      <Route path="sources/*" element={<Sources />} />
      <Route path="triggers" element={<Triggers />} />
      <Route path="settings" element={<GlobalSettings />} />
      <Route
        path="/apiEndpoint"
        element={isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />}
      />
      <Route path="/" element={<Navigate to="/tests" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    {isFullScreenLogOutput ? <LogOutputHeader logOutput={logOutput} isFullScreen /> : null}
    <CSSTransition nodeRef={logRef} in={isFullScreenLogOutput} timeout={1000} classNames="full-screen-log-output" unmountOnExit>
      <FullScreenLogOutput ref={logRef} logOutput={logOutput} />
    </CSSTransition>
  </Suspense>;
};

export default App;
