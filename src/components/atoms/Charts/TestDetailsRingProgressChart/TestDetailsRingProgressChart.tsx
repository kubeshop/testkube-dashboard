import React from 'react';
import { RingProgress } from '@ant-design/charts';

interface ITestCircleChart {
  height: number;
  width: number;
  fontSize?: 'small' | 'medium' | 'large';
  testStatus: string;
  steps?: any
}

const RingProgressChart = ({
  height,
  width,
  fontSize,
  testStatus,
  steps,
}: ITestCircleChart) => {
  const getpercentage  = () : number => {
    if (steps) {
      const occurrence = steps?.reduce((occ: number, step: { status: string; }) => (step?.status === "success" ? occ + 1 : occ), 0);
      return occurrence / steps?.length;
    }
    return 0;
  };
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
    percent: getpercentage(),
    color: [testStatus === 'failed' ? ' #eb2424 ' : '#94D89C', '#121212'],
  };
 
  return <RingProgress {...config} className="ring-progress-style" />;

};

export default RingProgressChart;
