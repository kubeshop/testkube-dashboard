import {useEffect, useState} from 'react';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Artifact} from '@models/artifact';

import {ArtifactsList} from '@molecules';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

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

  const {data, isLoading, error} = useGetTestExecutionArtifactsQuery(id, {skip: !isSystemAvailable});

  useEffect(() => {
    if (error) {
      setArtifacts([]);
    } else if (data && data.length) {
      setArtifacts(data);
    }
  }, [data, error]);

  return (
    <ArtifactsList
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
