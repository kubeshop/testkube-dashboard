import React, { useEffect } from 'react';
import { PieChart, RingProgressChart, TestStatisticsStats } from '@atoms';
import { TestHeader } from '@organisms';
import { TestDetailsDrawerPerformanceSection } from '@molecules';

import { useAppSelector } from '@src/redux/hooks';
import { selectTotals } from '@src/redux/reducers/testsListSlice';
import {
  StyledStatisticsContainer,
  StyledStatisticsHeader,
  StyledTestStatisticsCharts,
  StyledTestStatisticsStatsContainer,
  StyledTestStatisticsChart,
  StyledTestStatisticsCircularCharts,
  StyledTotalTestCurrentStatusChart,
  // StyledAreaChart,
} from './Statistics.styled';
// @ts-nocheck
const Statistics = () => {
  const [totalPercentage, setTotalPercentage] = React.useState<number>();

  const totals = useAppSelector(selectTotals);

  useEffect(() => {
    const getPercentage = (): void => {
      if (totals.passed && (totals.results !== undefined && totals.results > 0)) {
        const total = totals.passed / totals.results;
        setTotalPercentage(total);
      }
    };
    getPercentage();
  }, [totalPercentage, totals.passed, totals.results]);

  return (
    <StyledStatisticsContainer>
      <StyledStatisticsHeader>
        <TestHeader testHeaderLabel="OverView" showTestFilters={false} />
      </StyledStatisticsHeader>
      <StyledTestStatisticsStatsContainer>
        <TestStatisticsStats
        // totalTests={testsStats.testsStats}
        // failedTests={testsStats.failedTests}
        // runningTests={testsStats.runningTests}
        />
      </StyledTestStatisticsStatsContainer>
      <StyledTestStatisticsCharts>
        <StyledTestStatisticsChart>
          <TestDetailsDrawerPerformanceSection bordered={false} main />
        </StyledTestStatisticsChart>

        {/* <StyledTestStatisticsChart>
          <Typography variant="tertiary" color="tertiary">
            Simple Line chart
          </Typography>
          <StyledAreaChart>
            <AreaChart />
          </StyledAreaChart>
        </StyledTestStatisticsChart> */}
      </StyledTestStatisticsCharts>
      <StyledTestStatisticsCircularCharts>
        <StyledTotalTestCurrentStatusChart>
          <RingProgressChart
            height={250}
            width={250}
            fontSize="large"
            testStatus="passed"
            totalPercentageStaticPage={totalPercentage}
          />
        </StyledTotalTestCurrentStatusChart>
        <StyledTotalTestCurrentStatusChart>
          <PieChart />
        </StyledTotalTestCurrentStatusChart>
      </StyledTestStatisticsCircularCharts>
    </StyledStatisticsContainer>
  );
};

export default Statistics;
