import {ExpandAltOutlined, FullscreenExitOutlined} from '@ant-design/icons';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {
  closeFullScreenLogOutput,
  openFullScreenLogOutput,
  selectFullScreenLogOutput,
} from '@redux/reducers/configSlice';

import {Tooltip} from '@custom-antd';

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

  const tooltipTitle = isFullScreenLogOutput ? 'Close full screen' : 'Enter full screen';

  return (
    <StyledActionIconContainer onClick={onIconClick}>
      <Tooltip title={tooltipTitle}>
        {isFullScreenLogOutput ? <FullscreenExitOutlined /> : <ExpandAltOutlined />}
      </Tooltip>
    </StyledActionIconContainer>
  );
};

export default FullScreenAction;
