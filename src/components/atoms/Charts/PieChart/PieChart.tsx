// @ts-nocheck
import React, {useEffect} from 'react';
import {Pie} from '@ant-design/charts';

import {useAppSelector} from '@src/redux/hooks';
import {selectTotals} from '@src/redux/reducers/testsListSlice';

const PieChart = () => {
  const [chartTestStatusData, setChartTestStatusData] = React.useState({
    success: 0,
    error: 0,
    pending: 0,
  });
  const totals = useAppSelector(selectTotals);

  useEffect(() => {
    function getPercentage(): void {
      if (totals) {
        setChartTestStatusData({
          success: totals.passed,
          error: totals.failed,
          pending: totals.pending,
        });
      }
    }
    getPercentage();
  }, [totals]);

  const data = [
    {
      type: 'Passed',
      value: chartTestStatusData.success,
    },
    {
      type: 'Failed',
      value: chartTestStatusData.error,
    },
    {
      type: 'Running',
      value: chartTestStatusData.pending,
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
        fontSize: 0,
      },
    },

    showMarkers: false,
    colorField: 'type',
    color: ({type}: any) => {
      if (type === 'Passed') {
        return '#94D89C';
      }
      if (type === 'Failed') {
        return '#DB5382';
      }
      if (type === 'Running') {
        return '#FFCA00';
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
