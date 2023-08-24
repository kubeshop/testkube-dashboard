import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {EntityDetailsLayer} from '@organisms/EntityDetails/EntityDetailsLayer';
import {ExecutionDetailsLayer} from '@organisms/EntityDetails/ExecutionDetailsLayer';

import {
  useGetTestSuiteDetailsQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
  useGetTestSuiteExecutionsByTestSuiteIdQuery,
} from '@services/testSuites';

import {TestSuiteDetailsContent} from './TestSuiteDetails/TestSuiteDetailsContent';

interface TestSuiteDetailsProps {
  tab?: string;
}

export const TestSuiteDetails: FC<TestSuiteDetailsProps> = ({tab}) => {
  const {id, execId, settingsTab} = useParams();
  return (
    <EntityDetailsLayer
      entity="test-suites"
      id={id!}
      execId={execId}
      useGetEntityDetails={useGetTestSuiteDetailsQuery}
      useGetMetrics={useGetTestSuiteExecutionMetricsQuery}
      useGetExecutions={useGetTestSuiteExecutionsByTestSuiteIdQuery}
    >
      <ExecutionDetailsLayer
        entity="test-suites"
        id={id!}
        execId={execId}
        useGetExecutionDetails={useGetTestSuiteExecutionByIdQuery}
      >
        <TestSuiteDetailsContent tab={tab} settingsTab={settingsTab} />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};
