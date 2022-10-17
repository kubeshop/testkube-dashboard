import {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {useGA4React} from 'ga-4-react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApiEndpoint, selectFullScreenLogOutput} from '@redux/reducers/configSlice';
import {setExecutors} from '@redux/reducers/executorsSlice';

import {ProtectedRoute} from '@atoms';

import {Sider} from '@organisms';

import {EndpointProcessing, Executors, Sources, TestSuites, Tests} from '@pages';

import {PollingIntervals} from '@utils/numbers';

import {useGetExecutorsQuery} from '@services/executors';
import {useGetSourcesQuery} from '@services/sources';

import {MainContext} from '@contexts';

import {StyledLayoutContentWrapper} from './App.styled';
import {CookiesBanner} from './components/molecules';
import {setSources} from './redux/reducers/sourcesSlice';

// import FullScreenLogOutput from './components/molecules/LogOutput/FullScreenLogOutput';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const ga4React = useGA4React();
  const location = useLocation();
  const navigate = useNavigate();

  const protocol = window.location.protocol;
  const isProtocolSecure = protocol === 'https:';
  const wsProtocol = isProtocolSecure ? 'wss://' : 'ws://';

  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const wsRoot = apiEndpoint ? apiEndpoint.replace(/https?:\/\//, wsProtocol) : '';

  const {isFullScreenLogOutput, logOutput} = useAppSelector(selectFullScreenLogOutput);

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));

  const {data: executors, refetch: refetchExecutors} = useGetExecutorsQuery(null, {
    pollingInterval: PollingIntervals.long,
  });
  const {data: sources, refetch: refetchSources} = useGetSourcesQuery(null, {pollingInterval: PollingIntervals.long});

  const onAcceptCookies = () => {
    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = false;
    localStorage.setItem('isGADisabled', '0');
    setCookiesVisibility(false);
  };

  const onDeclineCookies = (args?: {skipGAEvent?: boolean}) => {
    if (!args?.skipGAEvent && ga4React) {
      ga4React.gtag('event', 'disable_analytics', {disable_analytics: true});
    }

    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = true;
    localStorage.setItem('isGADisabled', '1');
    setCookiesVisibility(false);
  };

  const mainContextValue = {
    ga4React,
    dispatch,
    location,
    navigate,
    apiEndpoint,
    wsRoot,
    refetchSources,
  };

  useEffect(() => {
    dispatch(setExecutors(executors || []));
  }, [executors]);

  useEffect(() => {
    if (sources) {
      dispatch(setSources(sources));
    }
  }, [sources]);

  useEffect(() => {
    if (ga4React) {
      ga4React.pageview(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    const isGADisabled = Boolean(Number(localStorage.getItem('isGADisabled')));

    if (isGADisabled) {
      onDeclineCookies({skipGAEvent: true});
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
  }, [apiEndpoint]);

  return (
    <MainContext.Provider value={mainContextValue}>
      <Layout>
        <Sider />
        <StyledLayoutContentWrapper>
          <Content>
            <Routes>
              {/* <Route path="/" element={<Login />} /> */}
              <Route
                path="tests/*"
                element={
                  <ProtectedRoute>
                    <Tests />
                  </ProtectedRoute>
                }
              />
              <Route
                path="test-suites/*"
                element={
                  <ProtectedRoute>
                    <TestSuites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="executors"
                element={
                  <ProtectedRoute>
                    <Executors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="sources"
                element={
                  <ProtectedRoute>
                    <Sources />
                  </ProtectedRoute>
                }
              />
              <Route path="/apiEndpoint" element={<EndpointProcessing />} />
              <Route path="*" element={<Navigate to="/tests" />} />
            </Routes>
          </Content>
        </StyledLayoutContentWrapper>
      </Layout>
      {isCookiesVisible ? (
        <CookiesBanner onAcceptCookies={onAcceptCookies} onDeclineCookies={onDeclineCookies} />
      ) : null}
    </MainContext.Provider>
  );
};

export default App;
