import {useContext, useEffect, useState} from 'react';

import {MainContext} from '@contexts';

import {Artifact} from '@models/artifact';

import {ArtifactsList} from '@molecules';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

type TestExecutionDetailsArtifactsProps = {
  id: string;
  testName?: string;
  testSuiteName?: string;
  startTime?: string;
};

const TestExecutionDetailsArtifacts: React.FC<TestExecutionDetailsArtifactsProps> = props => {
  const {id, testName, testSuiteName, startTime} = props;

  const {isClusterAvailable} = useContext(MainContext);

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  const {data, isLoading, error} = useGetTestExecutionArtifactsQuery(id, {skip: !isClusterAvailable});

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

export default TestExecutionDetailsArtifacts;
