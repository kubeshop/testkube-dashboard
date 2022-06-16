import React, {useContext, useEffect} from 'react';

import {Variable} from '@models/variable';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {MainContext} from '@contexts';

import {DashboardBlueprintType} from '@src/models/dashboard';
import {useGetTestSuiteExecutionQuery, useUpdateTestSuiteMutation} from '@src/services/testSuites';
import {useGetTestExecutionByIdQuery, useUpdateTestMutation} from '@src/services/tests';

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

const formatVariables = (list: Variable[]) => {
  const variables: {[key in string]: any} = {};
  list.forEach(item => {
    variables[item.key] = {
      name: item.key,
      value: item.value,
      type: item.type === 0 ? 'basic' : 'secret',
      secretRef: {
        name: item.key,
        key: item.key,
      },
    };
  });
  return variables;
};

const decomposeVariables = (variables: any) => {
  if (!variables) {
    return [];
  }
  return Object.entries(variables).map(([key, value]: any[]) => ({
    ...value,
    key: value.name,
    type: value.type === 'basic' ? 0 : 1,
  }));
};

const Variables: React.FC<VariablesProps> = props => {
  const {dispatch} = useContext(MainContext);
  const {selectedRecord, selectedExecution, entityType, setSelectedRecord} = useContext(DashboardContext);

  const {isExecutions} = props;

  const [updateTest] = useUpdateTestMutation();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const {data: selectedTestExecutionDetails, refetch: refetchTestExecution} = useGetTestExecutionByIdQuery(
    selectedExecution?.id
  );
  const {data: selectedTestSuiteExecutionDetails, refetch: refetchTestSuiteExecution} = useGetTestSuiteExecutionQuery(
    selectedExecution?.id
  );

  const executionVariables = decomposeVariables(
    entityType === 'tests' ? selectedTestExecutionDetails?.variables : selectedTestSuiteExecutionDetails?.variables
  );

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

  useEffect(() => {
    if (isExecutions) {
      if (entityType === 'tests') {
        refetchTestExecution();
      } else {
        refetchTestSuiteExecution();
      }
    }
  }, [isExecutions, entityType, selectedExecution, refetchTestExecution, refetchTestSuiteExecution]);

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
