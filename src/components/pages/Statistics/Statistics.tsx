import React from 'react';
import {AreaChart, RingProgressChart, TestStatisticsStats, Typography} from '@atoms';
import {TestHeader} from '@organisms';
import {TestDetailsDrawerPerformanceSection} from '@molecules';

import {useAppSelector} from '@src/redux/hooks';
import {selectTests} from '@src/redux/reducers/testsListSlice';
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
  const [totalPercentage, setTotalPercentage] = React.useState<number>();

  const allTests = useAppSelector(selectTests);

  const getPercentage = (): number => {
    if (allTests) {
      const occurrence = allTests?.reduce(
        (occ: number, step: {status: string}) => (step?.status === 'success' ? occ + 1 : occ),
        0
      );
      const total = occurrence / allTests?.length;
      setTotalPercentage(total);
    }
    return 0;
  };

  React.useEffect(() => {
    getPercentage();
  }, [allTests]);

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
          <RingProgressChart
            height={250}
            width={250}
            fontSize="large"
            testStatus="passed"
            totalPercentageStaticPage={totalPercentage}
          />
        </StyledTotalTestCurrentStatusChart>
        <StyledTotalTestCurrentStatusChart>
          <RingProgressChart height={250} width={250} fontSize="large" testStatus="" />
        </StyledTotalTestCurrentStatusChart>
      </StyledTestStatisticsCircularCharts>
    </StyledStatisticsContainer>
  );
};

export default Statistics;
