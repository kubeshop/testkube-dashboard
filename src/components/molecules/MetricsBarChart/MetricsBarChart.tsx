/* eslint-disable camelcase */
import {useMemo} from 'react';

import {Tooltip} from 'antd';

import {ExecutionMetrics} from '@models/metrics';

import Colors from '@styles/Colors';

import {BarWrapper, ChartWrapper, MetricsBarChartWrapper, SvgWrapper} from './MetricsBarChart.styled';

type MetricsBarChartProps = {
  data: ExecutionMetrics[];
  medianDurationProportion: number;
};

const Bar: React.FC<any> = props => {
  const {width, height, color, tooltipData} = props;

  const value = `Duration: ${tooltipData.duration_ms.toFixed()}s`;

  return (
    <Tooltip title={value} placement="top">
      <BarWrapper style={{height}} $width={width} bg={color} />
    </Tooltip>
  );
};

type ChartProps = {
  chartConfig: any;
  medianDurationProportion: number;
};

// @ts-ignore
const greatestValue = values =>
  // @ts-ignore
  values.map(value => Math.log(value.duration_ms)).reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);

const Chart: React.FC<ChartProps> = props => {
  const {chartConfig, medianDurationProportion} = props;

  const {chartData, barWidth, barMargin} = chartConfig;

  const max = greatestValue(chartData);

  const renderedBarChart = useMemo(() => {
    return chartData.map((barItem: any, index: number) => {
      const {duration_ms, status} = barItem;

      const barColor = status === 'failed' ? Colors.pink600 : Colors.lime300;

      // by default I multiply log value to 150 so value will fit to container
      // its constant value is 100px
      // medianDurationProportion is a value between 1 and 2
      // so multiplier is between 75 and 150 px
      // it handles situation when all values are close to equal to each other
      // and we don't have to display max height for them, only a half
      // multiplying by 75 gives this
      const height = (Math.log(duration_ms) * 75 * medianDurationProportion) / max;

      return (
        <Bar
          width={barWidth}
          x={index * (barWidth + barMargin)}
          y={`${150 - height}`}
          // floor height
          height={Math.floor(height)}
          color={barColor}
          tooltipData={barItem}
        />
      );
    });
  }, [chartData]);

  const svgWrapperWidth = renderedBarChart.length * (barMargin + barWidth) - barMargin;

  return <SvgWrapper style={{overflow: 'visible'}}>{renderedBarChart}</SvgWrapper>;
};

const MetricsBarChart: React.FC<MetricsBarChartProps> = props => {
  const {data, medianDurationProportion} = props;

  const filteredData = data
    .filter(item => item.duration_ms)
    // division each value by some number makes chart look more proportional
    // division by 1000 converts values to seconds
    // better would be to divide it by minValue - 1
    .map(item => ({...item, duration_ms: item.duration_ms / 1000}))
    .reverse();

  const barChartConfig = {
    barWidth: 12,
    barMargin: 6,
    chartData: filteredData,
  };

  const svgWrapperWidth = data.length * (barChartConfig.barMargin + barChartConfig.barWidth) - barChartConfig.barMargin;

  return (
    <MetricsBarChartWrapper $svgWrapperWidth={svgWrapperWidth}>
      <ChartWrapper $svgWrapperWidth={svgWrapperWidth}>
        <Chart chartConfig={barChartConfig} medianDurationProportion={medianDurationProportion} />
      </ChartWrapper>
    </MetricsBarChartWrapper>
  );
};

export default MetricsBarChart;
