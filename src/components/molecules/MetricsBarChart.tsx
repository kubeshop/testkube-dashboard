import {FC, memo, useCallback, useEffect, useRef} from 'react';

import debounce from 'lodash.debounce';

import type {ExecutionMetrics} from '@models/metrics';

import {BarsWrapper, ChartWrapper, MetricsBarChartWrapper} from './MetricsBarChart.styled';
import {BarChartConfig, Chart} from './MetricsBarChart/components/Chart';
import {PAxisLine} from './MetricsBarChart/components/PAxisLine';
import {
  getAxisPosition,
  getMaximumValue,
  getMinimumValue,
  metricsLogarithmization,
  secondInMs,
} from './MetricsBarChart/utils';

type MetricsBarChartProps = {
  data?: ExecutionMetrics[];
  executionDurationP50ms?: number;
  executionDurationP95ms?: number;
  chartHeight?: number;
  barWidth?: number;
  isDetailsView?: boolean;
};

const visibleDifferenctBetweenAxes = 17;

export const MetricsBarChart: FC<MetricsBarChartProps> = memo(props => {
  const {
    data = [],
    executionDurationP50ms,
    executionDurationP95ms,
    chartHeight = 105,
    barWidth = 12,
    isDetailsView,
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
  }, [data.length]);

  useEffect(() => {
    if (isDetailsView) {
      const debouncedScroll = debounce(() => scrollToRight(), 200);

      window.addEventListener('resize', debouncedScroll);

      return () => {
        window.removeEventListener('resize', debouncedScroll);
      };
    }
  }, []);

  const minValueMs = getMinimumValue(data, 'durationMs');
  const maxValueMs = getMaximumValue(data, 'durationMs');

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

  const maxLogValue = getMaximumValue(logScaleData, 'logDuration');

  // chart config
  const barChartConfig: BarChartConfig = {
    barWidth,
    // margin equal to half of bar width
    barMargin: barWidth / 2,
    chartHeight,
    chartData: logScaleData,
  };
  const wrapperWidth = logScaleData.length * (barChartConfig.barMargin + barChartConfig.barWidth);

  const getAxisLines = useCallback(() => {
    if (!isDetailsView) {
      return [0, 0, 0];
    }

    return [
      getAxisPosition(chartHeight, maxLogValue, minValueDivider, executionDurationP50ms),
      getAxisPosition(chartHeight, maxLogValue, minValueDivider, executionDurationP95ms),
      getAxisPosition(chartHeight, maxLogValue, minValueDivider, minValueMs),
    ];
  }, [
    chartHeight,
    maxLogValue,
    minValueDivider,
    executionDurationP50ms,
    executionDurationP95ms,
    minValueMs,
    isDetailsView,
  ]);

  const [p50Axis, p95Axis, minAxis] = getAxisLines();

  if (!data || !data.length || data.length < 2) {
    return null;
  }

  return (
    <MetricsBarChartWrapper $isDetailsView={isDetailsView}>
      <ChartWrapper $wrapperWidth={wrapperWidth} $isDetailsView={isDetailsView}>
        {isDetailsView ? (
          <>
            <PAxisLine
              axisTop={0}
              durationMs={maxValueMs}
              dontApplyMargin
              isLabelVisible={
                (p95Axis >= visibleDifferenctBetweenAxes || !(p50Axis - p95Axis >= visibleDifferenctBetweenAxes)) &&
                minAxis >= visibleDifferenctBetweenAxes
              }
            />
            {executionDurationP50ms && executionDurationP95ms ? (
              <>
                <PAxisLine
                  axisTop={p95Axis}
                  label="P95"
                  durationMs={executionDurationP95ms}
                  isLabelVisible={
                    Math.abs(p50Axis - p95Axis) >= visibleDifferenctBetweenAxes &&
                    Math.abs(p95Axis - minAxis) >= visibleDifferenctBetweenAxes
                  }
                />
                <PAxisLine
                  axisTop={p50Axis}
                  label="P50"
                  durationMs={executionDurationP50ms}
                  isLabelVisible={Math.abs(p50Axis - minAxis) >= visibleDifferenctBetweenAxes}
                />
              </>
            ) : null}
            <PAxisLine axisTop={minAxis} durationMs={minValueMs} isLabelVisible />
          </>
        ) : null}
        <BarsWrapper $isDetailsView={isDetailsView}>
          <Chart
            chartConfig={barChartConfig}
            maxValue={maxLogValue}
            isDetailsView={isDetailsView}
            scrollRef={scrollRef}
          />
        </BarsWrapper>
      </ChartWrapper>
    </MetricsBarChartWrapper>
  );
});
