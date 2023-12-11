import {useParams} from 'react-router-dom';

import {EntityDetailsLayer, ExecutionDetailsLayer} from '@organisms/EntityDetails';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

import {
  useGetTestSuiteDetailsQuery,
  useGetTestSuiteExecutionByIdQuery,
  useGetTestSuiteExecutionMetricsQuery,
  useGetTestSuiteExecutionsByTestSuiteIdQuery,
} from '@services/testSuites';

import TestSuiteDetailsContent from './TestSuiteDetailsContent';

interface TestSuiteDetailsProps {
  tab?: string;
}

const TestSuiteDetails: React.FC<TestSuiteDetailsProps> = ({tab}) => {
  const {id, execId, settingsTab} = useParams();

  const EntityPromoComponent = useTestsSlotFirst('entityListPromoComponent');

  if (EntityPromoComponent) {
    return <EntityPromoComponent list="test-suites" />;
  }

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
        <TestSuiteDetailsContent entity="test-suites" tab={tab} settingsTab={settingsTab} />
      </ExecutionDetailsLayer>
    </EntityDetailsLayer>
  );
};

export default TestSuiteDetails;
