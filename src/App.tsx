import React, {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

import {TestResults, TestsFilter, TestsSummary} from '@organisms';
import {TestsContext} from '@context/testsContext';

import {useFetchTestsWithPagination} from '@hooks';
import {Modal} from '@atoms';

import {config} from '@constants/config';
import {
  isHostProtocolSecure,
  showSmallError,
  filterTestsExecution,
  getApiEndpointOnPageLoad,
  CheckIfQueryParamsExistsInUrl,
  FinalizedApiEndpoint,
} from '@utils';

import {SelectedTest} from '@types';
import {MainTableStyles, StyledTestResults, StyledTestFilter, StyledTestSummary} from './App.styled';

declare global {
  interface Window {
    _env_: any;
  }
}

function App() {
  const [filters, setFilters] = useState<any>({filter: [], dateFilter: ''});
  const [visible, setVisible] = useState<boolean>(false);
  const [filterByDate, setFilterByDate] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<SelectedTest>({id: '', testName: ''});
  const history = useHistory();

  const dashboardEndpointValidators = () => {
    if (!isHostProtocolSecure()) {
      showSmallError(`Dashboard is using non-secure protocol!
      <a href='https://kubeshop.github.io/testkube/dashboard/#httpstls-configuration' target="_blank" rel="noopener">Read more</a>`);
    }

    const dashboardEnvVariable = window?._env_?.REACT_APP_API_SERVER_ENDPOINT;

    if (dashboardEnvVariable) {
      setVisible(false);
      FinalizedApiEndpoint(dashboardEnvVariable, true);

      history.push({
        pathname: '/',
        // eslint-disable-next-line
        search: '?' + new URLSearchParams({apiEndpoint: `${dashboardEnvVariable}`}).toString(),
      });
    }

    const apiEndpointExist = CheckIfQueryParamsExistsInUrl(config.apiEndpoint);

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

  const {
    fetchNextPage,
    hasNextPage,
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    hasPreviousPage,
    isLoading,
    isSuccess,
  } = useFetchTestsWithPagination(filterByDate);

  const tests = {
    error,
    isLoading,
    selectedTest,
    setSelectedTest,
    setFilters,
    filters,
    filterByDate,
    setFilterByDate,
    testsExecution: filterTestsExecution(data, filters),
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    hasPreviousPage,
    status,
    tests: {testExecutions: data},
    fetchNextPage,
    hasNextPage,
    isSuccess,
  };

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
      <TestsContext.Provider value={tests}>
        <Switch>
          <Route path="/?apiEndpoint=:apiEndpoint" exact render={RenderApp} />
          <Route path="/" exact component={RenderApp} />
        </Switch>
      </TestsContext.Provider>
    </>
  );
}

export default App;
