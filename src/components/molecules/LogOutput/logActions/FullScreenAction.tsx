import {FullscreenExitOutlined, FullscreenOutlined} from '@ant-design/icons';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {
  closeFullScreenLogOutput,
  openFullScreenLogOutput,
  selectFullScreenLogOutput,
} from '@redux/reducers/configSlice';

import {LogActionProps} from '../LogOutput';
import {StyledActionIconContainer} from '../LogOutput.styled';

const FullScreenAction: React.FC<LogActionProps> = props => {
  const {logOutput} = props;

  const dispatch = useAppDispatch();

  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const onIconClick = () => {
    if (isFullScreenLogOutput) {
      dispatch(closeFullScreenLogOutput());
    } else {
      dispatch(openFullScreenLogOutput(logOutput));
    }
  };

  return (
    <StyledActionIconContainer onClick={onIconClick}>
      {isFullScreenLogOutput ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </StyledActionIconContainer>
  );
};

export default FullScreenAction;
