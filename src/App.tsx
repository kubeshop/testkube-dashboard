import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';

import {PageHeader, TestResults, TestsFilter, TestsSummary} from '@organisms';
// import {getAllTests} from '@services/Tests';
import {TestsContext} from '@context/testsContext';

import {getDate, getLatestDate} from '@utils/formatDate';
import {getQueryStringFromUrl} from '@utils/validate';

const MainTableStyles = styled.table`
  position: relative;
  top: 0;
  left: var(--font-size-6xl);
  width: 90%;
  border-top-style: hidden;
  table-layout: fixed;
`;

const StyledTestResults = styled.tr`
  display: flex;
  align-items: center;
  border-left-style: hidden;
  border-bottom-style: 1px solid var(--color-gray-secondary);
  word-wrap: break-word;
`;

const StyledTestFilter = styled.tr`
  border-right-style: hidden;
  border-left-style: hidden;
`;

const StyledTestSummary = styled.tr`
  border-right-style: hidden;
  height: 100%;
  max-height: 350px;
  overflow-y: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  touch-action: pan-y;
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
      const url = getQueryStringFromUrl(window.location.href);
      // console.log('URL', url);
      // console.log('Location', window.location.href);
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
      (test: any) => getDate(test['start-time']) === getDate(selectedTimeIntervalTests)
    );
    setDatas(filteredTestsIntervals);
  }, [selectedTimeIntervalTests]);

  useEffect(() => {
    if (latestDateTests) {
      const latestdate = getLatestDate(data);

      const lastTests = data?.filter((test: any) => getDate(test['start-time']) === getDate(latestdate));

      setDatas(lastTests);
    }
  }, [latestDateTests]);

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
