/* eslint-disable camelcase */
import {useMemo} from 'react';

import {formatDuration} from '@utils/formatDate';

import {StatusColors} from '@styles/Colors';

import BarWithTooltip from './BarWithTooltip';
import {BarChartConfig} from './MetricsBarChart';
import {BarWrapper as Bar, SvgWrapper} from './MetricsBarChart.styled';

type ChartProps = {
  chartConfig: BarChartConfig;
  maxValue: number;
  withTooltip?: boolean;
};

const Chart: React.FC<ChartProps> = props => {
  const {chartConfig, maxValue, withTooltip = false} = props;

  const {chartData, barWidth, chartHeight, barMargin} = chartConfig;

  const renderedBarChart = useMemo(() => {
    return chartData.map((barItem, index) => {
      const {duration_s, logDuration, status, name, startTime} = barItem;

      const barColor = StatusColors[status] as unknown as StatusColors;

      const height = status === 'running' ? chartHeight / 2 : (logDuration * chartHeight) / maxValue;

      const formattedDuration = status === 'running' ? 'running' : formatDuration(duration_s);

      const key = `${name}-bar-${index}`;

      const barProps = {
        width: barWidth,
        margin: barMargin,
        height: Math.floor(height),
        color: barColor,
        key,
      };

      if (withTooltip) {
        return <BarWithTooltip {...barProps} tooltipData={{duration: formattedDuration, status, name, startTime}} />;
      }

      return (
        <Bar $width={barProps.width} $margin={barProps.margin} style={{height, background: barProps.color}} noHover />
      );
    });
  }, [chartData]);

  return <SvgWrapper>{renderedBarChart}</SvgWrapper>;
};

export default Chart;
