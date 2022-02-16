/* eslint-disable unused-imports/no-unused-imports-ts */
import {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {useGA4React} from 'ga-4-react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import {DashboardBlueprintRenderer, SideBar} from '@organisms';

import {EndpointProcessing, NotFound} from '@pages';

import {StyledCookiesContainer, StyledLayoutContentWrapper} from './App.styled';
import {setTags} from './redux/reducers/tagsSlice';
import {useGetTagsQuery} from './services/tags';

const App = () => {
  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const dispatch = useAppDispatch();

  const ga4React = useGA4React();

  const {data, refetch} = useGetTagsQuery(null, {pollingInterval: 10_000});

  const {pathname} = useLocation();

  useEffect(() => {
    refetch();
  }, [apiEndpoint]);

  useEffect(() => {
    dispatch(setTags(data));
  }, [data]);

  useEffect(() => {
    if (ga4React) {
      ga4React.pageview(pathname);
    }
  }, [pathname]);

  const onToggleCookies = async () => {
    // @ts-ignore
    const value = !window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`];

    // @ts-ignore
    window[`ga-disable-${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`] = !value;
  };

  return (
    <Layout>
      <SideBar />
      <StyledLayoutContentWrapper>
        <Content>
          <Routes>
            <Route path="apiEndpoint" element={<EndpointProcessing />} />
            <Route path="dashboard/tests-suites" element={<DashboardBlueprintRenderer entityType="tests-suites" />} />
            <Route path="dashboard/tests" element={<DashboardBlueprintRenderer entityType="tests" />} />
            <Route path="dashboard/*" element={<NotFound />} />
            <Route path="*" element={<Navigate to="dashboard/tests" />} />
          </Routes>
        </Content>
      </StyledLayoutContentWrapper>
      {/* <StyledCookiesContainer>
        <Button onClick={onToggleCookies}>Toggle</Button>
      </StyledCookiesContainer> */}
    </Layout>
  );
};

export default App;
