import {FC} from 'react';

import {StyledLogOutputHeaderContainer} from '@molecules/LogOutput.styled';

import {LogOutputActions} from './LogOutputActions';

export const LogOutputHeader: FC<any> = props => {
  const {logOutput, isFullscreen = false} = props;

  return (
    <StyledLogOutputHeaderContainer $isFullscreen={isFullscreen}>
      <LogOutputActions logOutput={logOutput} />
    </StyledLogOutputHeaderContainer>
  );
};
