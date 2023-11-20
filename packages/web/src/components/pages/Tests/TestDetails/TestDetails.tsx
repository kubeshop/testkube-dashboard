import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {EntityDetailsLayer, ExecutionDetailsLayer} from '@organisms/EntityDetails';

import {
  useGetTestExecutionByIdQuery,
  useGetTestExecutionMetricsQuery,
  useGetTestExecutionsByIdQuery,
  useGetTestQuery,
} from '@services/tests';

import TestDetailsContent from './TestDetailsContent';

interface TestDetailsProps {
  tab?: string;
}

const TestDetails: FC<TestDetailsProps> = ({tab}) => {
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
        <TestDetailsContent entity="tests" tab={tab} settingsTab={settingsTab} />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestDetails;
