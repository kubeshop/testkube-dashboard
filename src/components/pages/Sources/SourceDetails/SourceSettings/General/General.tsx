import {Space} from 'antd';

import {Permissions, usePermission} from '@permissions/base';

import Authentication from './Authentication';
import Delete from './Delete';
import NameNType from './NameNUrl';

const General: React.FC = () => {
  const mayDelete = usePermission(Permissions.deleteEntity);

  return (
    <Space size={30} direction="vertical">
      <NameNType />
      <Authentication />
      {mayDelete ? <Delete /> : null}
    </Space>
  );
};

export default General;
