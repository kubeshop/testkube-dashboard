import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {TestResults, TestsFilter, TestsSummary} from '@organisms';
import {TestsContext} from '@context/testsContext';

import {
  cleanStorageWhenApiEndpointQueryStringIsAbsent,
  getApiEndpointOnPageLoad,
  CheckIfQueryParamsExistsInUrl,
} from '@utils/validate';

import {useFetchTests} from '@hooks';
import {Modal} from '@atoms';

import {config} from '@constants/config';
import {isHostProtocolSecure, showSmallError, filterTestsExecution} from '@utils';

const MainTableStyles = styled.table`
  table-layout: fixed;
  width: 80vw;
  height: 100vh;
  text-align: center;
  margin: 0 auto;
`;

const StyledTestResults = styled.tr`
  display: flex;
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

  const {data, error} = useFetchTests();

  const tests = {
    data,
    setFilters,
    filters,
    testsExecution: filterTestsExecution(data, filters),
  };

  const dashboardEndpointValidators = () => {
    getApiEndpointOnPageLoad();
    cleanStorageWhenApiEndpointQueryStringIsAbsent();

    if (!isHostProtocolSecure()) {
      showSmallError(`Dashboard is using non-secure protocol!
      <a href='https://kubeshop.github.io/kubtest/installing/' target="_blank" rel="noopener">Read more</a>`);
    }
    const apiEndpointExist = CheckIfQueryParamsExistsInUrl(config.apiEndpoint);
    if (!apiEndpointExist) {
      setVisible(true);
    }
  };

  useEffect(() => {
    dashboardEndpointValidators();
  }, []);

  return (
    <>
      {error && 'Something went wrong...'}
      {visible && <Modal visible isModalVisible={setVisible} />}
      <TestsContext.Provider value={tests}>
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
      </TestsContext.Provider>
    </>
  );
}

export default App;
