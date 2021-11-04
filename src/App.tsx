import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

import {TestResults, TestsFilter, TestsSummary} from '@organisms';

import {Modal} from '@atoms';

import {config} from '@constants/config';
import {
  isHostProtocolSecure,
  showSmallError,
  getApiEndpointOnPageLoad,
  checkIfQueryParamsExistsInUrl,
  FinalizedApiEndpoint,
} from '@utils';

import {MainTableStyles, StyledTestResults, StyledTestFilter, StyledTestSummary} from './App.styled';

declare global {
  interface Window {
    _env_: any;
  }
}

function App() {
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

      history.push({
        pathname: '/',
        // eslint-disable-next-line
        search: '?' + new URLSearchParams({apiEndpoint: `${dashboardEnvVariable}`}).toString(),
      });
    }

    if (dashboardEnvVariable === 'default') {
      setVisible(true);
    }

    const apiEndpointExist = checkIfQueryParamsExistsInUrl(config.apiEndpoint);

    if (apiEndpointExist) {
      getApiEndpointOnPageLoad();
      FinalizedApiEndpoint(dashboardEnvVariable, true);
      setVisible(false);
    }

    if (!apiEndpointExist && !dashboardEnvVariable) {
      setVisible(true);
    }
  };

  useEffect(() => {
    dashboardEndpointValidators();
  }, []);

  const RenderApp = React.useCallback(() => {
    return (
      <MainTableStyles>
        <thead>
          <StyledTestResults>
            <TestResults />
          </StyledTestResults>
        </thead>
        <tbody>
          <StyledTestFilter>
            <TestsFilter />
          </StyledTestFilter>
          <StyledTestSummary>
            <TestsSummary />
          </StyledTestSummary>
        </tbody>
      </MainTableStyles>
    );
  }, []);

  return (
    <>
      {visible && <Modal visible isModalVisible={setVisible} />}
      <Switch>
        <Route path="/?apiEndpoint=:apiEndpoint" exact render={RenderApp} />
        <Route path="/" exact component={RenderApp} />
      </Switch>
    </>
  );
}

export default App;
