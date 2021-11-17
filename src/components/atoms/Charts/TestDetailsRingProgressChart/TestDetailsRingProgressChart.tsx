import React from 'react';
import {RingProgress} from '@ant-design/charts';

interface ITestCircleChart {
  testResultType: 'failed' | 'success';
  height: number;
  width: number;
  testPercentage?: number;
}

const RingProgressChart = ({testResultType, height, width, testPercentage = 0.8}: ITestCircleChart) => {
  const config = {
    height,
    width,
    autoFit: false,
    percent: testPercentage,
    color: [testResultType === 'failed' ? ' #eb2424 ' : '#94D89C', '#121212'],
  };

  return <RingProgress {...config} className="ring-progress-style" />;
};

export default RingProgressChart;
