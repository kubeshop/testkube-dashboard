import React, {useEffect} from 'react';

import {useAppSelector} from '@redux/hooks';
import {selectTotals} from '@redux/reducers/executionsSlice';

import {PieChart} from '@atoms';

import {
  StyledStatisticsContainer,
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
          {/* <RingProgressChart
            height={250}
            width={250}
            fontSize="large"
            testStatus="error"
            totalPercentageStaticPage={totalPercentage}
          /> */}
        </StyledTotalTestCurrentStatusChart>
        <StyledTotalTestCurrentStatusChart>
          <PieChart />
        </StyledTotalTestCurrentStatusChart>
      </StyledTestStatisticsCircularCharts>
    </StyledStatisticsContainer>
  );
};

export default Statistics;
