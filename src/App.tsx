import React, {useState} from 'react';
import styled from 'styled-components';
import {useQuery} from 'react-query';

import {PageHeader, TestResults, TestsFilter, TestsSummary} from '@organisms';
import {getAllTests} from '@services/Tests';
import {TestsContext} from '@context/testsContext';

// import {Tests} from '@types';
import {getDate} from '@utils/formatDate';

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
  const [selectedTestTypes, setSelectedTestTypes] = useState<string>('');
  const [selectedTest, setSelectedTest] = useState<number | undefined>();
  const [datas, setDatas] = useState([]);
  const [selectedTimeIntervalTests, setSelectedTimeIntervalTests] = useState('');
  const [latestDateTests, setLatestDateTests] = useState();
  const {data, error, isFetching} = useQuery('tests', getAllTests, {refetchInterval: 60000});

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
    if (data) {
      const filteredTests =
        selectedTestTypes === 'all'
          ? data.ExecutionSummary
          : data.ExecutionSummary.filter((test: any) => test.status === selectedTestTypes);

      setDatas(filteredTests);
    }
  }, [selectedTestTypes]);

  React.useEffect(() => {
    const filteredTestsIntervals = data?.ExecutionSummary.filter(
      (test: any) => getDate(test['start-time']) === getDate(selectedTimeIntervalTests)
    );
    setDatas(filteredTestsIntervals);
  }, [selectedTimeIntervalTests]);

  React.useEffect(() => {
    // connect
  }, [latestDateTests]);

  return (
    <>
      {error && 'Something went wrong'}
      {isFetching && 'Loading...'}
      <TestsContext.Provider value={tests}>
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
