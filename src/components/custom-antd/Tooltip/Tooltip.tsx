import React from 'react';

import {Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps} from 'antd';

import Colors from '@styles/Colors';

type TooltipProps = {
  customColor?: string;
};

const Tooltip: React.FC<AntdTooltipProps & TooltipProps> = props => {
  const {customColor, ...rest} = props;

  return <AntdTooltip color={customColor || Colors.greyBG} {...rest} />;
};

export default Tooltip;
