/* eslint-disable unused-imports/no-unused-imports-ts */
import {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import {Button, Layout, Space} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {useGA4React} from 'ga-4-react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import {DashboardBlueprintRenderer, SideBar} from '@organisms';

import {EndpointProcessing, NotFound} from '@pages';

import Colors from '@styles/Colors';

import {
  StyledCookiesButton,
  StyledCookiesContainer,
  StyledCookiesDisclaimer,
  StyledLayoutContentWrapper,
} from './App.styled';
import {setLabels} from './redux/reducers/labelsSlice';
import {useGetLabelsQuery} from './services/labels';

const App = () => {
  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));
  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const dispatch = useAppDispatch();

  const ga4React = useGA4React();

  const {data, refetch} = useGetLabelsQuery(null, {pollingInterval: 10_000});

  const {pathname} = useLocation();

  useEffect(() => {
    refetch();
  }, [apiEndpoint]);

  useEffect(() => {
    dispatch(setLabels(data));
  }, [data]);

  useEffect(() => {
    if (ga4React) {
      ga4React.pageview(pathname);
    }
  }, [pathname]);

  const acceptCookies = () => {
    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = false;
    localStorage.setItem('isGADisabled', '0');
    setCookiesVisibility(false);
  };

  const declineCookies = () => {
    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = true;
    localStorage.setItem('isGADisabled', '1');
    setCookiesVisibility(false);
  };

  useEffect(() => {
    const isGADisabled = Boolean(Number(localStorage.getItem('isGADisabled')));

    if (isGADisabled) {
      declineCookies();
    }
  }, []);

  return (
    <Layout>
      <SideBar />
      <StyledLayoutContentWrapper>
        <Content>
          <Routes>
            <Route path="apiEndpoint" element={<EndpointProcessing />} />
            <Route path="dashboard/test-suites" element={<DashboardBlueprintRenderer entityType="test-suites" />} />
            <Route
              path="dashboard/test-suite-executions"
              element={<DashboardBlueprintRenderer entityType="test-suite-executions" />}
            />
            <Route path="dashboard/tests" element={<DashboardBlueprintRenderer entityType="tests" />} />
            <Route path="dashboard/executions" element={<DashboardBlueprintRenderer entityType="executions" />} />
            <Route path="dashboard/*" element={<NotFound />} />
            <Route path="*" element={<Navigate to="dashboard/test-suites" />} />
          </Routes>
        </Content>
      </StyledLayoutContentWrapper>
      {isCookiesVisible ? (
        <StyledCookiesContainer>
          <Space size={15}>
            <StyledCookiesDisclaimer>
              We use cookies to understand how users interact with Testkube by collecting and reporting information
              <strong> anonymously</strong>
            </StyledCookiesDisclaimer>
            <StyledCookiesButton size="large" onClick={acceptCookies}>
              Accept Cookies
            </StyledCookiesButton>
            <Button size="large" ghost type="text" style={{color: Colors.whitePure}} onClick={declineCookies}>
              Decline
            </Button>
          </Space>
        </StyledCookiesContainer>
      ) : null}
    </Layout>
  );
};

export default App;
