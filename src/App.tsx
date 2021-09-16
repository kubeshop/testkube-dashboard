import React, {useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';

import {PageHeader, TestResults, TestsFilter, TestsSummary} from '@organisms';
import {getAllTests} from '@services/Tests';
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
  const [urlEndpoint, setUrlEndpoint] = useState<string>('');
  const {data, error} = useQuery('tests', () => getAllTests(urlEndpoint), {refetchInterval: 5000});

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

  React.useEffect(() => {
    const urlEndpointFromUser = getQueryStringFromUrl(window.location.href);
    if (urlEndpointFromUser) {
      setUrlEndpoint(urlEndpointFromUser);
    }
  }, []);

  React.useEffect(() => {
    if (data) {
      const filteredTests =
        selectedTestTypes === 'all'
          ? data.ExecutionSummary
          : data.ExecutionSummary?.filter((test: any) => test.status === selectedTestTypes);

      setDatas(filteredTests);
    }
  }, [selectedTestTypes]);

  React.useEffect(() => {
    const filteredTestsIntervals = data?.ExecutionSummary?.filter(
      (test: any) => getDate(test['start-time']) === getDate(selectedTimeIntervalTests)
    );
    setDatas(filteredTestsIntervals);
  }, [selectedTimeIntervalTests]);

  React.useEffect(() => {
    if (latestDateTests) {
      const latestdate = getLatestDate(data.ExecutionSummary);

      const lastTests = data?.ExecutionSummary.filter(
        (test: any) => getDate(test['start-time']) === getDate(latestdate)
      );

      setDatas(lastTests);
    }
  }, [latestDateTests]);

  return (
    <>
      {error && 'Something went wrong'}
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
