import {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {StyledExecutionDefinitionCode, StyledExecutionDefinitionPre} from './TestExecutionDefinition.styled';

const TestExecutionDefinition = () => {
  const {selectedRecord} = useContext(DashboardContext);

  const {content} = selectedRecord;

  return (
    <StyledExecutionDefinitionPre>
      <StyledExecutionDefinitionCode>{content?.data || 'No definition data'}</StyledExecutionDefinitionCode>
    </StyledExecutionDefinitionPre>
  );
};

export default TestExecutionDefinition;
