import {useContext, useEffect, useState} from 'react';

import {useGetTestExecutionAIQuery} from '@services/tests';

import {MainContext} from '@contexts';
import { Ansi } from 'ansi-to-react';

type TestExecutionDetailsAIProps = {
  id: string;
  testName?: string;
  testSuiteName?: string;
};

const TestExecutionDetailsAI: React.FC<TestExecutionDetailsAIProps> = props => {
  const {id, testName, testSuiteName} = props;

  const {isClusterAvailable} = useContext(MainContext);

  const [aiResponse, setAiResponse] = useState('');

  const {data, isLoading, error} = useGetTestExecutionAIQuery(id, {skip: !isClusterAvailable});

  useEffect(() => {
    if (error) {
      setAiResponse(error);
    } else if (data && data.length) {
      setAiResponse(data);
    }
  }, [data, error]);

  return (
    <Ansi useClasses>{isLoading ? `We're fetching some artificial data for you....` : aiResponse}</Ansi>
  );
};

export default TestExecutionDetailsAI;
