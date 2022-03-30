/* eslint-disable unused-imports/no-unused-imports-ts */
import React, {useContext, useEffect} from 'react';

import {DashboardBlueprintType} from '@models/dashboard';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';
import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuiteExecutionByIdQuery} from '@services/testSuiteExecutions';
import {useGetTestExecutionByIdQuery} from '@services/tests';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {StyledExecutionDetailsContainer, StyledExecutionDetailsHeader} from './ExecutionDetails.styled';
import ExecutionDetailsGeneralInfo from './ExecutionDetailsGeneralInfo';
import ExecutionDetailsStatus from './ExecutionDetailsStatus';
import TestExecutionDetailsTabs from './TestExecutionDetails/TestExecutionDetailsTabs';
import TestSuiteExecutionDetailsTabs from './TestSuiteExecutionDetails/TestSuiteExecutionDetailsTabs';

const TestSuiteExecutionDetailsDataLayer: React.FC = () => {
  const {selectedExecution} = useContext(DashboardContext);
  const {onDataChange} = useContext(DashboardInfoPanelSecondLevelContext);

  const {id, status} = selectedExecution;

  const interval = status !== 'running' ? 0 : PollingIntervals.everySecond;

  const {data, isLoading, isFetching, refetch} = useGetTestSuiteExecutionByIdQuery(id, {
    pollingInterval: interval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestExecutionDetailsDataLayer: React.FC = () => {
  const {selectedExecution} = useContext(DashboardContext);

  const {onDataChange} = useContext(DashboardInfoPanelSecondLevelContext);

  const {id, status} = selectedExecution;

  const interval = status !== 'running' ? 0 : PollingIntervals.everySecond;

  const {data, isLoading, isFetching, refetch, ...rest} = useGetTestExecutionByIdQuery(id, {
    pollingInterval: interval,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const dataLayers: {[key in DashboardBlueprintType]: any} = {
  'test-suites': <TestSuiteExecutionDetailsDataLayer />,
  tests: <TestExecutionDetailsDataLayer />,
};

const components: {[key in DashboardBlueprintType]: any} = {
  'test-suites': <TestSuiteExecutionDetailsTabs />,
  tests: <TestExecutionDetailsTabs />,
};

const ExecutionDetails = () => {
  const {entityType} = useContext(DashboardContext);
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  return (
    <>
      {dataLayers[entityType]}
      {data ? (
        <>
          <StyledInfoPanelSection isBorder={false}>
            <StyledExecutionDetailsHeader>
              <ExecutionDetailsStatus />
              <ExecutionDetailsGeneralInfo />
            </StyledExecutionDetailsHeader>
          </StyledInfoPanelSection>
          {components[entityType]}
        </>
      ) : null}
    </>
  );
};

export default ExecutionDetails;
