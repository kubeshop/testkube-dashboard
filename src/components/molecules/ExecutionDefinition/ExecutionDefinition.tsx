import {useContext} from 'react';

import {DashboardBlueprintType} from '@models/dashboard';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';
import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import TestExecutionDefinition from './TestExecutionDefinition';
import TestSuiteExecutionDefinitionsList from './TestSuiteExecutionDefinition';

const executionDefinitions: {[key in DashboardBlueprintType]: any} = {
  'test-suites': <TestSuiteExecutionDefinitionsList />,
  tests: <TestExecutionDefinition />,
};

const ExecutionDefinition: React.FC = () => {
  const {entityType} = useContext(DashboardContext);

  return <StyledInfoPanelSection>{executionDefinitions[entityType]}</StyledInfoPanelSection>;
};

export default ExecutionDefinition;
