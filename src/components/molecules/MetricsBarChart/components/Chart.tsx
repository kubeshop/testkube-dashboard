import {useMemo} from 'react';

import {formatDuration} from '@utils/formatDate';

import {SecondaryStatusColors, StatusColors} from '@styles/Colors';

import {BarChartConfig} from '../MetricsBarChart';
import {BarWrapper as Bar, SvgWrapper} from '../MetricsBarChart.styled';
import BarWithTooltip from './BarWithTooltip';

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
      const barInactiveColor = SecondaryStatusColors[status] as unknown as SecondaryStatusColors;

      /*
        if execution is running, bar height is 50% of chartHeight
        PROPORTION ---- heightInPx / chartHeightInPx = logDurationInMs / maxValueInMs
        so we basically say that bar value in px relates to 100% that is chartHeight
        the same as bar value in miliseconds relates to 100% that is max Value in data set
        we take that greatest value is basically set to 100% of chart height
      */
      const height = status === 'running' ? chartHeight / 2 : (logDuration * chartHeight) / maxValue;

      const formattedDuration = status === 'running' ? 'running' : formatDuration(durationS);

      const key = `${name}-bar-${index}`;

      const barProps = {
        height,
        width: barWidth,
        margin: barMargin,
        color: barColor,
        inactiveColor: barInactiveColor,
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

      return <Bar $margin={barProps.margin} style={{height, width: barWidth, background: barProps.color}} key={key} />;
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
