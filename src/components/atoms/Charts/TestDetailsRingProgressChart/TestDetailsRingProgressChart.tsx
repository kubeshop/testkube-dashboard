import React from 'react';
import { RingProgress } from '@ant-design/charts';

interface ITestCircleChart {
  height: number;
  width: number;
  fontSize?: 'small' | 'medium' | 'large';
  testStatus: string;
  steps?: any;
  totalPercentageStaticPage?: number;
}

const RingProgressChart = ({
  height,
  width,
  fontSize,
  testStatus,
  steps,
  totalPercentageStaticPage,
}: ITestCircleChart) => {
  const getPercentage = (): number => {
    if (totalPercentageStaticPage) return totalPercentageStaticPage;
    if (steps) {
      const occurrence = steps?.reduce(
        (occ: number, step: { status: string }) => (step?.status === 'success' ? occ + 1 : occ),
        0
      );
      return occurrence / steps?.length;
    }
    return 0;
  };

  const config = {
    follow: true,
    enterable: true,
    TextBackgroundStyle: {
      style: { fontSize: '52px' },
    },
    height,
    width,
    autoFit: false,
    innerRadius: 0.82,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize:
            fontSize === 'small' ? '14px' : fontSize === 'medium' ? '28px' : fontSize === 'large' ? '52px' : '28px',
          lineHeight: '56px',
          textTransform: 'capitalize',
          marginTop: fontSize === 'small' ? '20px' : fontSize === 'large' ? '0px' : '0px',
        },
        formatter: function formatter() {
          return testStatus;
        },
      },
    },
    percent: getPercentage(),
    color: [testStatus === 'failed' ? ' #eb2424 ' : '#94D89C', '#121212'],
  };

  return <RingProgress {...config} className="ring-progress-style" />;
};

export default RingProgressChart;
