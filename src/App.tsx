import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

import {Modal} from '@atoms';
import {Main} from '@pages';

import {config} from '@constants/config';
import {
  isHostProtocolSecure,
  showSmallError,
  getApiEndpointOnPageLoad,
  checkIfQueryParamsExistsInUrl,
  FinalizedApiEndpoint,
} from '@utils';
import {Content} from 'antd/lib/layout/layout';
import {Layout} from 'antd';
import {SideBar} from './components/organisms';

declare global {
  interface Window {
    _env_: any;
  }
}

function App() {
  const [visible, setVisible] = useState<boolean>(true);
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
      history.push({
        pathname: '/',
        search: `?${new URLSearchParams({apiEndpoint: `${dashboardEnvVariable}`}).toString()}`,
      });
    }

    if (dashboardEnvVariable === 'default') {
      setVisible(true);
    }

    const apiEndpointExist = checkIfQueryParamsExistsInUrl(config.apiEndpoint);

    if (apiEndpointExist) {
      getApiEndpointOnPageLoad();
      setVisible(false);
    }
  };

  useEffect(() => {
    dashboardEndpointValidators();
  }, []);

  return (
    <>
      {visible && <Modal visible isModalVisible={setVisible} />}
      <Layout>
        <SideBar />
        <Layout style={{marginLeft: 100}}>
          <Content>
            <div className="site-layout-background">
              <Switch>
                <Route path="/?apiEndpoint=:apiEndpoint" exact render={Main} />
                <Route path="/" exact component={Main} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
