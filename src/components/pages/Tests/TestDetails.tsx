import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {EntityDetailsLayer} from '@organisms/EntityDetails/EntityDetailsLayer';
import {ExecutionDetailsLayer} from '@organisms/EntityDetails/ExecutionDetailsLayer';

import {
  useGetTestExecutionByIdQuery,
  useGetTestExecutionMetricsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestQuery,
} from '@services/tests';

import {TestDetailsContent} from './TestDetails/TestDetailsContent';

interface TestDetailsProps {
  tab?: string;
}

export const TestDetails: FC<TestDetailsProps> = ({tab}) => {
  const {id, execId, settingsTab} = useParams();
  return (
    <EntityDetailsLayer
      entity="tests"
      id={id!}
      execId={execId}
      useGetEntityDetails={useGetTestQuery}
      useGetExecutions={useGetTestExecutionsByIdQuery}
      useGetMetrics={useGetTestExecutionMetricsQuery}
    >
      <ExecutionDetailsLayer
        entity="tests"
        id={id!}
        execId={execId}
        useGetExecutionDetails={useGetTestExecutionByIdQuery}
      >
        <TestDetailsContent tab={tab} settingsTab={settingsTab} />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};
