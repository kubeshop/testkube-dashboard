import {ExecutionMetrics} from '@src/models/metrics';

const hundredPercent = 100;
export const secondInMs = 1000;

export const getMaximumValue = (values: any[], fieldName = 'logDuration') => {
  return values.map(value => value[fieldName]).reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);
};

export const getMinimumValue = (values: any[], fieldName = 'durationMs') => {
  return values.map(value => value[fieldName]).reduce((acc, cur) => (cur < acc ? cur : acc), Infinity);
};

export const axisTopPosition: (value: number, height: number) => number = (value, height) =>
  Math.round(hundredPercent - (value * hundredPercent) / height);

export const getAxisPosition = (
  chartHeight: number,
  maxValue: number,
  minValueDivider: number,
  durationMs?: number
) => {
  if (!durationMs) {
    return 0;
  }
  const axisValue = (chartHeight * Math.log(Number(durationMs) / minValueDivider)) / maxValue;

  return axisTopPosition(axisValue, chartHeight);
};

export const metricsLogarithmization = (data: ExecutionMetrics[], minValueDivider: number) => {
  return data
    .map(item => {
      // items with no duration set to 1 sec execution
      if (!item.durationMs || item.durationMs <= secondInMs) {
        return {
          ...item,
          logDuration: 1,
          durationS: 1,
        };
      }
      /*
        Division each value by some number makes chart look more proportional
      */
      const durationS = item.durationMs / secondInMs;
      const logDuration = Math.log(item.durationMs / minValueDivider);

      return {
        ...item,
        logDuration,
        durationS,
      };
    })
    .reverse();
};
