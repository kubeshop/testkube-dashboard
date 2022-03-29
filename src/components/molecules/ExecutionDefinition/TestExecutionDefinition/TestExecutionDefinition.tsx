import {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import CopyCommand from '../../CLICommands/CopyCommand';
import {StyledExecutionDefinitionCode, StyledExecutionDefinitionPre} from './TestExecutionDefinition.styled';

const TestExecutionDefinition = () => {
  const {selectedRecord} = useContext(DashboardContext);

  const {content} = selectedRecord;

  return (
    <StyledExecutionDefinitionPre>
      {content?.data ? (
        <CopyCommand command={content?.data} />
      ) : (
        <StyledExecutionDefinitionCode>No definition data</StyledExecutionDefinitionCode>
      )}
    </StyledExecutionDefinitionPre>
  );
};

export default TestExecutionDefinition;
