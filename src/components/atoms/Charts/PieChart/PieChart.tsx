// @ts-nocheck
import React, { useEffect } from 'react';
import { Pie } from '@ant-design/charts';

import { useAppSelector } from '@src/redux/hooks';
import { selectTotals } from '@src/redux/reducers/testsListSlice';

const PieChart = () => {
  const [chartTestStatusData, setChartTestStatusData] = React.useState({
    success: 0,
    error: 0,
    pending: 0,
    queued: 0,
  });
  const totals = useAppSelector(selectTotals);

  useEffect(() => {
    function getPercentage(): void {
      if (totals) {
        setChartTestStatusData({ success: totals.passed, error: totals.failed, queued: totals.queued, pending: totals.pending });
      }
    };
    getPercentage();
  }, [totals]);

  const data = [
    {
      type: 'Success',
      value: chartTestStatusData.success,
    },
    {
      type: 'Failed',
      value: chartTestStatusData.error,
    },
    {
      type: 'Pending',
      value: chartTestStatusData.pending,
    },
    {
      type: 'Queued',
      value: chartTestStatusData.queued,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    radius: 1,
    innerRadius: 0.84,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },

    showMarkers: false,
    colorField: 'type',
    color: ({ type }: any) => {
      if (type === 'Success') {
        return '#94D89C';
      }
      if (type === 'Failed') {
        return '#DB5382';
      }
      if (type === 'Pending') {
        return '#FFCA00';
      }
      if (type === 'Queued') {
        return '#FF8C00';
      }
      return '#000';
    },
    legend: false,
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Totals',
      },
    },
  };

  return <Pie {...config} />;
};

export default PieChart;
