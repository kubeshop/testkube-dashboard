import {FC, useState} from 'react';

import {Tooltip} from 'antd';

import {StyledExpandAltOutlined, StyledFullscreenExitOutlined} from '@molecules/LogOutput.styled';

import {useLogOutputField} from '@store/logOutput';

export const FullscreenAction: FC = () => {
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
