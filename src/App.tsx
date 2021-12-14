/* eslint-disable unused-imports/no-unused-imports-ts */
import {useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import styled from 'styled-components';

import {config} from '@constants/config';

import {Modal} from '@atoms';

import {SideBar} from '@organisms';

import {NotFound} from '@pages';

import {
  FinalizedApiEndpoint,
  checkIfQueryParamsExistsInUrl,
  getApiEndpointOnPageLoad,
  isHostProtocolSecure,
  routes,
  showSmallError,
} from '@utils';

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
  const history = useHistory();

  const dashboardEndpointValidators = () => {
    if (!isHostProtocolSecure()) {
      showSmallError(`Dashboard is using non-secure protocol!
      <a href='https://kubeshop.github.io/testkube/dashboard/#httpstls-configuration' target="_blank" rel="noopener">Read more</a>`);
    }

    const dashboardEnvVariable = window?._env_?.REACT_APP_API_SERVER_ENDPOINT;

    if (dashboardEnvVariable && dashboardEnvVariable !== 'default') {
      setVisible(false);
      FinalizedApiEndpoint(dashboardEnvVariable, true);
      // history.push({
      //   pathname: '/',
      //   search: `?${new URLSearchParams({apiEndpoint: `${dashboardEnvVariable}`}).toString()}`,
      // });
    }

    if (dashboardEnvVariable === 'default') {
      setVisible(true);
    }

    // const apiEndpointExist = checkIfQueryParamsExistsInUrl(config.apiEndpoint);

    // if (apiEndpointExist) {
    // getApiEndpointOnPageLoad();
    setVisible(false);
    // }
  };

  useEffect(() => {
    dashboardEndpointValidators();
  });

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
