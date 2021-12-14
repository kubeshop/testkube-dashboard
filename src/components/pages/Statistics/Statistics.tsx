import React, {useEffect} from 'react';

import {useAppSelector} from '@redux/hooks';
import {selectTotals} from '@redux/reducers/testsListSlice';

import {PieChart, RingProgressChart} from '@atoms';

import {TestHeader} from '@organisms';

import {
  StyledStatisticsContainer,
  StyledStatisticsHeader, // StyledTestStatisticsStatsContainer,
  StyledTestStatisticsCircularCharts,
  StyledTotalTestCurrentStatusChart,
} from './Statistics.styled';

const Statistics = () => {
  const [totalPercentage, setTotalPercentage] = React.useState<number>();

  const totals = useAppSelector(selectTotals);

  useEffect(() => {
    const getPercentage = (): void => {
      if (totals.passed && totals.results !== undefined && totals.results > 0) {
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
      {/* <StyledTestStatisticsStatsContainer>
        <TestStatisticsStats />
      </StyledTestStatisticsStatsContainer> */}
      {/* <StyledTestStatisticsCharts>
        <StyledTestStatisticsChart>
          <TestDetailsDrawerPerformanceSection bordered={false} main />
        </StyledTestStatisticsChart> */}

      {/* <StyledTestStatisticsChart>
          <Typography variant="tertiary" color="tertiary">
            Simple Line chart
          </Typography>
          <StyledAreaChart>
            <AreaChart />
          </StyledAreaChart>
        </StyledTestStatisticsChart> */}
      {/* </StyledTestStatisticsCharts> */}
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
