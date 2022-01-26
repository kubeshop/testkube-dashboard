import {useEffect} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {useGA4React} from 'ga-4-react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectApiEndpoint} from '@redux/reducers/configSlice';

import {SideBar} from '@organisms';

import {NotFound} from '@pages';

import {isHostProtocolSecure, routes, showSmallError} from '@utils';

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
          <Switch>
            {routes.map(route => {
              return <Route {...route} />;
            })}
            <Redirect exact from="/" to="/dashboard/tests" />
            <Route path="/dashboard/*" component={NotFound} />
          </Switch>
        </Content>
      </StyledLayoutContentWrapper>
    </Layout>
  );
};

export default App;
