import React, { useEffect } from 'react';
import { Typography } from '@atoms';
import { selectTotals, selectFilters  } from '@src/redux/reducers/testsListSlice';
import { useAppSelector } from '@src/redux/hooks';
import { ITestTotals } from '@src/types/testListState';
import { useDispatch } from 'react-redux';
import { useGetTestsByDateQuery } from '@src/services/tests';
import { StyledTestStatistic, StyledTestStatisticsContainer, TestStatsSpan } from './TestStatisticsStats.styled';

interface ITesStatisticsStatsProps {
  totalTests: number;
  failedTests: number;
  runningTests: number;
}

const TestStatisticsStats = () => {
  const dispatch = useDispatch();
  const [testsStats, setTestsStats] = React.useState<ITestTotals>();
  const filters = useAppSelector(selectFilters);
  const totals = useAppSelector(selectTotals);
  const { data, isSuccess } = useGetTestsByDateQuery(filters, {
    skip: !filters.date,
  });
  useEffect(() => {
    const fetchData = () => {
      if (isSuccess) {
        setTestsStats(data?.filtered);
      }
    };

    if (filters.date) {
      fetchData();
    }
    else {
      setTestsStats(totals);
    }
  }, [data?.filtered, filters.date, isSuccess, totals]);


  return (
    <>
      <StyledTestStatisticsContainer>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Executed
          </Typography>
          <TestStatsSpan>{testsStats?.results || 0}</TestStatsSpan>
        </StyledTestStatistic>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Failed
          </Typography>
          <TestStatsSpan>{testsStats?.failed || 0}</TestStatsSpan>
        </StyledTestStatistic>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Running
          </Typography>
          <TestStatsSpan>{testsStats?.pending || 0}</TestStatsSpan>
        </StyledTestStatistic>
      </StyledTestStatisticsContainer>
    </>
  );
};

export default TestStatisticsStats;
