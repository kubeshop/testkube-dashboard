import React from 'react';
import {RingProgress} from '@ant-design/charts';

interface ITestCircleChart {
  testResultType: 'failed' | 'success';
  height: number;
  width: number;
  testPercentage?: number;
  fontSize?: 'small' | 'medium' | 'large';
  testStatus: 'passed' | 'failed' | 'queued' | 'pending';
}

const RingProgressChart = ({
  testResultType,
  height,
  width,
  fontSize,
  testStatus,
  testPercentage = 0.8,
}: ITestCircleChart) => {
  const config = {
    height,
    width,
    autoFit: false,

    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize:
            fontSize === 'small' ? '14px' : fontSize === 'medium' ? '28px' : fontSize === 'large' ? '52px' : '28px',
          lineHeight: '56px',
        },
        formatter: function formatter() {
          return testStatus;
        },
      },
    },
    percent: testPercentage,
    color: [testResultType === 'failed' ? ' #eb2424 ' : '#94D89C', '#121212'],
  };

  return <RingProgress {...config} className="ring-progress-style" />;
};

export default RingProgressChart;
