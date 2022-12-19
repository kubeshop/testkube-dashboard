import {Space} from 'antd';

import Authentication from './Authentication';
import Delete from './Delete';
import NameNType from './NameNUrl';

const General = () => {
  return (
    <Space size={30} direction="vertical">
      <NameNType />
      <Authentication />
      <Delete />
    </Space>
  );
};

export default General;
