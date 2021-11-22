import React from 'react';
import {Column} from '@ant-design/charts';
// import moment from 'moment';

interface ITestDetailsLineChart {
  performanceOverTime?: any;
}

const TestDetailsLineChart = ({performanceOverTime}: ITestDetailsLineChart) => {
  const data = [
    {
      year: 'Jan',
      value: 0,
    },
    {
      year: 'Feb',
      value: 0,
    },
    {
      year: 'Mar',
      value: 0,
    },
    {
      year: 'Apr',
      value: 0,
    },
    {
      year: 'Mai',
      value: 0,
    },
    {
      year: 'Jun',
      value: 0,
    },
    {
      year: 'Jul',
      value: 0,
    },
    {
      year: 'Sep',
      value: 0,
    },
    {
      year: 'Oct',
      value: 2,
    },
    {
      year: 'Nov',
      value: 5,
    },
    {
      year: 'Dec',
      value: 14,
    },
  ];

  const config = {
    color: '#94D89C',
    meta: {
      count: {min: 0},
    },
    scale: {
      min: 0,
    },
    xAxis: {
      grid: null,
    },
    yAxis: false,
    data,
    columnStyle: {
      lineOpacity: 0,
    },
    autoFit: true,
    xField: 'year',
    yField: 'value',
  };

  return <Column {...config} />;
};

export default TestDetailsLineChart;
