import {LogOutputProps} from './LogOutput';
import {StyledLogOutputContainer, StyledLogTextContainer, StyledPreLogText} from './LogOutput.styled';
import LogOutputHeader from './LogOutputHeader';

const FullScreenLogOutput: React.FC<Pick<LogOutputProps, 'actions' | 'logOutput'>> = props => {
  const {actions = ['copy', 'fullscreen'], logOutput} = props;

  return (
    <StyledLogOutputContainer $isFullScreen>
      <LogOutputHeader logOutput={logOutput} actions={actions} />
      <StyledLogTextContainer>
        {logOutput ? <StyledPreLogText>{logOutput}</StyledPreLogText> : null}
      </StyledLogTextContainer>
    </StyledLogOutputContainer>
  );
};

export default FullScreenLogOutput;
