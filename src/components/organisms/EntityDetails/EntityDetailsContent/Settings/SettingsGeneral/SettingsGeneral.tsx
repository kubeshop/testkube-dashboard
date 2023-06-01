import {useContext} from 'react';

import {Space} from 'antd';

import {EntityDetailsContext} from '@contexts';

import {Permissions, usePermission} from '@permissions/base';

import Delete from './Delete';
import FailureHandling from './FailureHandling';
import Labels from './Labels';
import NameNDescription from './NameNDescription';
import Timeout from './Timeout';

const SettingsGeneral: React.FC = () => {
  const {entity} = useContext(EntityDetailsContext);
  const mayDelete = usePermission(Permissions.deleteEntity);

  return (
    <Space size={30} direction="vertical">
      <NameNDescription />
      <Labels />
      {entity === 'tests' ? <Timeout /> : null}
      {entity === 'tests' ? <FailureHandling /> : null}
      {mayDelete ? <Delete /> : null}
    </Space>
  );
};

export default SettingsGeneral;
