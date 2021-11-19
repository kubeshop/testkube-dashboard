import React from 'react';
import {Column} from '@ant-design/charts';
// import moment from 'moment';

interface ITestDetailsLineChart {
  performanceOverTime?: any;
}

const TestDetailsLineChart = ({performanceOverTime}: ITestDetailsLineChart) => {
  // console.log('PERFORMANCE', performanceOverTime);
  // console.log('startTime', moment(performanceOverTime.startTime).seconds());
  // console.log('endTime', moment(performanceOverTime.startTime).seconds());
  console.log('duration', performanceOverTime);

  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
  ];

  const config = {
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
