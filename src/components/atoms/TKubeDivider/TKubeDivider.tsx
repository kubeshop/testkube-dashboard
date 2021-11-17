import React from 'react';
import {Divider} from 'antd';

const DividerStyles = {
  margin: '24px -30px',
  width: 'inherit',
  backgroundColor: 'var(--color-gray-senary)',
};

const TKubeDivider = () => {
  return <Divider plain style={DividerStyles} />;
};

export default TKubeDivider;
