import React from 'react';
import {Divider} from 'antd';

const DividerStyles = {
  marginLeft: '-1em',
  width: 'inherit',
  backgroundColor: 'var(--color-gray-senary)',
};

const TKubeDivider = () => {
  return <Divider plain style={DividerStyles} />;
};

export default TKubeDivider;
