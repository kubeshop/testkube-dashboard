import React from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';

import {PageHeader, TestResults, TestsFilter, TestsSummary} from '@organisms';
import {getAllTests} from '@services/Tests';
import {TestsContext} from '@context/testsContext';

const MainTableStyles = styled.table`
  position: relative;
  top: 0;
  left: var(--font-size-6xl);
  width: 90%;
  border: 1px solid var(--color-gray-secondary);
  border-top-style: hidden;
`;

const StyledTestResults = styled.tr`
  border-left-style: hidden;
  border-bottom-style: 1px solid var(--color-gray-secondary);
`;

const StyledTestFilter = styled.tr`
  border-right-style: hidden;
  border-left-style: hidden;
`;

const StyledTestSummary = styled.tr`
  border-right-style: hidden;
  height: 100%;
`;

function App() {
  const {data, error, isFetching} = useQuery('tests', getAllTests);

  const tests = {
    data,
  };

  return (
    <>
      {error && 'Something went wrong'}
      {isFetching && 'Loading...'}
      <TestsContext.Provider value={tests.data}>
        <PageHeader />
        <MainTableStyles>
          <StyledTestResults>
            <TestResults />
          </StyledTestResults>
          <StyledTestFilter>
            <TestsFilter />
          </StyledTestFilter>
          <StyledTestSummary>
            <TestsSummary />
          </StyledTestSummary>
        </MainTableStyles>
      </TestsContext.Provider>
    </>
  );
}

export default App;
