import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '@redux/hooks';
import {selectFilters, selectTotals} from '@redux/reducers/executionsSlice';

import {Typography} from '@atoms';

import {useGetExecutionsQuery} from '@services/executions';

import {TestTotals} from '@types';

import {StyledTestStatistic, StyledTestStatisticsContainer, TestStatsSpan} from './TestStatisticsStats.styled';

const TestStatisticsStats = () => {
  const dispatch = useDispatch();
  const [testsStats, setTestsStats] = React.useState<TestTotals>();
  const filters = useAppSelector(selectFilters);
  const totals = useAppSelector(selectTotals);
  const {data, isSuccess} = useGetExecutionsQuery(filters, {
    // skip: !filters.date,
  });
  useEffect(() => {
    const fetchData = () => {
      if (isSuccess) {
        setTestsStats(data?.filtered);
      }
    };
  }, [totals]);

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
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Passed
          </Typography>
          <TestStatsSpan>{testsStats?.passed || 0}</TestStatsSpan>
        </StyledTestStatistic>
      </StyledTestStatisticsContainer>
    </>
  );
};

export default TestStatisticsStats;
