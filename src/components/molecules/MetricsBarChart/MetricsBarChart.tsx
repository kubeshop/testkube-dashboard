import {memo, useCallback, useEffect, useRef} from 'react';

import debounce from 'lodash.debounce';

import {ExecutionMetrics} from '@models/metrics';

import {ChartWrapper, MetricsBarChartWrapper} from './MetricsBarChart.styled';
import Chart from './components/Chart';
import PAxisLine from './components/PAxisLine';
import {getAxisPositions, getMaximumValue, getMinimumValue, metricsLogarithmization, secondInMs} from './utils';

export type BarChartConfig = {
  barWidth: number;
  barMargin: number;
  chartHeight: number;
  chartData: any[];
};

type MetricsBarChartProps = {
  data?: ExecutionMetrics[];
  executionDurationP50ms?: number;
  executionDurationP95ms?: number;
  chartHeight?: number;
  barWidth?: number;
  isDetailsView?: boolean;
  isRowSelected?: boolean;
};

const visibleDifferenctBetweenAxes = 5;

const MetricsBarChart: React.FC<MetricsBarChartProps> = props => {
  const {
    data = [],
    executionDurationP50ms,
    executionDurationP95ms,
    chartHeight = 105,
    barWidth = 12,
    isDetailsView,
    isRowSelected,
  } = props;

  // autoscroll to right if chart in details view
  const scrollRef = useRef(null);

  const scrollToRight = (behavior = 'smooth') => {
    if (!scrollRef.current) {
      return;
    }
    // @ts-ignore
    scrollRef.current.scrollIntoView({behavior, block: 'end', inline: 'nearest'});
  };

  useEffect(() => {
    if (isDetailsView) {
      setTimeout(() => {
        scrollToRight();
      }, 500);
    }
  }, [data.length, isRowSelected]);

  useEffect(() => {
    if (isDetailsView) {
      const debouncedScroll = debounce(() => scrollToRight(), 200);

      window.addEventListener('resize', debouncedScroll);

      return () => {
        window.removeEventListener('resize', debouncedScroll);
      };
    }
  }, []);

  /*
    Chart data calculations
    Bar height is calculated from 60% of the minimum value
    this parameter is discussable and probably can be defined by user
    the higher the percentage, the bigger is the difference between executions on chart
  */
  const minValue60P = getMinimumValue(data) * 0.6;
  const minValueDivider = minValue60P > secondInMs ? minValue60P : secondInMs;

  // Logarithmization of metrics data
  const logScaleData = metricsLogarithmization(data, minValueDivider);

  const maxLogValue = getMaximumValue(logScaleData);

  // chart config
  const barChartConfig: BarChartConfig = {
    barWidth,
    // margin equal to half of bar width
    barMargin: barWidth / 2,
    chartHeight,
    chartData: logScaleData,
  };
  const wrapperWidth = logScaleData.length * (barChartConfig.barMargin + barChartConfig.barWidth);

  // calculate Y-Axis position on chart
  const calculateAxisTop = useCallback(() => {
    if (!executionDurationP50ms || !executionDurationP95ms) {
      return [0, 0];
    }
    return getAxisPositions(
      executionDurationP50ms,
      executionDurationP95ms,
      barChartConfig.chartHeight,
      maxLogValue,
      minValueDivider
    );
  }, [executionDurationP50ms, executionDurationP95ms, maxLogValue, barChartConfig.chartHeight, minValueDivider]);

  const [p50Axis, p95Axis] = calculateAxisTop();

  if (!data || !data.length) {
    return null;
  }

  return (
    <MetricsBarChartWrapper isDetailsView={isDetailsView} isExtendedPadding={false} isPaddingRemoved>
      <ChartWrapper $wrapperWidth={wrapperWidth}>
        {executionDurationP50ms && executionDurationP95ms ? (
          <>
            <PAxisLine axisTop={p50Axis} label="P50" durationMs={executionDurationP50ms} />
            {p50Axis - p95Axis >= visibleDifferenctBetweenAxes ? (
              <PAxisLine axisTop={p95Axis} label="P95" durationMs={executionDurationP95ms} />
            ) : null}
          </>
        ) : null}
        <Chart
          chartConfig={barChartConfig}
          maxValue={maxLogValue}
          isDetailsView={isDetailsView}
          scrollRef={scrollRef}
        />
      </ChartWrapper>
    </MetricsBarChartWrapper>
  );
};

export default memo(MetricsBarChart);
