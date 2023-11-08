import {useMemo} from 'react';

import {format, getDayOfYear} from 'date-fns';

import {SecondaryStatusColors, StatusColors} from '@styles/Colors';

import {formatDuration} from '@utils/formatDate';

import {BarWrapper as Bar, SvgWrapper} from '../MetricsBarChart.styled';

import BarWithTooltip from './BarWithTooltip';

export type BarChartConfig = {
  barWidth: number;
  barMargin: number;
  chartHeight: number;
  chartData: any[];
};

type ChartProps = {
  chartConfig: BarChartConfig;
  maxValue: number;
  isDetailsView?: boolean;
  scrollRef?: React.MutableRefObject<null>;
};

const Chart: React.FC<ChartProps> = props => {
  const {chartConfig, maxValue, isDetailsView = false, scrollRef} = props;

  const {chartData, barWidth, chartHeight, barMargin} = chartConfig;

  const renderedBarChart = useMemo(() => {
    let prevDay = getDayOfYear(new Date(chartData[0].startTime));

    return chartData.map(barItem => {
      const {durationS, logDuration, status, name, startTime} = barItem;

      const barColor = StatusColors[status as keyof typeof StatusColors];
      const barHoverColor = SecondaryStatusColors[status as keyof typeof SecondaryStatusColors];

      const height =
        status === 'running' || status === 'aborting' ? chartHeight / 2 : (logDuration * chartHeight) / maxValue;

      const formattedDuration = status === 'running' || status === 'aborting' ? 'running' : formatDuration(durationS);

      const barProps = {
        height,
        width: barWidth,
        margin: barMargin,
        color: barColor,
        hoverColor: barHoverColor,
      };

      if (isDetailsView) {
        const startTimeDate = new Date(startTime);
        const showDate = prevDay !== getDayOfYear(startTimeDate);
        if (showDate) {
          prevDay = getDayOfYear(startTimeDate);
        }
        return (
          <BarWithTooltip
            key={name}
            name={name}
            status={status}
            duration={formattedDuration}
            startTime={startTime}
            date={showDate ? format(startTimeDate, 'd.M.yy') : undefined}
            chartHeight={chartHeight}
            {...barProps}
          />
        );
      }

      return <Bar $margin={barProps.margin} style={{height, width: barWidth, background: barProps.color}} key={name} />;
    });
  }, [chartData, barWidth, chartHeight, maxValue, barMargin, isDetailsView]);

  return (
    <SvgWrapper $isDetailsView={isDetailsView}>
      <span ref={scrollRef} />
      {renderedBarChart}
    </SvgWrapper>
  );
};

export default Chart;
