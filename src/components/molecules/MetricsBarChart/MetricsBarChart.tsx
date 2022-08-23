/* eslint-disable camelcase */
import {memo, useCallback, useEffect, useRef} from 'react';

import {ExecutionMetrics} from '@models/metrics';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import Chart from './Chart';
import {ChartWrapper, MetricsBarChartWrapper, NoData} from './MetricsBarChart.styled';
import PAxisLine from './PAxisLine';

export type BarChartConfig = {
  barWidth: number;
  barMargin: number;
  chartHeight: number;
  chartData: any[];
};

type MetricsBarChartProps = {
  data?: ExecutionMetrics[];
  execution_duration_p50_ms?: number;
  execution_duration_p95_ms?: number;
  chartHeight?: number;
  barWidth?: number;
  withTooltip?: boolean;
  daysFilterValue?: number;
};

const greatestValue = (values: any[], fieldName = 'logDuration') => {
  return values.map(value => value[fieldName]).reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);
};

const MetricsBarChart: React.FC<MetricsBarChartProps> = props => {
  const {
    data = [],
    execution_duration_p50_ms,
    execution_duration_p95_ms,
    chartHeight = 100,
    barWidth = 12,
    withTooltip,
    daysFilterValue,
  } = props;

  const scrollRef = useRef(null);
  const didMountRef = useRef(false);

  const scrollToRight = () => {
    if (!scrollRef.current) {
      return;
    }
    // @ts-ignore
    scrollRef.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  };

  useEffect(() => {
    if (didMountRef.current) {
      if (daysFilterValue) {
        setTimeout(() => {
          scrollToRight();
        }, 500);
      }
    }
    didMountRef.current = true;
  }, [daysFilterValue]);

  const logScaleData = data.map(item => {
    // items with no duration set to 1 sec execution
    if (!item.duration_ms || item.duration_ms <= 1000) {
      return {
        ...item,
        logDuration: 1,
        duration_s: 1,
      };
    }
    /*
      Division each value by some number makes chart look more proportional
      division by 1000 converts values to seconds
      better would be to divide it by minValue - 1 to make sure that each record is displayed well
    */
    const duration_s = item.duration_ms / 1000;
    return {
      ...item,
      logDuration: Math.log(duration_s),
      duration_s,
    };
  });

  const maxValue = greatestValue(logScaleData);

  const barChartConfig: BarChartConfig = {
    barWidth,
    barMargin: barWidth / 2,
    chartHeight: chartHeight + 5,
    chartData: logScaleData,
  };
  const svgWrapperWidth =
    logScaleData.length * (barChartConfig.barMargin + barChartConfig.barWidth) - barChartConfig.barMargin;

  // @ts-ignore
  const {p50AxisPercent, p95AxisPercent} = useCallback(() => {
    if (!execution_duration_p50_ms || !execution_duration_p95_ms) {
      return;
    }
    const axisValue = (value?: number) => (barChartConfig.chartHeight * Math.log(Number(value) / 1000)) / maxValue;
    const p50AxisValue = axisValue(execution_duration_p50_ms);
    const p95AxisValue = axisValue(execution_duration_p95_ms);

    const axisPercent = (value: number) => Math.round(100 - (value * 100) / barChartConfig.chartHeight);
    return {p50AxisPercent: axisPercent(p50AxisValue), p95AxisPercent: axisPercent(p95AxisValue)};
  }, [execution_duration_p50_ms, execution_duration_p95_ms, maxValue, barChartConfig.chartHeight]);

  return (
    <MetricsBarChartWrapper
      $height={barChartConfig.chartHeight}
      isExtendedPadding={Number(execution_duration_p95_ms) / 1000 > 60}
      isPaddingRemoved={!execution_duration_p95_ms || !execution_duration_p50_ms}
    >
      {!data || !data.length ? (
        <NoData>
          <Text className={`regular ${withTooltip ? 'big' : 'middle'}`} color={Colors.slate500}>
            No information about metrics
          </Text>
        </NoData>
      ) : (
        <ChartWrapper $svgWrapperWidth={svgWrapperWidth}>
          {execution_duration_p50_ms && execution_duration_p95_ms ? (
            <>
              <PAxisLine axisTopPercent={p50AxisPercent} label="P50" durationMs={execution_duration_p50_ms} />
              {p50AxisPercent - p95AxisPercent >= 15 ? (
                <PAxisLine axisTopPercent={p95AxisPercent} label="P95" durationMs={execution_duration_p95_ms} />
              ) : null}
            </>
          ) : null}
          <Chart chartConfig={barChartConfig} maxValue={maxValue} withTooltip={withTooltip} scrollRef={scrollRef} />
        </ChartWrapper>
      )}
    </MetricsBarChartWrapper>
  );
};

export default memo(MetricsBarChart);
