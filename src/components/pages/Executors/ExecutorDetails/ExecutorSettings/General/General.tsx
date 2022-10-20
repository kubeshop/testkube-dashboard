import {Space} from 'antd';

import Delete from './Delete';
import NameNType from './NameNType';

const General = () => {
  return (
    <Space size={30} direction="vertical">
      <NameNType />
      <Delete />
    </Space>
  );
};

export default General;
