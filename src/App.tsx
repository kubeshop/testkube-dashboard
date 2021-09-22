import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';

import {PageHeader, TestResults, TestsFilter, TestsSummary} from '@organisms';
import {TestsContext} from '@context/testsContext';

import {getDate, getLatestDate} from '@utils/formatDate';
import {
  cleanStorageWhenApiEndpointQueryStringIsAbsent,
  getApiEndpointOnPageLoad,
  // removeDuplicatesInQueryString,
} from '@utils/validate';

const MainTableStyles = styled.table`
  position: relative;
  left: var(--font-size-6xl);
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
  border-top-style: hidden;
  table-layout: fixed;
  text-align: center;
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
  const [datas, setDatas] = useState([]);
  const [selectedTimeIntervalTests, setSelectedTimeIntervalTests] = useState('');
  const [latestDateTests, setLatestDateTests] = useState<boolean>(false);

  const {data, error} = useQuery(
    'tests',
    () => {
      const url = localStorage.getItem('apiEndpoint');
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
    datas,
    setDatas,
    selectedTimeIntervalTests,
    setSelectedTimeIntervalTests,
    latestDateTests,
    setLatestDateTests,
  };

  useEffect(() => {
    const filteredTests =
      selectedTestTypes === 'all' ? data : data?.filter((test: any) => test.status === selectedTestTypes);
    setDatas(filteredTests);
  }, [selectedTestTypes]);

  useEffect(() => {
    const filteredTestsIntervals = data?.filter(
      (test: any) => getDate(test.startTime) === getDate(selectedTimeIntervalTests)
    );
    setDatas(filteredTestsIntervals);
  }, [selectedTimeIntervalTests]);

  useEffect(() => {
    if (latestDateTests) {
      const latestdate = getLatestDate(data);

      const lastTests = data?.filter((test: any) => getDate(test.startTime) === getDate(latestdate));

      setDatas(lastTests);
    }
  }, [latestDateTests]);

  useEffect(() => {
    getApiEndpointOnPageLoad();
    cleanStorageWhenApiEndpointQueryStringIsAbsent();
  }, []);

  return (
    <>
      {error && 'Something went wrong...'}
      <TestsContext.Provider value={tests}>
        <PageHeader />
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
