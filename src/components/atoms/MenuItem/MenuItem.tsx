import React, {useState} from 'react';

import AntdMenuItem from 'antd/lib/menu/MenuItem';

const MenuItem: React.FC<any> = ({style, ...menuItemProps}) => {
  const [active, setActive] = useState(false);
  return <AntdMenuItem {...menuItemProps} />;
};

export default MenuItem;
