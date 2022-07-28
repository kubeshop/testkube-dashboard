import {ArtifactsList} from '@molecules';

import {useGetTestExecutionArtifactsQuery} from '@services/tests';

type TestExecutionDetailsArtifactsProps = {
  id: string;
};

const TestExecutionDetailsArtifacts: React.FC<TestExecutionDetailsArtifactsProps> = props => {
  const {id} = props;

  const {data: artifactsData} = useGetTestExecutionArtifactsQuery(id);

  return artifactsData ? <ArtifactsList artifacts={artifactsData} testExecutionId={id} /> : null;
};

export default TestExecutionDetailsArtifacts;
