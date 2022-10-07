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
  isDetailsView?: boolean;
  scrollRef?: any;
};

const Chart: React.FC<ChartProps> = props => {
  const {chartConfig, maxValue, isDetailsView = false, scrollRef} = props;

  const {chartData, barWidth, chartHeight, barMargin} = chartConfig;

  const renderedBarChart = useMemo(() => {
    return chartData.map((barItem, index) => {
      const {durationS, logDuration, status, name, startTime} = barItem;

      const barColor = StatusColors[status] as unknown as StatusColors;

      const height = status === 'running' ? chartHeight / 2 : (logDuration * chartHeight) / maxValue;

      const formattedDuration = status === 'running' ? 'running' : formatDuration(durationS);

      const key = `${name}-bar-${index}`;

      const barProps = {
        width: barWidth,
        margin: barMargin,
        height: Math.floor(height),
        color: barColor,
      };

      if (isDetailsView) {
        return (
          <BarWithTooltip
            key={key}
            tooltipData={{duration: formattedDuration, status, name, startTime}}
            {...barProps}
          />
        );
      }

      return (
        <Bar
          $width={barProps.width}
          $margin={barProps.margin}
          style={{height, background: barProps.color}}
          key={key}
          noHover
        />
      );
    });
  }, [chartData]);

  return (
    <SvgWrapper>
      {renderedBarChart}
      <div ref={scrollRef} />
    </SvgWrapper>
  );
};

export default Chart;
