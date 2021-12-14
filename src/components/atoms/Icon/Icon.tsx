import React from 'react';

import AntdIcon from '@ant-design/icons';

const Icon: React.FC<any> = ({component, ...IconProps}) => {
  return <AntdIcon width={24} height={24} {...IconProps} component={component} />;
};

export default Icon;
