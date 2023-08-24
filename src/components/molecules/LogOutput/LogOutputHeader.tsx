import {StyledLogOutputHeaderContainer} from './LogOutput.styled';
import LogOutputActions from './LogOutputActions';

const LogOutputHeader: React.FC<any> = props => {
  const {logOutput, isFullscreen = false} = props;

  return (
    <StyledLogOutputHeaderContainer $isFullscreen={isFullscreen}>
      <LogOutputActions logOutput={logOutput} />
    </StyledLogOutputHeaderContainer>
  );
};

export default LogOutputHeader;
