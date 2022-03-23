import React, {useContext} from 'react';

import {DashboardBlueprintType} from '@models/dashboard';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {StyledStatusContainer} from './ExecutionDetails.styled';
import TestExecutionDetailsStatus from './TestExecutionDetails/TestExecutionDetailsStatus';
import TestSuiteExecutionDetailsStatus from './TestSuiteExecutionDetails/TestSuiteExecutionDetailsStatus';

// import TestSuiteExecutionDetailsStatus from './TestSuiteExecutionDetails/TestSuiteExecutionDetailsStatus';

const statusComponents: {[key in DashboardBlueprintType]: any} = {
  'test-suites': <TestSuiteExecutionDetailsStatus />,
  tests: <TestExecutionDetailsStatus />,
};

const ExecutionDetailsStatus: React.FC = () => {
  const {entityType} = useContext(DashboardContext);

  return <StyledStatusContainer>{statusComponents[entityType]}</StyledStatusContainer>;
};

export default ExecutionDetailsStatus;
