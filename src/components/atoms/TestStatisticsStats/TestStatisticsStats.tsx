import React from 'react';
import {Typography} from '@atoms';
import {selectTests} from '@src/redux/reducers/testsListSlice';
import {useAppSelector} from '@src/redux/hooks';
import {StyledTestStatistic, StyledTestStatisticsContainer, TestStatsSpan} from './TestStatisticsStats.styled';

interface ITesStatisticsStatsProps {
  totalTests: number;
  failedTests: number;
  runningTests: number;
}

const TestStatisticsStats = () => {
  const [testsStats, setTestsStats] = React.useState<ITesStatisticsStatsProps>({
    totalTests: 0,
    failedTests: 0,
    runningTests: 0,
  });

  const allTests = useAppSelector(selectTests);

  const getTestsStatisticsStats = () => {
    const totalTests = allTests.length;
    const failedTests = allTests.filter((test: any) => test.status === 'error').length;
    const runningTests = allTests.filter((test: any) => test.status === 'pending').length;
    setTestsStats({
      totalTests,
      failedTests,
      runningTests,
    });
  };

  React.useEffect(() => {
    getTestsStatisticsStats();
  }, []);

  return (
    <>
      {/* {console.log(totalTests, failedTests, runningTests)} */}
      <StyledTestStatisticsContainer>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Executed
          </Typography>
          <TestStatsSpan>{testsStats.totalTests || 0}</TestStatsSpan>
        </StyledTestStatistic>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Failed
          </Typography>
          <TestStatsSpan>{testsStats.failedTests || 0}</TestStatsSpan>
        </StyledTestStatistic>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Running
          </Typography>
          <TestStatsSpan>{testsStats.runningTests || 0}</TestStatsSpan>
        </StyledTestStatistic>
      </StyledTestStatisticsContainer>
    </>
  );
};

export default TestStatisticsStats;
