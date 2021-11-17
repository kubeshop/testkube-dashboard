import React from 'react';
import {AreaChart, RingProgressChart, TestStatisticsStats, Typography} from '@atoms';
import {TestHeader} from '@organisms';
import {TestDetailsDrawerPerformanceSection} from '@molecules';

import {
  StyledStatisticsContainer,
  StyledStatisticsHeader,
  StyledTestStatisticsCharts,
  StyledTestStatisticsStatsContainer,
  StyledTestStatisticsChart,
  StyledTestStatisticsCircularCharts,
  StyledTotalTestCurrentStatusChart,
  StyledAreaChart,
} from './Statistics.styled';

const Statistics = () => {
  return (
    <StyledStatisticsContainer>
      <StyledStatisticsHeader>
        <TestHeader testHeaderLabel="OverView" showTestFilters={false} />
      </StyledStatisticsHeader>
      <StyledTestStatisticsStatsContainer>
        <TestStatisticsStats />
      </StyledTestStatisticsStatsContainer>
      <StyledTestStatisticsCharts>
        <StyledTestStatisticsChart>
          <TestDetailsDrawerPerformanceSection bordered={false} main />
        </StyledTestStatisticsChart>

        <StyledTestStatisticsChart>
          <Typography variant="tertiary" color="tertiary">
            Simple Line chart
          </Typography>
          <StyledAreaChart>
            <AreaChart />
          </StyledAreaChart>
        </StyledTestStatisticsChart>
      </StyledTestStatisticsCharts>
      <StyledTestStatisticsCircularCharts>
        <StyledTotalTestCurrentStatusChart>
          <RingProgressChart testResultType="success" height={250} width={250} fontSize="large" testStatus="passed" />
        </StyledTotalTestCurrentStatusChart>
        <StyledTotalTestCurrentStatusChart>
          <RingProgressChart testResultType="success" height={250} width={250} fontSize="large" testStatus="passed" />
        </StyledTotalTestCurrentStatusChart>
      </StyledTestStatisticsCircularCharts>
    </StyledStatisticsContainer>
  );
};

export default Statistics;
