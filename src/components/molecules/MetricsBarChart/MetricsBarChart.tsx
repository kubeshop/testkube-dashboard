/* eslint-disable unused-imports/no-unused-imports-ts */

/* eslint-disable camelcase */
import {useMemo} from 'react';

import {ExecutionMetrics} from '@models/metrics';

import Colors from '@styles/Colors';

import {ChartWrapper, MetricsBarChartWrapper, SvgWrapper} from './MetricsBarChart.styled';

type MetricsBarChartProps = {
  data: ExecutionMetrics[];
  medianDurationProportion: number;
};

const Bar: React.FC<any> = props => {
  const {x, y, width, height, color, onHover} = props;

  return <rect x={x} y={y} width={width} height={height} fill={color} onMouseEnter={onHover} />;
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

      // by default I multiply log value to 200 so value will fit to container
      // its constant value is 200px
      // medianDurationProportion is a value between 1 and 2
      // so multiplyer is between 100 and 200 px
      // it handles situation when all values are close to equal to each other
      // and we don't have to display max height for them, only a half
      // multiplying by 100 gives this
      const height = (Math.log(duration_ms) * 100 * medianDurationProportion) / max;

      return (
        <Bar
          width={barWidth}
          x={index * (barWidth + barMargin)}
          y={`${200 - height}`}
          // floor height
          height={Math.floor(height)}
          color={barColor}
        />
      );
    });
  }, [chartData]);

  const svgWrapperWidth = renderedBarChart.length * (barMargin + barWidth) - barMargin;

  return (
    <SvgWrapper
      viewBox={`0 0 100% ${svgWrapperWidth}px`}
      height="100%"
      width={svgWrapperWidth}
      style={{overflow: 'visible'}}
    >
      {renderedBarChart}
    </SvgWrapper>
  );
};

const MetricsBarChart: React.FC<MetricsBarChartProps> = props => {
  const {data, medianDurationProportion} = props;

  const filteredData = data
    .filter(item => item.duration_ms)
    // division each value by some number makes chart look more propotional
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
