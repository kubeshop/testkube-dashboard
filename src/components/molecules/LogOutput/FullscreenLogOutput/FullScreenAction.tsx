import {useContext, useState} from 'react';

import {Tooltip} from 'antd';

import {MainContext} from '@contexts';

import {useAppSelector} from '@redux/hooks';
import {
  closeFullScreenLogOutput,
  selectFullScreenLogOutput,
  setIsFullScreenLogOutput,
} from '@redux/reducers/configSlice';

import {StyledExpandAltOutlined, StyledFullscreenExitOutlined} from '../LogOutput.styled';

const FullScreenAction: React.FC = () => {
  const {dispatch} = useContext(MainContext);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const {isFullScreenLogOutput} = useAppSelector(selectFullScreenLogOutput);

  const onIconClick = () => {
    setIsTooltipOpen(false);
    if (isFullScreenLogOutput) {
      dispatch(closeFullScreenLogOutput());
    } else {
      dispatch(setIsFullScreenLogOutput(true));
    }
  };

  const tooltipTitle = isFullScreenLogOutput ? 'Close full screen' : 'Enter full screen';

  return (
    <Tooltip title={tooltipTitle} open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      {isFullScreenLogOutput ? (
        <StyledFullscreenExitOutlined onClick={onIconClick} />
      ) : (
        <StyledExpandAltOutlined onClick={onIconClick} />
      )}
    </Tooltip>
  );
};

export default FullScreenAction;
