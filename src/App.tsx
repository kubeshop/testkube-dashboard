import {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {SideBar} from '@organisms';

import {NotFound} from '@pages';

import {isHostProtocolSecure, routes, showSmallError} from '@utils';

import {StyledLayoutContentWrapper} from './App.styled';

const App = () => {
  useEffect(() => {
    if (!isHostProtocolSecure()) {
      showSmallError(`Dashboard is using non-secure protocol!
      <a href='https://kubeshop.github.io/testkube/dashboard/#httpstls-configuration' target="_blank" rel="noopener">Read more</a>`);
    }
  }, []);

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
            <Route path="*" component={NotFound} />
          </Switch>
        </Content>
      </StyledLayoutContentWrapper>
    </Layout>
  );
};

export default App;
