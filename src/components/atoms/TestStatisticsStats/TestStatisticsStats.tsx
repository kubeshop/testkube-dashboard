import React from 'react';
import {Typography} from '@atoms';
import {StyledTestStatistic, StyledTestStatisticsContainer, TestStatsSpan} from './TestStatisticsStats.styled';

const TestStatisticsStats = () => {
  return (
    <>
      <StyledTestStatisticsContainer>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Executed
          </Typography>
          <TestStatsSpan>127</TestStatsSpan>
        </StyledTestStatistic>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Failed
          </Typography>
          <TestStatsSpan>45</TestStatsSpan>
        </StyledTestStatistic>
        <StyledTestStatistic>
          <Typography variant="secondary" color="tertiary">
            Tests Running
          </Typography>
          <TestStatsSpan>56</TestStatsSpan>
        </StyledTestStatistic>
      </StyledTestStatisticsContainer>
    </>
  );
};

export default TestStatisticsStats;
