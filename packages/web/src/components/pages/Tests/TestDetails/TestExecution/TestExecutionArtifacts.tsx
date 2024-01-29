import {useEffect, useMemo, useState} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Artifact} from '@models/artifact';

import {ArtifactsList} from '@molecules';
import {ArtifactsListBaseProps} from '@molecules/ArtifactsList/ArtifactsList';

import {useTestsSlotFirst} from '@plugins/tests-and-test-suites/hooks';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

import {PollingIntervals} from '@src/utils/numbers';

type TestExecutionArtifactsProps = {
  id: string;
  testName?: string;
  testSuiteName?: string;
  startTime?: string;
};

const TestExecutionArtifacts: React.FC<TestExecutionArtifactsProps> = props => {
  const {id, testName, testSuiteName, startTime} = props;

  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  const {data, isLoading, error} = useGetTestExecutionArtifactsQuery(id, {
    skip: !isSystemAvailable,
    pollingInterval: PollingIntervals.everyTwoSeconds,
  });

  useEffect(() => {
    if (error) {
      setArtifacts([]);
    } else if (data && data.length) {
      setArtifacts(data);
    }
  }, [data, error]);

  const DefaultArtifactsListComponent: React.FC<ArtifactsListBaseProps> = useMemo(
    () => componentProps => <ArtifactsList {...componentProps} />,
    []
  );

  const ViewComponent = useTestsSlotFirst('ArtifactsListComponent', [
    {value: DefaultArtifactsListComponent, metadata: {order: 2}},
  ]);

  if (!ViewComponent) {
    return null;
  }

  return (
    <ViewComponent
      artifacts={artifacts}
      testExecutionId={id}
      isLoading={isLoading}
      testName={testName}
      testSuiteName={testSuiteName}
      startTime={startTime}
    />
  );
};

export default TestExecutionArtifacts;
