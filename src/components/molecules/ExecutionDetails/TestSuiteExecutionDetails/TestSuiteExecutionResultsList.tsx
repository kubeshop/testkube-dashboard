import {useContext} from 'react';

import {ExecutionStepsList} from '@molecules';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

const TestSuiteExecutionResultsList = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {stepResults} = data;

  return <ExecutionStepsList executionSteps={stepResults} />;
};

export default TestSuiteExecutionResultsList;
