import React, {useState} from 'react';
import AntdMenuItem from 'antd/lib/menu/MenuItem';

const baseStyle = {
  borderTop: '1px solid var(--color-gray-nonary)',
  borderBottom: '1px solid var(--color-gray-nonary)',
  width: '80px',
  height: '64px',
  margin: 0,
  opacity: 1,
};

const MenuItem: React.FC<any> = ({style, ...menuItemProps}) => {
  const [active, setActive] = useState(false);
  return <AntdMenuItem style={baseStyle} {...menuItemProps} />;
};

export default MenuItem;
