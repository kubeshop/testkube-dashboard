import {Suspense, lazy, useEffect, useState, useRef} from 'react';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import GA4React, {useGA4React} from 'ga-4-react';
import posthog from 'posthog-js';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setIsFullScreenLogOutput} from '@redux/reducers/configSlice';
import {setExecutors} from '@redux/reducers/executorsSlice';
import {setSources} from '@redux/reducers/sourcesSlice';

import {CookiesBanner, EndpointModal} from '@molecules';
import FullScreenLogOutput from '@molecules/LogOutput/FullscreenLogOutput';
import LogOutputHeader from '@molecules/LogOutput/LogOutputHeader';

import {Sider} from '@organisms';

import {EndpointProcessing, ErrorBoundary, NotFound} from '@pages';

import {PollingIntervals} from '@utils/numbers';

import {ReactComponent as LoadingIcon} from '@assets/loading.svg';

import {useGetClusterConfigQuery} from '@services/config';
import {useGetExecutorsQuery} from '@services/executors';
import {useGetSourcesQuery} from '@services/sources';
import {useApiEndpoint} from '@services/apiEndpoint';

import {MainContext} from '@contexts';

import {AnalyticsProvider} from './AnalyticsProvider';
import {StyledLayoutContentWrapper} from './App.styled';

const Tests = lazy(() => import('@pages').then(module => ({default: module.Tests})));
const TestSuites = lazy(() => import('@pages').then(module => ({default: module.TestSuites})));
const Executors = lazy(() => import('@pages').then(module => ({default: module.Executors})));
const Sources = lazy(() => import('@pages').then(module => ({default: module.Sources})));
const Triggers = lazy(() => import('@pages').then(module => ({default: module.Triggers})));
const GlobalSettings = lazy(() => import('@pages').then(module => ({default: module.GlobalSettings})));

const pjson = require('../package.json');

const segmentIOKey = process.env.REACT_APP_SEGMENT_WRITE_KEY || '';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const ga4React = useGA4React();
  const location = useLocation();
  const navigate = useNavigate();

  const protocol = window.location.protocol;
  const isProtocolSecure = protocol === 'https:';
  const wsProtocol = isProtocolSecure ? 'wss://' : 'ws://';

  const apiEndpoint = useApiEndpoint();

  const {isFullScreenLogOutput, logOutput} = useAppSelector(selectFullScreenLogOutput);

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));
  const [isEndpointModalVisible, setEndpointModalState] = useState(false);

  const {data: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery();

  const {data: executors, refetch: refetchExecutors} = useGetExecutorsQuery(null, {
    pollingInterval: PollingIntervals.long,
  });

  const {data: sources, refetch: refetchSources} = useGetSourcesQuery(null, {
    pollingInterval: PollingIntervals.long,
  });

  const logRef = useRef<HTMLDivElement>(null);

  const onAcceptCookies = async () => {
    // @ts-ignore
    window[`ga-disable-G-945BK09GDC`] = false;
    localStorage.setItem('isGADisabled', '0');
    setCookiesVisibility(false);

    if (
      process.env.NODE_ENV !== 'development' &&
      !window.location.href.includes('testkube.io') &&
      clusterConfig?.enableTelemetry
    ) {
      const ga4react = new GA4React('G-945BK09GDC');

      ga4react.initialize();
    }
  };

  const onDeclineCookies = (args?: {skipGAEvent?: boolean}) => {
    // @ts-ignore
    window[`ga-disable-G-945BK09GDC`] = true;
    localStorage.setItem('isGADisabled', '1');
    setCookiesVisibility(false);
  };

  const mainContextValue = {
    ga4React,
    dispatch,
    location,
    navigate,
    clusterConfig,
  };

  useEffect(() => {
    dispatch(setExecutors(executors || []));
  }, [executors]);

  useEffect(() => {
    dispatch(setSources(sources || []));
  }, [sources]);

  useEffect(() => {
    posthog.capture('$pageview');

    if (ga4React) {
      ga4React.pageview(location.pathname);
    }

    dispatch(setIsFullScreenLogOutput(false));
  }, [location.pathname]);

  useEffect(() => {
    const isGADisabled = Boolean(Number(localStorage.getItem('isGADisabled')));

    if (isGADisabled) {
      onDeclineCookies({skipGAEvent: true});
    } else if (process.env.NODE_ENV !== 'development') {
      posthog.init('phc_DjQgd6iqP8qrhQN6fjkuGeTIk004coiDRmIdbZLRooo', {
        opt_out_capturing_by_default: false,
      });
    }
  }, []);

  useEffect(() => {
    if (ga4React) {
      ga4React.gtag('event', 'user_info', {api_host: window.location.host, os: window.navigator.userAgent});
    }
  }, [ga4React]);

  useEffect(() => {
    refetchExecutors();
    refetchSources();
    refetchClusterConfig();
  }, [apiEndpoint]);

  return (
    <AnalyticsProvider privateKey={segmentIOKey} appVersion={pjson.version}>
      <MainContext.Provider value={mainContextValue}>
        <Layout>
          <EndpointModal visible={isEndpointModalVisible} setModalState={setEndpointModalState} />
          <Sider />
          <StyledLayoutContentWrapper>
            <Content>
              <ErrorBoundary>
                <Suspense fallback={<LoadingIcon />}>
                  <Routes>
                    <Route path="tests/*" element={<Tests />} />
                    <Route path="test-suites/*" element={<TestSuites />} />
                    <Route path="executors/*" element={<Executors />} />
                    <Route path="sources/*" element={<Sources />} />
                    <Route path="triggers" element={<Triggers />} />
                    <Route path="settings" element={<GlobalSettings />} />
                    <Route path="/apiEndpoint" element={<EndpointProcessing />} />
                    <Route path="/" element={<Navigate to="/tests" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </Content>
            {isFullScreenLogOutput ? <LogOutputHeader logOutput={logOutput} isFullScreen /> : null}
            <CSSTransition nodeRef={logRef} in={isFullScreenLogOutput} timeout={1000} classNames="full-screen-log-output" unmountOnExit>
              <FullScreenLogOutput ref={logRef} logOutput={logOutput} />
            </CSSTransition>
          </StyledLayoutContentWrapper>
        </Layout>
        {isCookiesVisible && !clusterConfig?.enableTelemetry ? (
          <CookiesBanner onAcceptCookies={onAcceptCookies} onDeclineCookies={onDeclineCookies} />
        ) : null}
      </MainContext.Provider>
    </AnalyticsProvider>
  );
};

export default App;
