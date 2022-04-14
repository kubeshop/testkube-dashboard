import {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import CopyCommand from '../../CLICommands/CopyCommand';
import {StyledExecutionDefinitionCode, StyledExecutionDefinitionPre} from './TestExecutionDefinition.styled';

const TestExecutionDefinition = () => {
  const {selectedRecord} = useContext(DashboardContext);

  const {content, type} = selectedRecord;

  const data = content?.data || content?.repository?.uri;

  return (
    <StyledExecutionDefinitionPre>
      {data ? (
        <CopyCommand command={data} />
      ) : (
        <StyledExecutionDefinitionCode>No definition data</StyledExecutionDefinitionCode>
      )}
    </StyledExecutionDefinitionPre>
  );
};

export default TestExecutionDefinition;
