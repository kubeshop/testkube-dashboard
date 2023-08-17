import {StyledLogOutputHeaderContainer} from './LogOutput.styled';
import LogOutputActions from './LogOutputActions';

const LogOutputHeader: React.FC<any> = props => {
  const {logOutput, isFullScreen = false} = props;

  return (
    <StyledLogOutputHeaderContainer $isFullScreen={isFullScreen}>
      <LogOutputActions logOutput={logOutput} />
    </StyledLogOutputHeaderContainer>
  );
};

export default LogOutputHeader;
