import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';

import {TestResults, TestsFilter, TestsSummary} from '@organisms';
import {TestsContext} from '@context/testsContext';

import {useFetchTests} from '@hooks';
import {Modal} from '@atoms';

import {config} from '@constants/config';
import {
  isHostProtocolSecure,
  showSmallError,
  filterTestsExecution,
  cleanStorageWhenApiEndpointQueryStringIsAbsent,
  getApiEndpointOnPageLoad,
  CheckIfQueryParamsExistsInUrl,
} from '@utils';

import {SelectedTest} from '@types';

const MainTableStyles = styled.table`
  table-layout: fixed;
  width: 90vw;
  height: 100vh;
  text-align: center;
  margin: 0 auto;
`;

const StyledTestResults = styled.tr`
  display: flex;
  height: 152px;
  border-left-style: hidden;
  border-top-style: none;
  border-bottom-style: 1px solid var(--color-gray-secondary);
  word-wrap: break-word;
`;

const StyledTestFilter = styled.tr`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-right-style: hidden;
  border-left-style: hidden;
`;

const StyledTestSummary = styled.tr`
  border-right-style: hidden;
  border-top-style: hidden;
  display: flex;
`;

function App() {
  const [filters, setFilters] = useState<any>({filter: [], dateFilter: ''});
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedTest, setSelectedTest] = useState<SelectedTest>({
    id: '',
    testName: '',
  });

  const {data, error, isLoading} = useFetchTests();

  const tests = {
    data,
    error,
    isLoading,
    selectedTest,
    setSelectedTest,
    setFilters,
    filters,
    isLoading,
    testsExecution: filterTestsExecution(data, filters),
  };

  const dashboardEndpointValidators = () => {
    getApiEndpointOnPageLoad();
    cleanStorageWhenApiEndpointQueryStringIsAbsent();

    if (!isHostProtocolSecure()) {
      showSmallError(`Dashboard is using non-secure protocol!
      <a href='https://kubeshop.github.io/testkube/installing/' target="_blank" rel="noopener">Read more</a>`);
    }
    const apiEndpointExist = CheckIfQueryParamsExistsInUrl(config.apiEndpoint);
    if (!apiEndpointExist) {
      setVisible(true);
    }
  };

  useEffect(() => {
    dashboardEndpointValidators();
  }, []);

  const RenderApp = () => {
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
  };

  return (
    <>
      {visible && <Modal visible isModalVisible={setVisible} />}
      <TestsContext.Provider value={tests}>
        <Switch>
          <Route path="/?apiEndpoint=:apiEndpoint" exact component={RenderApp} />
          <Route path="/" exact component={RenderApp} />
        </Switch>
      </TestsContext.Provider>
    </>
  );
}

export default App;
