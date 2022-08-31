import {memo, useCallback, useEffect, useRef} from 'react';

import debounce from 'lodash.debounce';

import {ExecutionMetrics} from '@models/metrics';

import Chart from './Chart';
import {ChartWrapper, MetricsBarChartWrapper} from './MetricsBarChart.styled';
import PAxisLine from './PAxisLine';

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

const greatestValue = (values: any[], fieldName = 'logDuration') => {
  return values.map(value => value[fieldName]).reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);
};

const MetricsBarChart: React.FC<MetricsBarChartProps> = props => {
  const {
    data = [],
    executionDurationP50ms,
    executionDurationP95ms,
    chartHeight = 100,
    barWidth = 12,
    isDetailsView,
    isRowSelected,
  } = props;

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

  const logScaleData = data
    .map(item => {
      // items with no duration set to 1 sec execution
      if (!item.durationMs || item.durationMs <= 1000) {
        return {
          ...item,
          logDuration: 1,
          durationS: 1,
        };
      }
      /*
      Division each value by some number makes chart look more proportional
      division by 1000 converts values to seconds
      better would be to divide it by minValue - 1 to make sure that each record is displayed well
    */
      const durationS = item.durationMs / 1000;
      return {
        ...item,
        logDuration: Math.log(durationS),
        durationS,
      };
    })
    .reverse();

  const maxValue = greatestValue(logScaleData);

  const barChartConfig: BarChartConfig = {
    barWidth,
    barMargin: barWidth / 2,
    chartHeight: chartHeight + 5,
    chartData: logScaleData,
  };
  const svgWrapperWidth = logScaleData.length * (barChartConfig.barMargin + barChartConfig.barWidth);

  // @ts-ignore
  const {p50AxisPercent, p95AxisPercent} = useCallback(() => {
    if (!executionDurationP50ms || !executionDurationP95ms) {
      return;
    }
    const axisValue = (value?: number) => (barChartConfig.chartHeight * Math.log(Number(value) / 1000)) / maxValue;
    const p50AxisValue = axisValue(executionDurationP50ms);
    const p95AxisValue = axisValue(executionDurationP95ms);

    const axisPercent = (value: number) => Math.round(100 - (value * 100) / barChartConfig.chartHeight);
    return {p50AxisPercent: axisPercent(p50AxisValue), p95AxisPercent: axisPercent(p95AxisValue)};
  }, [executionDurationP50ms, executionDurationP95ms, maxValue, barChartConfig.chartHeight]);

  if (!data || !data.length) {
    return null;
  }
  return (
    <MetricsBarChartWrapper
      $height={barChartConfig.chartHeight}
      isExtendedPadding={Number(executionDurationP95ms) / 1000 > 60}
      isPaddingRemoved={!executionDurationP95ms || !executionDurationP50ms}
    >
      <ChartWrapper $svgWrapperWidth={svgWrapperWidth}>
        {executionDurationP50ms && executionDurationP95ms ? (
          <>
            <PAxisLine axisTopPercent={p50AxisPercent} label="P50" durationMs={executionDurationP50ms} />
            {p50AxisPercent - p95AxisPercent >= 15 ? (
              <PAxisLine axisTopPercent={p95AxisPercent} label="P95" durationMs={executionDurationP95ms} />
            ) : null}
          </>
        ) : null}
        <Chart chartConfig={barChartConfig} maxValue={maxValue} isDetailsView={isDetailsView} scrollRef={scrollRef} />
      </ChartWrapper>
    </MetricsBarChartWrapper>
  );
};

export default memo(MetricsBarChart);
