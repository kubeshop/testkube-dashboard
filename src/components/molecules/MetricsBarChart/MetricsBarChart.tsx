/* eslint-disable unused-imports/no-unused-imports-ts */

/* eslint-disable camelcase */
import {useMemo, useRef, useState} from 'react';

import {Tooltip} from 'antd';

import {ExecutionMetrics} from '@models/metrics';

import Colors from '@styles/Colors';

import {
  ChartWrapper,
  MetricsBarChartWrapper,
  MiddleValueLine,
  SvgWithTooltipWrapper,
  SvgWrapper,
} from './MetricsBarChart.styled';

type MetricsBarChartProps = {
  data: ExecutionMetrics[];
};

const Bar: React.FC<any> = props => {
  const {x, y, width, height, color, onHover} = props;

  return <rect x={x} y={y} width={width} height={height} fill={color} onMouseEnter={onHover} />;
};

type ChartProps = {
  chartConfig: {
    barWidth: number;
    barMargin: number;
    middleValue: number;
    chartData: ExecutionMetrics[];
  };
  isHover: any;
  setHover: any;
};

const Chart: React.FC<ChartProps> = props => {
  const {chartConfig, isHover, setHover} = props;

  const {chartData, barWidth, barMargin, middleValue} = chartConfig;

  const ref = useRef<HTMLDivElement>(null);

  const [leftVal, setLeft] = useState(0);

  const getExceededCoef = (middle: number, actualVal: number) => {
    return 20 - (middle / actualVal) * 20;
  };

  const onHover = (left: number) => {
    setLeft(left - 35);
    setHover(true);
  };

  const renderedBarChart = useMemo(() => {
    return chartData.map((barItem, index) => {
      const {duration_ms, status} = barItem;

      const barColor = status === 'failed' ? Colors.pink600 : Colors.lime300;
      const exceededColor = status === 'failed' ? Colors.errorRed : Colors.lime600;

      const neededDuration = duration_ms;

      const isExceeded = middleValue < neededDuration;

      const heightCoef = !isExceeded
        ? (neededDuration / middleValue) * 0.8
        : (80 + getExceededCoef(middleValue, neededDuration)) / 100;

      return (
        <Bar
          width={barWidth}
          x={index * (barWidth + barMargin)}
          y={`${100 - heightCoef * 100}%`}
          height={`${heightCoef * 100}%`}
          color={isExceeded ? barColor : exceededColor}
          onHover={() => onHover(index * (barWidth + barMargin))}
        />
      );
    });
  }, [chartData]);

  const svgWrapperWidth = renderedBarChart.length * (barMargin + barWidth) - barMargin;

  return (
    <SvgWithTooltipWrapper className="tooltip-wrapper" ref={ref} $left={leftVal}>
      <Tooltip
        title={<div>dsadsadsa</div>}
        style={{top: 100, left: leftVal}}
        visible={isHover}
        getPopupContainer={container => {
          return ref.current || container;
        }}
        zIndex={1}
      />
      <SvgWrapper
        viewBox={`0 0 100% ${svgWrapperWidth}px`}
        height="100%"
        width={svgWrapperWidth}
        style={{overflow: 'visible'}}
        onMouseLeave={() =>
          setTimeout(() => {
            setHover(false);
          }, 200)
        }
      >
        {renderedBarChart}
      </SvgWrapper>
    </SvgWithTooltipWrapper>
  );
};

const MetricsBarChart: React.FC<MetricsBarChartProps> = props => {
  const {data} = props;

  const [isHover, setHover] = useState(false);

  const filteredData = data.filter(item => {
    return item.duration_ms;
  });

  const filterBigValue = () => {
    const val = Number(
      (
        filteredData.reduce((acc, cur) => {
          return acc + cur.duration_ms;
        }, 0) / filteredData.length
      ).toFixed(0)
    );

    return val;

    // const val2 = filteredData.filter(item => {
    //   return item.duration_ms < val;
    // });

    // return Number(
    //   (
    //     val2.reduce((acc, cur) => {
    //       return acc + cur.duration_ms;
    //     }, 0) / val2.length
    //   ).toFixed(0)
    // );
  };

  const barChartConfig = {
    barWidth: 12,
    barMargin: 6,
    middleValue: filterBigValue(),
    chartData: filteredData,
  };

  const svgWrapperWidth =
    filteredData.length * (barChartConfig.barMargin + barChartConfig.barWidth) - barChartConfig.barMargin;

  return (
    <MetricsBarChartWrapper
      $svgWrapperWidth={svgWrapperWidth}
      $midVal={Number((barChartConfig.middleValue / 1000).toFixed(0))}
    >
      <ChartWrapper $svgWrapperWidth={svgWrapperWidth} $isHover={isHover}>
        <MiddleValueLine className="middle-val-line" />
        <Chart chartConfig={barChartConfig} setHover={setHover} isHover={isHover} />
      </ChartWrapper>
    </MetricsBarChartWrapper>
  );
};

export default MetricsBarChart;
