/* eslint-disable camelcase */
import {useMemo} from 'react';

import {formatDuration} from '@utils/formatDate';

import {StatusColors} from '@styles/Colors';

import Bar from './Bar';
import {BarChartConfig} from './MetricsBarChart';
import {SvgWrapper} from './MetricsBarChart.styled';

type ChartProps = {
  chartConfig: BarChartConfig;
  maxValue: number;
};

const Chart: React.FC<ChartProps> = props => {
  const {chartConfig, maxValue} = props;

  const {chartData, barWidth, chartHeight, barMargin} = chartConfig;

  const renderedBarChart = useMemo(() => {
    return chartData.map((barItem, index) => {
      const {duration_s, logDuration, status, name, startTime} = barItem;

      const barColor = StatusColors[status] as unknown as StatusColors;

      const height = status === 'running' ? chartHeight / 2 : (logDuration * chartHeight) / maxValue;

      const formattedDuration = status === 'running' ? 'running' : formatDuration(duration_s);

      const key = `${name}-bar-${index}`;

      return (
        <Bar
          width={barWidth}
          margin={barMargin}
          height={Math.floor(height)}
          color={barColor}
          tooltipData={{duration: formattedDuration, status, name, startTime}}
          key={key}
        />
      );
    });
  }, [chartData]);

  return <SvgWrapper>{renderedBarChart}</SvgWrapper>;
};

export default Chart;
