import {useParams} from 'react-router-dom';

import {EntityDetailsLayer, ExecutionDetailsLayer} from '@organisms/EntityDetails';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

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

const TestDetails: React.FC<TestDetailsProps> = ({tab}) => {
  const {id, execId, settingsTab} = useParams();
  const EntityPromoComponent = useTestsSlotFirst('entityListPromoComponent');

  if (EntityPromoComponent) {
    return <EntityPromoComponent list="tests" />;
  }

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
