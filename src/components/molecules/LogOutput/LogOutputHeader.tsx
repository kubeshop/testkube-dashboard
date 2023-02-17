import {StyledLogOutputHeaderContainer, StyledLogOutputHeaderTitle} from './LogOutput.styled';
import LogOutputActions from './LogOutputActions';

const LogOutputHeader: React.FC<any> = props => {
  const {logOutput, actions = ['copy', 'fullscreen'], title, isFullScreen = false} = props;

  return (
    <StyledLogOutputHeaderContainer $isFullScreen={isFullScreen}>
      {title ? <StyledLogOutputHeaderTitle>{title}</StyledLogOutputHeaderTitle> : null}
      {actions && actions.length ? <LogOutputActions logOutput={logOutput} actions={actions} /> : null}
    </StyledLogOutputHeaderContainer>
  );
};

export default LogOutputHeader;
