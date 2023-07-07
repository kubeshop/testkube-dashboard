import {Space} from 'antd';

import {Permissions, usePermission} from '@permissions/base';

import Delete from './Delete';
import Name from './Name';

const General: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);

  return (
    <Space size={30} direction="vertical">
      <Name />
      {mayDelete ? <Delete /> : null}
    </Space>
  );
};

export default General;
