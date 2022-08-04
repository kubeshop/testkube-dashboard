import {useEffect, useState} from 'react';

import {Artifact} from '@models/artifact';

import {ArtifactsList} from '@molecules';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

type TestExecutionDetailsArtifactsProps = {
  id: string;
};

const TestExecutionDetailsArtifacts: React.FC<TestExecutionDetailsArtifactsProps> = props => {
  const {id} = props;

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  const {data, error} = useGetTestExecutionArtifactsQuery(id);

  useEffect(() => {
    if (error) {
      setArtifacts([]);
    } else if (data && data.length) {
      setArtifacts(data);
    }
  }, [data, error]);

  return <ArtifactsList artifacts={artifacts} testExecutionId={id} />;
};

export default TestExecutionDetailsArtifacts;
