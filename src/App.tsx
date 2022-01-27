import {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {useGA4React} from 'ga-4-react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import {DashboardBlueprintRenderer, SideBar} from '@organisms';

import {EndpointProcessing, NotFound} from '@pages';

import {isHostProtocolSecure, showSmallError} from '@utils';

import {StyledLayoutContentWrapper} from './App.styled';
import {setTags} from './redux/reducers/tagsSlice';
import {useGetTagsQuery} from './services/tags';

const App = () => {
  const apiEndpoint = useAppSelector(selectApiEndpoint);
  const dispatch = useAppDispatch();

  const ga4React = useGA4React();

  const {data, refetch} = useGetTagsQuery(null);

  const {pathname} = useLocation();

  useEffect(() => {
    if (!isHostProtocolSecure()) {
      showSmallError(`Dashboard is using non-secure protocol!
      <a href='https://kubeshop.github.io/testkube/dashboard/#httpstls-configuration' target="_blank" rel="noopener">Read more</a>`);
    }
  }, []);

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

  return (
    <Layout>
      <SideBar />
      <StyledLayoutContentWrapper>
        <Content>
          <Routes>
            <Route path="apiEndpoint" element={<EndpointProcessing />} />
            <Route path="dashboard/tests" element={<DashboardBlueprintRenderer entityType="tests" />} />
            <Route
              path="dashboard/test-executions"
              element={<DashboardBlueprintRenderer entityType="test-executions" />}
            />
            <Route path="dashboard/scripts" element={<DashboardBlueprintRenderer entityType="scripts" />} />
            <Route path="dashboard/executions" element={<DashboardBlueprintRenderer entityType="executions" />} />
            <Route path="dashboard/*" element={<NotFound />} />
            <Route path="*" element={<Navigate to="dashboard/tests" />} />
          </Routes>
        </Content>
      </StyledLayoutContentWrapper>
    </Layout>
  );
};

export default App;
