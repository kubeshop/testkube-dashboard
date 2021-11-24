import React from 'react';
import {Area} from '@ant-design/charts';

const AreaChart = () => {
  const data = [
    {
      Date: '2010-01',
      scales: 1000,
    },
    {
      Date: '2010-02',
      scales: 1100,
    },
    {
      Date: '2010-03',
      scales: 1200,
    },
    {
      Date: '2010-04',
      scales: 1300,
    },
    {
      Date: '2010-05',
      scales: 1400,
    },
    {
      Date: '2010-06',
      scales: 1500,
    },
    {
      Date: '2010-07',
      scales: 1600,
    },
    {
      Date: '2010-08',
      scales: 1700,
    },
    {
      Date: '2010-09',
      scales: 1800,
    },
    {
      Date: '2010-10',
      scales: 1800,
    },
    {
      Date: '2010-11',
      scales: 2000,
    },
    {
      Date: '2010-12',
      scales: 2100,
    },
  ];

  const config = {
    data,
    meta: {
      count: {min: 0},
    },
    scale: {
      min: 0,
    },
    width: 542,
    height: 160,
    xField: 'Date',
    yField: 'scales',
    padding: [4],
    yAxis: false,
    color: '#AD54F880',
    point: {
      shape: 'circle',
      color: '#ad54f880',
    },
  };

  return <Area {...config} />;
};

export default AreaChart;
