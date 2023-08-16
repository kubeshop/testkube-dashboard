import {useState} from 'react';

import {Tooltip} from 'antd';

import {useLogOutputField} from '@store/logOutput';

import {StyledExpandAltOutlined, StyledFullscreenExitOutlined} from './LogOutput.styled';

const FullScreenAction: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useLogOutputField('isFullscreen');

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const onIconClick = () => {
    setIsTooltipOpen(false);
    setIsFullscreen(!isFullscreen);
  };

  const tooltipTitle = isFullscreen ? 'Close full screen' : 'Enter full screen';

  return (
    <Tooltip title={tooltipTitle} open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      {isFullscreen ? (
        <StyledFullscreenExitOutlined onClick={onIconClick} />
      ) : (
        <StyledExpandAltOutlined onClick={onIconClick} />
      )}
    </Tooltip>
  );
};

export default FullScreenAction;
