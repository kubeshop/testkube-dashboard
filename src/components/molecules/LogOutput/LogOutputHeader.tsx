import {StyledLogOutputHeaderContainer, StyledLogOutputHeaderTitle} from './LogOutput.styled';
import LogOutputActions from './LogOutputActions';

const LogOutputHeader: React.FC<any> = props => {
  const {logOutput, actions, title} = props;

  return (
    <StyledLogOutputHeaderContainer>
      {title ? <StyledLogOutputHeaderTitle>{title}</StyledLogOutputHeaderTitle> : null}
      {actions && actions.length ? <LogOutputActions logOutput={logOutput} actions={actions} /> : null}
    </StyledLogOutputHeaderContainer>
  );
};

export default LogOutputHeader;
