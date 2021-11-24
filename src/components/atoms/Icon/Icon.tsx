import React from 'react';
import AntdIcon from '@ant-design/icons';

const IconStyle = {
  TextAlign: 'center',
  marginTop: 20,
  marginLeft: 10,
};

const Icon: React.FC<any> = ({component, ...IconProps}) => {
  return <AntdIcon style={IconStyle} width={24} height={24} {...IconProps} component={component} />;
};

export default Icon;
