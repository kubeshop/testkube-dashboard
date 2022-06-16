import React, {useContext, useEffect} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {decomposeVariables, formatVariables} from '@utils/variables';

import {MainContext} from '@contexts';

import {DashboardBlueprintType} from '@src/models/dashboard';
import {useGetTestSuiteExecutionQuery, useUpdateTestSuiteMutation} from '@src/services/testSuites';
import {useGetTestExecutionByIdQuery, useUpdateTestMutation} from '@src/services/tests';

import {StyledInfoPanelSection} from '../../organisms/DashboardInfoPanel/DashboardInfoPanel.styled';
import {TestDescription, TestSuiteDescription} from './VariablesDescriptions';
import {ExecutionsVariablesList, VariablesList} from './VariablesLists';

type VariablesProps = {
  isExecutions?: boolean;
};

const descriptionTextComponents: {[key in DashboardBlueprintType]: any} = {
  'test-suites': <TestSuiteDescription />,
  tests: <TestDescription />,
};

const Variables: React.FC<VariablesProps> = props => {
  const {dispatch} = useContext(MainContext);
  const {selectedRecord, selectedExecution, entityType, setSelectedRecord} = useContext(DashboardContext);

  const {isExecutions} = props;

  const {data: selectedTestExecutionDetails, refetch: refetchTestExecution} = useGetTestExecutionByIdQuery(
    selectedExecution?.id,
    {skip: !selectedExecution}
  );
  const {data: selectedTestSuiteExecutionDetails, refetch: refetchTestSuiteExecution} = useGetTestSuiteExecutionQuery(
    selectedExecution?.id,
    {skip: !selectedExecution}
  );

  const executionVariables = decomposeVariables(
    entityType === 'tests' ? selectedTestExecutionDetails?.variables : selectedTestSuiteExecutionDetails?.variables
  );

  useEffect(() => {
    if (isExecutions) {
      if (entityType === 'tests') {
        refetchTestExecution();
      } else {
        refetchTestSuiteExecution();
      }
    }
  }, [isExecutions, entityType, selectedExecution, refetchTestExecution, refetchTestSuiteExecution]);

  const [updateTest] = useUpdateTestMutation();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const variables = decomposeVariables(selectedRecord?.variables);

  const onClickSave = (value: any) => {
    const successRecord = {
      ...selectedRecord,
      variables: formatVariables(value['variables-list']),
    };
    let action = null;

    if (entityType === 'tests') {
      action = updateTest;
    } else {
      action = updateTestSuite;
    }

    action({
      id: selectedRecord.name,
      data: successRecord,
    }).then(() => {
      dispatch(setSelectedRecord({selectedRecord: successRecord}));
    });
  };

  return (
    <StyledInfoPanelSection>
      {isExecutions ? (
        <ExecutionsVariablesList data={executionVariables} />
      ) : (
        <>
          {descriptionTextComponents[entityType]}
          <VariablesList data={variables} onClickSave={onClickSave} />
        </>
      )}
    </StyledInfoPanelSection>
  );
};

export default Variables;
