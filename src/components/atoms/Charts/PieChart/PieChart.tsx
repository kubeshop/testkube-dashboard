// @ts-nocheck
import React from 'react';
import {Pie} from '@ant-design/charts';

import {useAppSelector} from '@src/redux/hooks';
import {selectTests} from '@src/redux/reducers/testsListSlice';

const PieChart = () => {
  const [chartTestStatusData, setChartTestStatusData] = React.useState({
    success: 0,
    error: 0,
    pending: 0,
    running: 0,
  });
  const allTests = useAppSelector(selectTests);

  const getPercentage = (): number => {
    if (allTests) {
      const success = allTests?.reduce(
        (occ: number, step: {status: string}) => (step?.status === 'success' ? occ + 1 : occ),
        0
      );
      const error = allTests?.reduce(
        (occ: number, step: {status: string}) => (step?.status === 'error' ? occ + 1 : occ),
        0
      );
      const pending = allTests?.reduce(
        (occ: number, step: {status: string}) => (step?.status === 'pending' ? occ + 1 : occ),
        0
      );
      const running = allTests?.reduce(
        (occ: number, step: {status: string}) => (step?.status === 'running' ? occ + 1 : occ),
        0
      );

      setChartTestStatusData({success, error, pending, running});
    }
    return 0;
  };

  React.useEffect(() => {
    getPercentage();
  }, [allTests]);

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
      type: 'Running',
      value: chartTestStatusData.running,
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
    color: ({type}: any) => {
      if (type === 'Success') {
        return '#94D89C';
      }
      if (type === 'Failed') {
        return '#DB5382';
      }
      if (type === 'Pending') {
        return '#FFCA00';
      }
      if (type === 'Running') {
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
