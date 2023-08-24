import {FC, useContext, useEffect, useState} from 'react';

import {MainContext} from '@contexts/MainContext';

import type {Artifact} from '@models/artifact';

import {ArtifactsList} from '@molecules/ArtifactsList';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

type TestExecutionArtifactsProps = {
  id: string;
  testName?: string;
  testSuiteName?: string;
  startTime?: string;
};

export const TestExecutionArtifacts: FC<TestExecutionArtifactsProps> = props => {
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
