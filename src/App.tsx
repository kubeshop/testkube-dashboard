import {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import styled from 'styled-components';

import {Modal} from '@atoms';

import {SideBar} from '@organisms';

import {NotFound} from '@pages';

import {isHostProtocolSecure, routes, showSmallError} from '@utils';

declare global {
  interface Window {
    _env_: any;
  }
}

const StyledLayoutContentWrapper = styled(Layout)`
  min-height: 100vh;
  padding: 50px 35px 50px 115px;
`;

const App = () => {
  const [visible, setVisible] = useState<boolean>(false);

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
      {visible && <Modal visible isModalVisible={setVisible} />}
    </Layout>
  );
};

export default App;
