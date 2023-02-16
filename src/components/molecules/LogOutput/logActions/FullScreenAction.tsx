import {useContext} from 'react';

import {ExpandAltOutlined} from '@ant-design/icons';

import {useAppSelector} from '@redux/hooks';
import {
  closeFullScreenLogOutput,
  selectFullScreenLogOutput,
  setIsFullScreenLogOutput,
} from '@redux/reducers/configSlice';

import {Tooltip} from '@custom-antd';

import {MainContext} from '@contexts';

import {LogActionProps} from '../LogOutput';
import {StyledExpandAltOutlined, StyledFullscreenExitOutlined} from '../LogOutput.styled';

const FullScreenAction: React.FC<LogActionProps> = props => {
  const {logOutput} = props;

  const {dispatch} = useContext(MainContext);

  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const onIconClick = () => {
    if (isFullScreenLogOutput) {
      dispatch(closeFullScreenLogOutput());
    } else {
      dispatch(setIsFullScreenLogOutput(true));
    }
  };

  const tooltipTitle = isFullScreenLogOutput ? 'Close full screen' : 'Enter full screen';

  return (
    <Tooltip title={tooltipTitle}>
      {isFullScreenLogOutput ? (
        <StyledFullscreenExitOutlined onClick={onIconClick} />
      ) : (
        <StyledExpandAltOutlined onClick={onIconClick} />
      )}
    </Tooltip>
  );
};

export default FullScreenAction;
