import {useContext} from 'react';

import {RingProgressChart} from '@atoms';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

const TestSuiteExecutionDetailsStatus: React.FC = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {stepResults, status} = data;

  return <RingProgressChart status={status} stepResults={stepResults} fontSize="small" />;
};

export default TestSuiteExecutionDetailsStatus;
