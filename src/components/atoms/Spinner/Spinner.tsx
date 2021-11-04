import { Space, Spin } from 'antd';
import React from 'react';



const Spinner = (props: any) => {
  return (
    <Space size="middle">
      <Spin {...props} />
    </Space>
  );
};

export default Spinner;
