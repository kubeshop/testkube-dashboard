import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';

import {TestResults, TestsFilter, TestsSummary, PageHeader} from '@organisms';
import {TestsContext} from '@context/testsContext';

import {getDate, getLatestDate} from '@utils/formatDate';
import {cleanStorageWhenApiEndpointQueryStringIsAbsent, getApiEndpointOnPageLoad} from '@utils/validate';

import {config} from '@constants/config';
import {Tests} from '@types';

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
  const [selectedTestTypes, setSelectedTestTypes] = useState<string>('');
  const [selectedTest, setSelectedTest] = useState<number | undefined>();
  const [selectedTimeIntervalTests, setSelectedTimeIntervalTests] = useState('');
  const [latestDateTests, setLatestDateTests] = useState<boolean>(false);
  const [testsExecution, setTestsExecution] = useState<Tests[]>([]);

  const {data, error} = useQuery(
    'tests',
    () => {
      const url = localStorage.getItem(config.apiEndpoint);
      if (url) {
        return fetch(url).then(res => res.json());
      }
    },
    {refetchInterval: 5000}
  );

  const tests = {
    data,
    selectedTest,
    setSelectedTest,
    selectedTestTypes,
    setSelectedTestTypes,
    selectedTimeIntervalTests,
    setSelectedTimeIntervalTests,
    latestDateTests,
    setLatestDateTests,
    testsExecution,
  };

  useEffect(() => {
    const filteredTests =
      selectedTestTypes === 'all' ? data : data?.results?.filter((test: any) => test.status === selectedTestTypes);

    setTestsExecution(filteredTests);
  }, [selectedTestTypes]);

  useEffect(() => {
    const filteredTestsIntervals = data?.filter(
      (test: any) => getDate(test.startTime) === getDate(selectedTimeIntervalTests)
    );
    setTestsExecution(filteredTestsIntervals);
  }, [selectedTimeIntervalTests]);

  useEffect(() => {
    if (latestDateTests) {
      const latestdate = getLatestDate(data);

      const lastTests = data?.filter((test: any) => getDate(test.startTime) === getDate(latestdate));

      setTestsExecution(lastTests);
    }
  }, [latestDateTests]);

  useEffect(() => {
    if (data) {
      setTestsExecution(data);
    }
  }, [data]);

  useEffect(() => {
    getApiEndpointOnPageLoad();
    cleanStorageWhenApiEndpointQueryStringIsAbsent();
  }, []);

  return (
    <>
      {error && 'Something went wrong...'}
      <PageHeader />
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
