import {StyledLogOutputHeaderContainer} from './LogOutput.styled';
import LogOutputActions from './LogOutputActions';

const LogOutputHeader: React.FC<any> = props => {
  const {logOutput, actions = ['copy', 'fullscreen'], isFullScreen = false} = props;

  return (
    <StyledLogOutputHeaderContainer $isFullScreen={isFullScreen}>
      {actions && actions.length ? <LogOutputActions logOutput={logOutput} actions={actions} /> : null}
    </StyledLogOutputHeaderContainer>
  );
};

export default LogOutputHeader;
