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

import {Executors, TestSuites, Tests} from '@pages';

import {PollingIntervals} from '@utils/numbers';

import {useGetExecutorsQuery} from '@services/executors';

import {MainContext} from '@contexts';

import {StyledLayoutContentWrapper} from './App.styled';
import {CookiesBanner} from './components/molecules';
// import FullScreenLogOutput from './components/molecules/LogOutput/FullScreenLogOutput';
import env from './env';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const ga4React = useGA4React();
  const location = useLocation();
  const navigate = useNavigate();

  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const {isFullScreenLogOutput, logOutput} = useAppSelector(selectFullScreenLogOutput);

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));

  const {data} = useGetExecutorsQuery(null, {pollingInterval: PollingIntervals.long});

  useEffect(() => {
    dispatch(setExecutors(data || []));
  }, [data]);

  useEffect(() => {
    if (ga4React) {
      ga4React.pageview(location.pathname);
    }
  }, [location.pathname]);

  const onAcceptCookies = () => {
    // @ts-ignore
    window[`ga-disable-${env.ga}`] = false;
    localStorage.setItem('isGADisabled', '0');
    setCookiesVisibility(false);
  };

  const onDeclineCookies = (args?: {skipGAEvent?: boolean}) => {
    if (!args?.skipGAEvent && ga4React) {
      ga4React.gtag('event', 'disable_analytics', {disable_analytics: true});
    }

    // @ts-ignore
    window[`ga-disable-${env.ga}`] = true;
    localStorage.setItem('isGADisabled', '1');
    setCookiesVisibility(false);
  };

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

  const mainContextValue = {
    ga4React,
    dispatch,
    location,
    navigate,
  };

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
