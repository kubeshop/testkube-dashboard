import {ExecutionMetrics} from '@src/models/metrics';

const hundredPercent = 100;
export const secondInMs = 1000;

export const getMaximumValue = (values: any[], fieldName = 'logDuration') => {
  return values.map(value => value[fieldName]).reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);
};

export const getMinimumValue = (values: any[], fieldName = 'durationMs') => {
  return values.map(value => value[fieldName]).reduce((acc, cur) => (cur < acc ? cur : acc), Infinity);
};

export const getAxisPercents = (
  executionDurationP50ms: number,
  executionDurationP95ms: number,
  chartHeight: number,
  maxValue: number,
  minValueDivider: number
) => {
  const axisValue = (value?: number) => (chartHeight * Math.log(Number(value) / minValueDivider)) / maxValue;

  const p50AxisValue = axisValue(executionDurationP50ms);
  const p95AxisValue = axisValue(executionDurationP95ms);

  const axisPercent = (value: number) => Math.round(hundredPercent - (value * hundredPercent) / chartHeight);

  return {p50AxisPercent: axisPercent(p50AxisValue), p95AxisPercent: axisPercent(p95AxisValue)};
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
