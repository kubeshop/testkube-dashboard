import {useContext} from 'react';

import {CopyCommand} from '@molecules';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {StyledExecutionDefinitionCode, StyledExecutionDefinitionPre} from './TestExecutionDefinition.styled';
import {getExecutionDefinitionData} from './utils';

const TestExecutionDefinition: React.FC = () => {
  const {selectedRecord} = useContext(DashboardContext);

  const {content} = selectedRecord;

  const command = getExecutionDefinitionData(content);

  return (
    <StyledExecutionDefinitionPre>
      {command ? (
        <CopyCommand command={command} />
      ) : (
        <StyledExecutionDefinitionCode>No definition data</StyledExecutionDefinitionCode>
      )}
    </StyledExecutionDefinitionPre>
  );
};

export default TestExecutionDefinition;
