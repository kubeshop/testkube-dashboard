import {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import ExecutionStepsList from '../../ExecutionStepsList';

const TestSuiteExecutionDefinitionsList: React.FC = () => {
  const {selectedRecord} = useContext(DashboardContext);

  const {steps} = selectedRecord;

  return <ExecutionStepsList iconSet="definition" executionSteps={steps} />;
};

export default TestSuiteExecutionDefinitionsList;
