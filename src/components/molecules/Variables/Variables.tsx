import React, {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {DashboardBlueprintType} from '@src/models/dashboard';

import {StyledInfoPanelSection} from '../../organisms/DashboardInfoPanel/DashboardInfoPanel.styled';
import TestDescription from './TestDescription';
import TestSuiteDescription from './TestSuiteDescription';
import {ExecutionsVariablesList, VariablesList} from './VariablesLists';

type VariablesProps = {
  isExecutions?: boolean;
};

const descriptionTextComponents: {[key in DashboardBlueprintType]: any} = {
  'test-suites': <TestSuiteDescription />,
  tests: <TestDescription />,
};

const Variables: React.FC<VariablesProps> = props => {
  const {isExecutions} = props;
  const {
    selectedRecord: {variables = []},
    entityType,
  } = useContext(DashboardContext);

  return (
    <StyledInfoPanelSection>
      {isExecutions ? (
        <ExecutionsVariablesList data={variables} />
      ) : (
        <>
          {descriptionTextComponents[entityType]}
          <VariablesList data={variables} />
        </>
      )}
    </StyledInfoPanelSection>
  );
};

export default Variables;
