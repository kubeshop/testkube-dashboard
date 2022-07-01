import {useContext, useEffect, useState} from 'react';

import axios from 'axios';

import {CopyCommand} from '@molecules';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {StyledExecutionDefinitionCode, StyledExecutionDefinitionPre} from './TestExecutionDefinition.styled';

const TestExecutionDefinition: React.FC = () => {
  const {selectedRecord} = useContext(DashboardContext);

  const {name} = selectedRecord;

  const [testCRD, setTestCRD] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onGetTestCRD = async () => {
    setLoading(true);

    try {
      setTestCRD('');

      const result = await axios(`/test-with-executions/${name}`, {
        method: 'GET',
        headers: {
          Accept: 'text/yaml',
        },
      });

      setTestCRD(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetTestCRD();
  }, [name]);

  return (
    <StyledExecutionDefinitionPre>
      {testCRD ? (
        <CopyCommand command={testCRD} />
      ) : (
        <StyledExecutionDefinitionCode>{isLoading ? 'Loading...' : 'No definition data'}</StyledExecutionDefinitionCode>
      )}
    </StyledExecutionDefinitionPre>
  );
};

export default TestExecutionDefinition;
