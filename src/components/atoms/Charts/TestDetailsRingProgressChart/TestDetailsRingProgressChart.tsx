import {useEffect, useState} from 'react';

import {RingProgressConfig} from '@ant-design/charts';

import {StatusColors} from '@styles/Colors';

import {TestSuiteExecutionStatus} from '@src/models/testSuiteExecutions';

import {StyledRingProgressChart} from './RingProgressChart.styled';

type RingProgressChartProps = {
  height?: number;
  width?: number;
  fontSize?: 'small' | 'medium' | 'large';
  status?: TestSuiteExecutionStatus;
  stepResults?: Array<any>;
};

const RingProgressChart: React.FC<RingProgressChartProps> = props => {
  const {status = 'pending', stepResults = []} = props;

  const [successfulStepsNumber, setSuccessfulStepsNumber] = useState(0);

  const getSuccessfulStepsNumber = () => {
    if (stepResults) {
      const successfulSteps = stepResults?.reduce((occ: number, step) => {
        const {
          execution: {
            executionResult: {status: stepStatus},
          },
        } = step;

        return stepStatus === 'success' ? occ + 1 : occ;
      }, 0);

      return setSuccessfulStepsNumber(successfulSteps);
    }

    return setSuccessfulStepsNumber(0);
  };

  useEffect(() => {
    getSuccessfulStepsNumber();
  }, [stepResults]);

  const chartColors = [StatusColors.success, StatusColors.error] as unknown as string[];

  const config: RingProgressConfig = {
    autoFit: false,
    radius: 1,
    statistic: {
      title: {
        style: {
          color: 'white',
          fontSize: '16px',
        },
        formatter: () => {
          return status === 'error' ? `${successfulStepsNumber}/${stepResults.length}` : String(stepResults.length);
        },
      },
      content: {
        style: {
          color: 'white',
          fontSize: '16px',
        },
        customHtml: () => {
          return status === 'error' ? 'Steps passed' : 'Steps';
        },
      },
    },
    animation: false,
    percent: status === 'error' ? successfulStepsNumber / stepResults.length : stepResults.length,
    color: chartColors,
  };

  return <StyledRingProgressChart {...config} className="ring-progress-style" />;
};

export default RingProgressChart;
